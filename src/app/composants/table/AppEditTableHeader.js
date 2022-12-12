import React from "react";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";

export default function AppEditTableHeader(props) {
  const { cells, height } = props;

  return (
    <TableHead>
      <TableRow className={`h-${height}`}>
        {cells.map((cell, index) => (
          <TableCell
            key={index}
            className="truncate"
            component="th"
            scope="row"
            align={cell.align}
            style={cell.cellStyle}
          >
            <Typography style={cell.contentStyle}>{cell.content}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
