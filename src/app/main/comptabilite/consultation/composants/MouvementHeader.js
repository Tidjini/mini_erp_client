import React from "react";
import { TableHead, TableRow, TableCell, Typography } from "@material-ui/core";

export default function MouvementHeader(props) {
  return (
    <TableHead>
      <TableRow className="h-32">
        <TableCell
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 0 1px 1px",
            background: "#e8e8e8",
          }}
        >
          <Typography
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "#474747",
              textDecoration: "underline",
            }}
          >
            N° Mouvement
          </Typography>
        </TableCell>
        <TableCell
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 0 1px 1px",
            background: "#e8e8e8",
          }}
        >
          <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
            {"Journal"}
          </Typography>
        </TableCell>
        <TableCell
          className="truncate"
          component="th"
          scope="row"
          align="left"
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 0px 1px 1px",
            background: "#e8e8e8",
          }}
        >
          <Typography style={{ fontSize: 12, fontStyle: "italic" }}>
            Date
          </Typography>
        </TableCell>
        <TableCell
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 0 1px 1px",
            background: "#e8e8e8",
          }}
        >
          <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
            Statut
          </Typography>
        </TableCell>
        <TableCell
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 0px 1px 1px",
            background: "#e8e8e8",
          }}
        >
          <Typography style={{ fontSize: 12 }}>Libellé</Typography>
        </TableCell>
        <TableCell
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 0px 1px 1px",
            background: "#e8e8e8",
          }}
        >
          <Typography style={{ fontSize: 12 }}>Piece</Typography>
        </TableCell>
        <TableCell
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 1px 1px 1px",
            background: "#e8e8e8",
            textAlign: "right",
          }}
        >
          <Typography
            style={{ fontSize: 16, fontWeight: "bold", color: "#218277" }}
          >
            Montant
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
