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
import CollectionBody from "./CollectionBody";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CollectionTable(props) {
  const { cells, orderBy, order, onSort, data, children } = props;

  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ maxHeight: 900 }}>
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
        <CollectionBody cells={cells} data={data}>
          {children}
        </CollectionBody>
      </Table>
    </TableContainer>
  );
}
