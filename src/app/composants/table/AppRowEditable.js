import React, { useState, useCallback } from "react";

import { TableRow, TableCell, Typography, Button } from "@material-ui/core";
import AppInput from "../inputs/AppInput";
import { wordElipsis } from "../utils";

import AppInputTable from "../inputs/AppInputTable";
import { useEffect } from "react";

const pad = "000000";

const ecriture_init = {
  id: -1,
  piece: "1",
  date: "2022-01-01",
  reference: "",
  label: "",
  debit: 0.0,
  credit: 0.0,
  tier: {
    code: "",
    label: "",
  },
  bank: {
    code: "",
    label: "",
  },
  compte: {
    code: "",
    label: "",
    bank: false,
    tier: false,
  },
};

export default function AppRowEditable(props) {
  const today = new Date();

  const { row, selected, setSelected, error, setError, add, edit } = props;

  const [cellSelected, setCellSelected] = useState(0);
  const [cellEditing, setCellEditing] = useState(0);
  const [ecriture, setEcriture] = useState(row);

  const [tierSelected, setTierSelected] = useState(row.tier);
  const [bankSelected, setBankSelected] = useState(row.bank);

  const [compteSelected, setCompteSelected] = useState(row.compte);
  const [date, setDate] = useState("");
  function switchToCell(cell) {
    setCellSelected(cell);
    setCellEditing(cell);
  }

  useEffect(() => {
    try {
      if (row.id === -1) {
        switchToCell(1);
      }
      if (row.date === null || row.date === undefined) return;
      const date = new Date(row.date);
      setDate(date.toISOString().substring(0, 10));
    } catch (error) {}
  }, [row]);

  // useEffect(() => {
  //   setTierSelected(null);
  //   setBankSelected(null);
  // }, [compteSelected]);

  const handleChange = useCallback((event) => {
    event.persist();

    switch (event.target.name) {
      case "date":
        try {
          const date = new Date(event.target.value);
          setEcriture((form) => ({
            ...form,
            date: date.toISOString(),
          }));

          setDate(date.toISOString().substring(0, 10));
        } catch (error) {}
        break;

      default:
        setEcriture((ecriture) => ({
          ...ecriture,
          [event.target.name]: event.target.value,
        }));
        break;
    }
  }, []);

  useEffect(() => {
    setCellSelected(0);
    setCellEditing(0);
  }, [selected]);

  function onInputTab(event) {
    if (compteSelected == null && cellEditing > 3) {
      switchToCell(3);
      return;
    }

    switch (cellEditing) {
      case 3:
        if (compteSelected == null) {
          switchToCell(3);
        } else if (compteSelected.tier) {
          switchToCell(4);
        } else if (compteSelected.bank) {
          setTierSelected(null);
          switchToCell(5);
        } else {
          setTierSelected(null);
          setBankSelected(null);
          switchToCell(6);
        }
        break;
      case 4:
        if (compteSelected == null) {
          switchToCell(3);
        } else if (compteSelected.bank) {
          switchToCell(5);
        } else {
          switchToCell(6);
        }
        break;

      case 7:
        if (ecriture.credit > 0) {
          switchToCell(9);
        } else {
          switchToCell(8);
        }
        break;

      case 8:
        if (event.target.value <= 0) {
          switchToCell(9);
        } else {
          switchToCell(0);
          if (row.id === -1) onAddEcriture();
          else onEditEcriture();
        }
        break;
      case 9:
        if (event.target.value <= 0 && ecriture.debit <= 0) {
          switchToCell(8);
        } else {
          switchToCell(0);
          if (row.id === -1) onAddEcriture();
          else onEditEcriture();
        }
        break;

      default:
        switchToCell(cellEditing + 1);
        break;
    }

    // if (selected === id) {

    // } else {
    //   setCellSelected(0);
    //   setCellEditing(0);
    // }
  }

  function onAddEcriture() {
    if (compteSelected == null) {
      setCellSelected(3);
      setCellEditing(3);
    } else if (ecriture.credit <= 0 && ecriture.debit <= 0) {
      setCellSelected(8);
      setCellEditing(8);
    } else {
      if (add) {
        ecriture.tier =
          tierSelected != null
            ? tierSelected
            : {
                code: "",
                label: "",
              };
        ecriture.bank =
          bankSelected != null
            ? bankSelected
            : {
                code: "",
                label: "",
              };

        ecriture.compte =
          compteSelected != null
            ? compteSelected
            : {
                code: "",
                label: "",
                bank: false,
                tier: false,
              };
        add(ecriture);
        setEcriture({
          ...ecriture_init,
          piece: ecriture.piece,
          tier: {
            code: "",
            label: "",
          },
          bank: {
            code: "",
            label: "",
          },
          compte: {
            code: "",
            label: "",
            bank: false,
            tier: false,
          },
        });
        setTierSelected(null);
        setBankSelected(null);
        setCompteSelected(null);
        switchToCell(1);
      }
    }
  }
  function onEditEcriture() {
    if (compteSelected == null) {
      setCellSelected(3);
      setCellEditing(3);
    } else if (ecriture.credit <= 0 && ecriture.debit <= 0) {
      setCellSelected(8);
      setCellEditing(8);
    } else {
      if (add) {
        ecriture.tier =
          tierSelected != null
            ? tierSelected
            : {
                code: "",
                label: "",
              };
        ecriture.bank =
          bankSelected != null
            ? bankSelected
            : {
                code: "",
                label: "",
              };

        ecriture.compte =
          compteSelected != null
            ? compteSelected
            : {
                code: "",
                label: "",
                bank: false,
                tier: false,
              };
        edit(ecriture);
        switchToCell(1);
      }
    }
  }

  return (
    // onClick={(event) => handleClick(n)}
    <TableRow
      className="h-32 cursor-pointer"
      hover
      role="checkbox"
      tabIndex={-1}
      key={ecriture.id}
      selected={undefined}
      style={{
        boxShadow: "1px 3px 3px #9E9E9E20",
        background:
          ecriture.id === -1
            ? "white"
            : selected.id === ecriture.id
            ? "#DFE2E855"
            : "transparent",
      }}
      onClick={(e) => {
        setSelected(ecriture);
      }}
    >
      <TableCell
        className="truncate"
        component="th"
        scope="row"
        align="left"
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0px 1px 1px",
        }}
        onClick={(e) => {
          setCellSelected(0);
        }}
        onDoubleClick={() => {
          switchToCell(1);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onInputTab(event);
          }
          if (event.key === "Tab") {
            onInputTab(event);
          }
        }}
      >
        {cellEditing === 1 ? (
          <AppInput
            name="piece"
            placeholder="Piece"
            type="number"
            label=""
            height={36}
            horizontal={true}
            handleChange={handleChange}
            value={ecriture.piece}
            width={86}
            onTab={onInputTab}
            onEnter={onInputTab}
            maxLength={6}
          />
        ) : (
          <Typography style={{ fontSize: 12 }}>
            {ecriture.piece &&
              pad.substring(0, pad.length - (ecriture.piece + "").length) +
                ecriture.piece}
          </Typography>
        )}
      </TableCell>
      <TableCell
        className="truncate"
        component="th"
        width={156}
        scope="row"
        align="left"
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0px 1px 1px",
        }}
        onClick={(e) => {
          setCellSelected(1);
        }}
        onDoubleClick={() => {
          switchToCell(2);
        }}
      >
        {cellEditing === 2 ? (
          <AppInput
            name="date"
            placeholder={
              today.getDay() +
              "/" +
              today.getMonth() +
              "/" +
              today.getFullYear()
            }
            type="date"
            format="DD/MM/YYYY"
            defaultValue={today.toDateString()}
            handleChange={handleChange}
            value={date}
            horizontal={true}
            height={36}
            width={148}
            onTab={onInputTab}
            onEnter={onInputTab}
          />
        ) : (
          <Typography style={{ fontSize: 12, fontStyle: "italic" }}>
            {date}
          </Typography>
        )}
      </TableCell>
      <TableCell
        width={166}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
          backgroundColor: compteSelected == null ? "#F9DDD7" : "transparent",
        }}
        onClick={(e) => {
          setCellSelected(2);
        }}
        onDoubleClick={() => {
          switchToCell(3);
        }}
      >
        {cellEditing === 3 ? (
          <AppInputTable
            name="compte"
            placeholder="401x"
            type="text"
            handleChange={undefined}
            height={36}
            horizontal={true}
            width={156}
            onFocus={(e) => {}}
            onEnter={onInputTab}
            onTab={onInputTab}
            selected={compteSelected}
            setSelected={setCompteSelected}
            maxLength={6}
            header="List Comptes"
            primaryAttribute="code"
            attributes={["code", "label"]}
            columns={["code", "label"]}
            icon={"account.png"}
            collectionName="comptes"
          />
        ) : (
          <Typography style={{ fontSize: 16, fontWeight: "bold" }}>
            {compteSelected && compteSelected.code}
          </Typography>
        )}
      </TableCell>
      <TableCell
        width={166}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
        onClick={(e) => {
          setCellSelected(3);
        }}
        onDoubleClick={() => {
          if (compteSelected == null) {
            switchToCell(3);
          } else if (compteSelected.tier) {
            switchToCell(4);
          } else if (compteSelected.bank) {
            switchToCell(5);
          }
        }}
      >
        {cellEditing === 4 ? (
          <AppInputTable
            name="tier"
            placeholder="Tier (Code)"
            type="text"
            height={36}
            horizontal={true}
            width={156}
            onEnter={onInputTab}
            onTab={onInputTab}
            selected={tierSelected}
            setSelected={setTierSelected}
            header="List Tiers"
            primaryAttribute="code"
            attributes={["code", "label"]}
            columns={["code", "label"]}
            icon={"tier.png"}
            collectionName="tiers"
          />
        ) : (
          <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
            {tierSelected && wordElipsis(tierSelected.label, 12)}
          </Typography>
        )}
      </TableCell>
      <TableCell
        width={166}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
        onClick={(e) => {
          setCellSelected(4);
        }}
        onDoubleClick={() => {
          if (compteSelected == null) {
            switchToCell(3);
          } else if (compteSelected.tier) {
            switchToCell(4);
          } else if (compteSelected.bank) {
            switchToCell(5);
          }
        }}
      >
        {cellEditing === 5 ? (
          <AppInputTable
            name="banque"
            placeholder="Banque"
            type="text"
            height={36}
            horizontal={true}
            width={156}
            onEnter={onInputTab}
            onTab={onInputTab}
            selected={bankSelected}
            setSelected={setBankSelected}
            header="List Banques"
            primaryAttribute="code"
            attributes={["code", "label"]}
            columns={["code", "label"]}
            icon={"bank.png"}
            collectionName="banques"
          />
        ) : (
          <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
            {bankSelected && wordElipsis(bankSelected.label, 12)}
          </Typography>
        )}
      </TableCell>
      <TableCell
        width={150}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
        onClick={(e) => {
          setCellSelected(5);
        }}
        onDoubleClick={() => {
          if (compteSelected == null) {
            switchToCell(3);
            return;
          }
          switchToCell(6);
        }}
      >
        {cellEditing === 6 ? (
          <AppInput
            name="reference"
            placeholder="Reference"
            type="text"
            label=""
            height={36}
            horizontal={true}
            handleChange={handleChange}
            value={ecriture.reference}
            width={115}
            onEnter={onInputTab}
            onTab={onInputTab}
          />
        ) : (
          <Typography style={{ fontSize: 12, fontStyle: "italic" }}>
            {wordElipsis(ecriture.reference, 12)}
          </Typography>
        )}
      </TableCell>
      <TableCell
        width={450}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 1px",
        }}
        onClick={(e) => {
          setCellSelected(6);
        }}
        onDoubleClick={() => {
          if (compteSelected == null) {
            switchToCell(3);
            return;
          }
          switchToCell(7);
        }}
      >
        {cellEditing === 7 ? (
          <AppInput
            name="label"
            placeholder="Label"
            type="text"
            label=""
            height={36}
            horizontal={true}
            handleChange={handleChange}
            value={ecriture.label}
            width={370}
            onEnter={onInputTab}
            onTab={onInputTab}
          />
        ) : (
          <Typography style={{ fontSize: 12 }}>
            {wordElipsis(ecriture.label, 60)}
          </Typography>
        )}
      </TableCell>
      <TableCell
        width={200}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 0",
          backgroundColor:
            ecriture.credit <= 0 && ecriture.debit <= 0
              ? "#F9DDD7CC"
              : "transparent",
        }}
        onClick={(e) => {
          setCellSelected(7);
        }}
        onDoubleClick={() => {
          if (compteSelected == null) {
            switchToCell(3);
            return;
          }
          if (ecriture.credit > 0) {
            switchToCell(9);
          } else {
            switchToCell(8);
          }
        }}
      >
        {cellEditing === 8 ? (
          <AppInput
            name="debit"
            placeholder="Debit"
            type="number"
            label=""
            height={36}
            width={164}
            horizontal={true}
            handleChange={handleChange}
            value={ecriture.debit}
            onEnter={onInputTab}
            onTab={onInputTab}
          />
        ) : (
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: 16,
              border: "1px solid #2a9d8f",
              borderRadius: 5,
              padding: "4px 20px",
              textAlign: "right",
              color: "#2a9d8f",
            }}
          >
            {`${new Intl.NumberFormat("fr-FR").format(ecriture.debit)}`}
          </Typography>
        )}
      </TableCell>
      <TableCell
        width={200}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 0",
          backgroundColor:
            ecriture.credit <= 0 && ecriture.debit <= 0
              ? "#F9DDD7CC"
              : "transparent",
        }}
        onClick={(e) => {
          setCellSelected(8);
        }}
        onDoubleClick={() => {
          if (compteSelected == null) {
            switchToCell(3);
            return;
          }
          if (ecriture.debit > 0) {
            switchToCell(8);
          } else {
            switchToCell(9);
          }
        }}
      >
        {cellEditing === 9 ? (
          <AppInput
            name="credit"
            placeholder="Crédit"
            type="number"
            label=""
            height={36}
            width={164}
            horizontal={true}
            handleChange={handleChange}
            value={ecriture.credit}
            onEnter={onInputTab}
            onTab={onInputTab}
          />
        ) : (
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: 16,
              border: "1px solid #e76f51",
              borderRadius: 5,
              padding: "4px 20px",
              textAlign: "right",
              color: "#e76f51",
            }}
          >
            {`${new Intl.NumberFormat("fr-FR").format(ecriture.credit)}`}
          </Typography>
        )}
      </TableCell>
      <TableCell
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 1px",
        }}
      >
        <Button
          variant="contained"
          style={{
            marginRight: 4,
            boxShadow: "none",
            backgroundColor: ecriture.id === -1 ? "#0a9396" : "#0077b6",
            color: "#EFF1FF",
            textTransform: "none",
            marginBottom: 4,
            height: 32,
          }}
          onClick={(e) => {
            if (ecriture.id === -1) {
              onAddEcriture();
            } else {
              switchToCell(1);
            }
          }}
        >
          {ecriture.id === -1 ? "Ajouter" : "Editer"}
        </Button>
      </TableCell>
    </TableRow>
  );
}
