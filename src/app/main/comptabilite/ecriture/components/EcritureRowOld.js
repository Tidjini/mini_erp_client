import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";
import { TableRow, TableCell, Typography, Button } from "@material-ui/core";
import AppInput from "app/composants/inputs/AppInput";
import { wordElipsis } from "app/composants/utils";
import { showMessage } from "app/store/actions/fuse";

import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import * as Actions from "../store/actions";
import * as Attributes from "../store/actions/attributes";
import EcritureInputTable from "./EcritureInputTable";

import { ecriture_default } from "../EcritureConfig";

import {
  handleChange,
  switchToCell,
  onCompteEnter,
  onCompteDoubleClick,
  onTierEnter,
  onTierDoubleClick,
  onLabelEnter,
  onLabelDoubleClick,
  onDateEnter,
  onDateDoubleClick,
  onDebitOrCreditEnter,
  onDebitDoubleClick,
  onCreditDoubleClick,
  initialize,
} from "../controllers/EcritureRow";
import AppCompteInput from "../../components/AppCompteInput";
import AppTierInput from "../../components/AppTierInput";
import AppLookup from "app/composants/inputs/AppLookup";

const pad = "000000";

function EcritureRow(props) {
  const dispatch = useDispatch();
  const { row, selected, setSelected, error, setError, save, line, entete } =
    props;

  const today = new Date();

  const edit_cell = useSelector(({ ecriture }) => ecriture.edit_cell);
  const edit_line = useSelector(({ ecriture }) => ecriture.edit_line);

  const [ecriture, setEcriture] = useState(ecriture_default);
  const [tierSelected, setTierSelected] = useState(ecriture_default.third);
  const [compteSelected, setCompteSelected] = useState(
    ecriture_default.account
  );

  const [dateEcheance, setDateEcheance] = useState("");

  useEffect(() => {
    initialize(
      setEcriture,
      setTierSelected,
      setCompteSelected,
      setDateEcheance,
      row
    );
    if (row.num_ligne === 0) {
      switchToCell(1, dispatch, Actions, line);
    }
  }, [row]);

  useEffect(() => {
    if (selected.num_ligne === ecriture.num_ligne) {
      dispatch(Actions.setEditLine(line));
      switchToCell(1, dispatch, Actions, line);
    }
  }, [selected]);

  // const handleChanges = useCallback(
  //   (e) => {
  //   },
  //   [setEcriture, setDateEcheance]
  // );

  const onDebitOrCreditEnterValue = useCallback(
    (event) => {
      onDebitOrCreditEnter(
        event,
        ecriture,
        setEcriture,
        compteSelected,
        setCompteSelected,
        tierSelected,
        setTierSelected,
        dispatch,
        Actions,
        line,
        save
      );
    },
    [ecriture, compteSelected, tierSelected]
  );

  return (
    <TableRow
      className="h-32 cursor-pointer"
      hover
      role="checkbox"
      tabIndex={-1}
      key={ecriture.num_ligne}
      style={{
        boxShadow: "1px 3px 3px #9E9E9E20",
        background:
          ecriture.num_ligne == 0
            ? "#94d2bd50"
            : selected.num_ligne === ecriture.num_ligne
            ? "#DFE2E8CC"
            : "#adb5bd20",
      }}
      onClick={(e) => {
        setSelected(ecriture);
      }}
    >
      <TableCell
        width={110}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
          backgroundColor: compteSelected == null ? "#F9DDD7" : "transparent",
        }}
        onDoubleClick={() => {
          onCompteDoubleClick(compteSelected, dispatch, Actions, line);
        }}
      >
        {edit_cell === 1 && edit_line === line ? (
          // <AppLookup
          //   context={{
          //     collectionName: "compte",
          //     icon: "account.png",
          //     header: "Liste Comptes",
          //     primary: "num_compte",
          //     attributes: Attributes.comptes,
          //     columns: [
          //       "N° Compte",
          //       "Intitule",
          //       "Avoir Tier",
          //       "Appliquer Rapprochement",
          //     ],
          //     required: true,
          //   }}
          //   name="compte"
          //   label=""
          //   style={{
          //     placeholder: "N° Compte",
          //     width: "auto",
          //     height: 36,
          //     type: "text",
          //     direction: "row",
          //   }}
          //   onLeave={(c) => {
          //     onCompteEnter(c, dispatch, Actions, line);
          //   }}
          //   selected={compteSelected}
          //   setSelected={setCompteSelected}
          //   initial={{
          //     num_compte: "",
          //     intitule: "",
          //     tier: "",
          //     appliquer_rapprochement: "",
          //   }}
          // />
          <AppCompteInput
            compte={compteSelected}
            setCompte={(item) => {
              setCompteSelected(item);
            }}
            name="compte"
            width={280}
            height={36}
            direction="row"
            tous={false}
            afterSelection={(c) => {
              onCompteEnter(c, dispatch, Actions, line);
            }}
          />
        ) : (
          <Typography style={{ fontSize: 16, fontWeight: "bold" }}>
            {compteSelected && compteSelected.num_compte}
          </Typography>
        )}
      </TableCell>
      <TableCell
        width={110}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
        onDoubleClick={() => {
          onTierDoubleClick(compteSelected, dispatch, Actions, line);
        }}
      >
        {edit_cell === 2 && edit_line === line ? (
          <AppTierInput
            tier={tierSelected}
            setTier={(item) => {
              setTierSelected(item);
            }}
            name="tier"
            width={280}
            height={36}
            direction="row"
            tous={false}
            afterSelection={(t) => {
              onTierEnter(t, dispatch, Actions, line);
            }}
          />
        ) : (
          <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
            {tierSelected && wordElipsis(tierSelected.raison_social, 12)}
          </Typography>
        )}
      </TableCell>

      <TableCell
        width={450}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 1px",
        }}
        onDoubleClick={() => {
          onLabelDoubleClick(
            compteSelected,
            tierSelected,
            dispatch,
            Actions,
            line
          );
        }}
      >
        {edit_cell === 3 && edit_line === line ? (
          <AppInput
            name="libelle"
            placeholder="Label"
            type="text"
            label=""
            height={36}
            horizontal={true}
            handleChange={(e) => {
              handleChange(e, setEcriture, setDateEcheance);
            }}
            value={ecriture.libelle}
            width={"auto"}
            onEnter={(t) =>
              onLabelEnter(ecriture.libelle, dispatch, Actions, line)
            }
            onTab={(c) => {}}
          />
        ) : (
          <Typography style={{ fontSize: 12 }}>
            {wordElipsis(ecriture.libelle, 60)}
          </Typography>
        )}
      </TableCell>
      <TableCell
        className="truncate"
        component="th"
        width={138}
        scope="row"
        align="left"
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 0",
        }}
        onDoubleClick={() => {
          onDateDoubleClick(
            compteSelected,
            tierSelected,
            dispatch,
            Actions,
            line
          );
        }}
      >
        {edit_cell === 4 && edit_line === line ? (
          <AppInput
            name="date_echeance"
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
            handleChange={(e) => {
              handleChange(e, setEcriture, setDateEcheance);
            }}
            value={ecriture.date_echeance}
            horizontal={true}
            height={36}
            width={"auto"}
            onEnter={(t) =>
              onDateEnter(ecriture.credit, dispatch, Actions, line)
            }
            onTab={(c) => {}}
          />
        ) : (
          <Typography style={{ fontSize: 12, fontStyle: "italic" }}>
            {ecriture.date_echeance}
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
        onDoubleClick={() => {
          onDebitDoubleClick(
            compteSelected,
            tierSelected,
            ecriture.credit,
            dispatch,
            Actions,
            line
          );
        }}
      >
        {edit_cell === 5 && edit_line === line ? (
          <AppInput
            name="debit"
            placeholder="Debit"
            type="number"
            label=""
            height={36}
            width={"auto"}
            horizontal={true}
            handleChange={(e) => {
              handleChange(e, setEcriture, setDateEcheance);
            }}
            value={ecriture.debit}
            onEnter={(e) => onDebitOrCreditEnterValue(e)}
            onTab={(c) => {}}
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
        onDoubleClick={() => {
          onCreditDoubleClick(
            compteSelected,
            tierSelected,
            ecriture.debit,
            dispatch,
            Actions,
            line
          );
        }}
      >
        {edit_cell === 6 && edit_line === line ? (
          <AppInput
            name="credit"
            placeholder="Crédit"
            type="number"
            label=""
            height={36}
            width={"auto"}
            horizontal={true}
            handleChange={(e) => {
              handleChange(e, setEcriture, setDateEcheance);
            }}
            value={ecriture.credit}
            onEnter={(e) => onDebitOrCreditEnterValue(e)}
            onTab={(c) => {}}
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
      {/* <TableCell
        width={50}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 1px",
        }}
      >
        {edit_line === line && (
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
              if (ecriture.id === "") {
                onAddEcriture();
              } else {
                onEditEcriture();
              }
            }}
          >
            {ecriture.id === "" ? "Ajouter" : "Editer"}
          </Button>
        )}
      </TableCell> */}
    </TableRow>
  );
}

export default withReducer("ecriture", reducer)(EcritureRow);
