import React from "react";
//thirds
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import { forecolors } from "../constants";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#E7E9EF",
    color: forecolors.default,
    fontSize: 12,
    fontWeight: "700",
    height: 10,
    innerHeight: 10,
  },
}))(TableCell);

export default function CollectionHeader(props) {
  const { cells, orderBy, order, onSort } = props;

  return (
    <TableHead>
      <TableRow>
        {cells && cells.map((cell) => setCell(cell, orderBy, order, onSort))}
      </TableRow>
    </TableHead>
  );
}

function setCell(cell, orderBy, order, onSort) {
  const { ordering, label, align, id } = cell;
  if (Boolean(ordering))
    return (
      <StyledTableCell key={id} align={align || "left"}>
        <TableSortLabel
          active={orderBy === id}
          direction={orderBy === id ? order : "asc"}
          onClick={onSort(id)}
        >
          {label}
        </TableSortLabel>
      </StyledTableCell>
    );
  return (
    <StyledTableCell key={id} align={align || "left"}>
      {label}
    </StyledTableCell>
  );
}
