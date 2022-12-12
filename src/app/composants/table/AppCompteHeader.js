import React from "react";
import { TableHead, TableRow, TableCell, Typography } from "@material-ui/core";

export default function AppCompteHeader(props) {
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
              fontSize: 16,
              fontWeight: "bold",
              color: "#474747",
              textDecoration: "underline",
            }}
          >
            Compte
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
            Label
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
            Nombre Ecritures
          </Typography>
        </TableCell>
        <TableCell
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 1px 1px 1px",
            background: "#e8e8e8",
          }}
        >
          <Typography
            style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}
          >
            Débit
          </Typography>
        </TableCell>
        <TableCell
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 1px 1px 1px",
            background: "#e8e8e8",
          }}
        >
          <Typography
            style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}
          >
            Crédit
          </Typography>
        </TableCell>
        <TableCell
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 1px 1px 1px",
            background: "#e8e8e8",
          }}
        >
          <Typography
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#218277",
              textAlign: "right",
            }}
          >
            Solde Débit
          </Typography>
        </TableCell>
        <TableCell
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 1px 1px 0",
            background: "#e8e8e8",
          }}
        >
          <Typography
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#C53D1B",
              textAlign: "right",
            }}
          >
            Solde Crédit
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
