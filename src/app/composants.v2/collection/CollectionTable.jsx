import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import CollectionHeader from "app/composants.v2/collection/CollectionHeader";
import CollectionBody from "./CollectionBody";
import CollectionPagination from "./CollectionPagination";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CollectionTable(props) {
  const {
    cells,
    orderBy,
    order,
    onSort,
    data,
    children,
    itemHandlers,
    selectedItem,
  } = props;

  const classes = useStyles();

  return (
    <Paper>
      <TableContainer style={{ maxHeight: 900 }}>
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
          <CollectionBody
            cells={cells}
            data={data}
            eventHandlers={itemHandlers}
            selectedItem={selectedItem}
          >
            {children}
          </CollectionBody>
          <CollectionPagination />
        </Table>
      </TableContainer>
    </Paper>
  );
}
