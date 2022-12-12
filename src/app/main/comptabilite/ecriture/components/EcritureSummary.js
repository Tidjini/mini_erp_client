import React, { useState, useCallback } from "react";

import { TableRow, TableCell, Typography, Button } from "@material-ui/core";
import AppInput from "app/composants/inputs/AppInput";
import { wordElipsis } from "app/composants/utils";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import * as Actions from "../store/actions";
import * as Controller from "../controllers/Ecriture";

const pad = "000000";

function EcritureSummary(props) {
  const dispatch = useDispatch();
  // const { ecriture } = props;

  const ecritures = useSelector(({ ecriture }) => ecriture.ecritures);
  const [summary, setSummary] = useState({
    debit: 0.0,
    credit: 0.0,
    solde_debit: 0.0,
    solde_credit: 0.0,
  });

  useEffect(() => {
    const sum = Controller.sum_ecriture(ecritures);
    setSummary(sum);
  }, [ecritures]);

  return (
    // onClick={(event) => handleClick(n)}
    <TableRow
      className="h-48 cursor-pointer"
      hover
      role="checkbox"
      tabIndex={-1}
      key="summary"
      selected={undefined}
      style={{
        boxShadow: "0px 3px 3px #9E9E9E20",
        background:
          summary.solde_debit == 0.0 && summary.solde_credit == 0.0
            ? "#2d6a4f"
            : summary.solde_debit > 0.0
            ? "#006d77"
            : "#4a4e69",
      }}
    >
      <TableCell
        className="truncate"
        component="th"
        scope="row"
        align="left"
        style={{
          border: "0px solid #9E9E9E60",
        }}
      ></TableCell>
      <TableCell
        className="truncate"
        component="th"
        width={156}
        scope="row"
        align="left"
        style={{
          border: "0px solid #9E9E9E60",
        }}
      ></TableCell>
      <TableCell
        width={166}
        style={{
          border: "0px solid #9E9E9E60",
        }}
      ></TableCell>
      <TableCell
        width={166}
        style={{
          border: "0px solid #9E9E9E60",
        }}
      ></TableCell>
      <TableCell
        width={166}
        style={{
          border: "0px solid #9E9E9E60",
        }}
      ></TableCell>
      <TableCell
        width={150}
        style={{
          border: "0px solid #9E9E9E60",
        }}
      ></TableCell>
      <TableCell
        width={450}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 1px",
        }}
      >
        <Typography
          style={{
            fontSize: 18,
            color: summary.solde_debit === 0.0 ? "#98f5e1" : "#f28482",
            textAlign: "right",
            fontWeight: "600",
          }}
        >
          {summary.solde_debit > 0.0 &&
            `SOLDE DÉBIT = ${new Intl.NumberFormat("fr-FR").format(
              summary.solde_debit
            )}`}
          {summary.solde_credit > 0.0 &&
            `SOLDE CRÉDIT= ${new Intl.NumberFormat("fr-FR").format(
              summary.solde_credit
            )}`}
        </Typography>
      </TableCell>
      <TableCell
        width={200}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 0",
        }}
      >
        <Typography
          style={{
            fontSize: 24,
            color: "#98f5e1",
            textAlign: "right",
            fontWeight: "600",
          }}
        >
          {`${new Intl.NumberFormat("fr-FR").format(summary.debit)}`}
        </Typography>
      </TableCell>
      <TableCell
        width={200}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 0",
        }}
      >
        <Typography
          style={{
            fontSize: 24,
            color: "#f28482",
            textAlign: "right",
            fontWeight: "600",
          }}
        >
          {`${new Intl.NumberFormat("fr-FR").format(summary.credit)}`}
        </Typography>
      </TableCell>
      <TableCell
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 1px",
        }}
      ></TableCell>
    </TableRow>
  );
}

export default withReducer("ecriture", reducer)(EcritureSummary);
