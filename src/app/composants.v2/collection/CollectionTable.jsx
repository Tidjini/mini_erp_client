import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { forecolors } from "app/composants.v2/constants";
import CollectionHeader from "app/composants.v2/collection/CollectionHeader";

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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#F5F4F5",
    },
  },
}))(TableRow);

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const cells = [
  { ordering: true, label: "Dessert (100g serving)", id: 1 },
  { ordering: true, label: "Calories", align: "right", id: 2 },
  { label: "Fat&nbsp;(g)", align: "right", id: 3 },
  { ordering: true, label: "Carbs&nbsp;(g)", align: "right", id: 4 },
  { label: "Protein&nbsp;(g)", align: "right", id: 5 },
];

export default function CollectionTable(props) {
  const { cells, orderBy, order, onSort } = props;

  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ maxHeight: 200 }}>
      <Table
        className={classes.table}
        stickyHeader
        aria-label="customized table"
      >
        <CollectionHeader
          cells={cells}
          orderBy={orderBy}
          order={order}
          onSort={onSort}
        />
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
      </Table>
    </TableContainer>
  );
}
