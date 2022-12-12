import React from "react";
import {
  TableHead as BaseTableHead,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";

export default function EtatProductionHeader(props) {
  const { cells } = props;
  return (
    <BaseTableHead>
      <TableRow>
        <TableCell />
        <TableCell />
        <TableCell
          align="center"
          colSpan={8}
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 0 1px 1px",
            textTransform: "uppercase",
            background: "#fcbf49",
            fontWeight: "bold",
            color: "#474747",
            fontSize: 18,
          }}
        >
          PRODUCTION
        </TableCell>
        <TableCell
          align="center"
          colSpan={8}
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 0 1px 1px",
            textTransform: "uppercase",

            background: "#83c5be",
            color: "#474747",
            fontSize: 18,
          }}
        >
          EMBALAGE
        </TableCell>
        <TableCell
          align="center"
          colSpan={2}
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px 0 1px 1px",
            textTransform: "uppercase",
            background: "#ffc300",
            color: "#474747",
            fontSize: 18,
          }}
        >
          éxpédition
        </TableCell>
        <TableCell
          align="center"
          colSpan={2}
          style={{
            border: "1px solid #9E9E9E60",
            borderWidth: "1px",
            textTransform: "uppercase",
            background: "#cfdbd5",
            color: "#474747",
            fontSize: 18,
          }}
        >
          Stocks
        </TableCell>
      </TableRow>
      {cells && (
        <TableRow className="h-32">
          {cells.map((cell, index) => (
            <TableCell key={cell.id} style={cell.cellStyle}>
              <Typography
                style={{
                  ...cell.contentStyle,
                  fontSize: 11,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {cell.label}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      )}
    </BaseTableHead>
  );
}
