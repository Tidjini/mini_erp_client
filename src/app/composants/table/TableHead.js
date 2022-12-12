import React from "react";
import {
  TableHead as BaseTableHead,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";

export default function TableHead(props) {
  const { cells } = props;
  return (
    <BaseTableHead>
      {cells && (
        <TableRow className="h-32">
          {cells.map((cell, index) => (
            <TableCell key={cell.id} style={cell.cellStyle}>
              <Typography style={cell.contentStyle}>{cell.label}</Typography>
            </TableCell>
          ))}
        </TableRow>
      )}
    </BaseTableHead>
  );
}
