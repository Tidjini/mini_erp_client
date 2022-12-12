import React from "react";

import { TableRow, TableCell, Typography } from "@material-ui/core";

import { useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";

function CompteSummary(props) {
  const compte_table = useSelector(({ dashboard }) => dashboard.compte_table);

  return (
    <TableRow
      className="cursor-pointer"
      hover
      role="checkbox"
      tabIndex={-1}
      key="summary"
      selected={undefined}
      style={{
        boxShadow: "0px 3px 3px #9E9E9E20",
        // background: compte_table.summary.solde === 0.0 ? "#2d6a4f" : "#6a040f",
        background: "#e8e8e8",
        height: 48,
      }}
    >
      <TableCell
        width={100}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
      ></TableCell>
      <TableCell width={500}>
        <Typography
          style={{
            fontSize: 18,
            color:
              compte_table.summary.solde_debit > 0.0
                ? "#98f5e1"
                : compte_table.summary.solde_credit > 0.0
                ? "#f28482"
                : "#e8e8e8",
            textAlign: "right",
            fontWeight: "600",
          }}
        >
          {`SOLDE = ${new Intl.NumberFormat("fr-FR").format(
            compte_table.summary.solde
          )}`}
        </Typography>
      </TableCell>
      <TableCell width={230}>
        <Typography
          style={{
            fontSize: 24,
            color: "#98f5e1",
            textAlign: "right",
            fontWeight: "600",
          }}
        >
          {`${new Intl.NumberFormat("fr-FR").format(
            compte_table.summary.debit
          )}`}
        </Typography>
      </TableCell>
      <TableCell
        width={230}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 0 0",
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
          {`${new Intl.NumberFormat("fr-FR").format(
            compte_table.summary.credit
          )}`}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default withReducer("dashboard", reducer)(CompteSummary);
