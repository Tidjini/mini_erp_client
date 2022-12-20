import React from "react";
//thirds
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { forecolors } from "../constants";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#F5F4F5",
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#E7E9EF",
    color: forecolors.default,
    fontSize: 12,
    fontWeight: "700",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
export default function CollectionBody() {
  return (
    <TableBody>
      {rows.map((row) => (
        <StyledTableRow key={row.name}>
          <StyledTableCell component="th" scope="row">
            {row.name}
          </StyledTableCell>
          <StyledTableCell align="right">{row.calories}</StyledTableCell>
          <StyledTableCell align="right">{row.fat}</StyledTableCell>
          <StyledTableCell align="right">{row.carbs}</StyledTableCell>
          <StyledTableCell align="right">{row.protein}</StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
