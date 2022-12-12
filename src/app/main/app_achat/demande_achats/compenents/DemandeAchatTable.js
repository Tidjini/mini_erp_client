import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { FuseScrollbars } from "@fuse";
import _ from "@lodash";
import AppTableRow from "app/main/components/AppTableRow";
import { Grid, TableCell } from "@material-ui/core";
import AppTableHeader from "app/main/components/AppTableHeader";
import DemandeAchatArticleForm from "./DemandeAchatArticleForm";

export default function DemandeAchatTable(props) {
  const { columns, form, onEditing, xs, md, data } = props;

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  function onSort(event, property) {
    const id = property;
    let direction = "desc";
    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }
  function onSelectAll(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function onChangePage(event, page) {
    setPage(0);
    // !setNextPage(index + page);
  }

  function onChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }
  if (form === undefined) return "Form is undefined";
  return (
    <Grid container item xs={xs} md={md} spacing={2} style={styles.container}>
      <DemandeAchatArticleForm style={styles.form} form={form} />

      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table
          className="min-w-md"
          size="small"
          stickyHeader={true}
          aria-labelledby="tableTitle"
        >
          <AppTableHeader
            numSelected={selected.length}
            order={order}
            onSelectAllClick={onSelectAll}
            onRequestSort={onSort}
            rowCount={data.length}
            columns={columns}
          />
          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n, index) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <AppTableRow
                    isSelected={isSelected}
                    key={index}
                    onClick={(event) => {
                      if (onEditing !== undefined) onEditing(n);
                    }}
                    style={styles.row}
                  >
                    <TableCell
                      className="truncate"
                      component="th"
                      scope="row"
                      style={styles.article}
                    >
                      {n.article}
                    </TableCell>
                    <TableCell
                      className="truncate"
                      component="th"
                      scope="row"
                      style={styles.qte}
                    >
                      {n.qte}
                    </TableCell>
                    <TableCell
                      className="truncate"
                      component="th"
                      scope="row"
                      style={styles.unite}
                    >
                      {n.unite}
                    </TableCell>
                  </AppTableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>
    </Grid>
  );
}

const styles = {
  container: {
    backgroundColor: "#F8F9FE",
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  row: {
    height: 48,
    margin: 4,
    boxShadow: "1px 1px 1px #C0c0c055",
  },

  form: {},
  article: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#707486",
    // fontStyle: "italic",
  },
  qte: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  unite: {
    fontSize: 16,
    fontWeight: "bold",
  },
};
