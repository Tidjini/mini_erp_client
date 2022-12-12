import { TableCell, TableRow, Typography } from "@material-ui/core";
import React from "react";

export default function DevisAchatTableFooter(props) {
  const { style, form } = props;

  return (
    <div>
      <TableRow>
        <TableCell colSpan={3} align="right">
          Total HT
        </TableCell>
        <TableCell align="right">
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: 16,
              border: "1px solid lightgray",
              borderRadius: 5,
              padding: "8px 20px",
              textAlign: "right",
            }}
          >
            {`${new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "DZD",
            }).format(form.total)}`}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3} align="right">
          Total TVA
        </TableCell>
        <TableCell align="right">
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: 16,
              border: "1px solid lightgray",
              borderRadius: 5,
              padding: "8px 20px",
              textAlign: "right",
            }}
          >
            {`${new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "DZD",
            }).format(form.total_tva)}`}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3} align="right">
          Total TTC
        </TableCell>
        <TableCell align="right">
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: 16,
              border: "1px solid lightgray",
              borderRadius: 5,
              padding: "8px 20px",
              textAlign: "right",
            }}
          >
            {`${new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "DZD",
            }).format(form.total_ttc)}`}
          </Typography>
        </TableCell>
      </TableRow>
    </div>
  );
}
