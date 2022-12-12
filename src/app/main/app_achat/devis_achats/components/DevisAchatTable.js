import React, { useCallback, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import { FuseScrollbars } from "@fuse";
import { withRouter } from "react-router-dom";
import _ from "@lodash";
import AppTableRow from "app/main/components/AppTableRow";
import { Grid, TableCell, TableRow, Typography } from "@material-ui/core";
import AppTableHeader from "app/main/components/AppTableHeader";
import DevisAchatArticleForm from "./DevisAchatArticleForm";
import DevisAchatTableFooter from "./DevisAchatTableFooter";

export default function DevisAchatTable(props) {
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
      <DevisAchatArticleForm style={styles.form} form={form} />
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
                    <TableCell
                      className="truncate"
                      component="th"
                      scope="row"
                      align="right"
                      style={styles.prix}
                    >
                      {`${new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "DZD",
                      }).format(n.prix_unite)}`}
                    </TableCell>
                    <TableCell
                      className="truncate"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <Typography
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          border: "1px solid gray",
                          borderRadius: 5,
                          padding: "8px 20px",
                          textAlign: "right",
                        }}
                      >
                        {`${new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "DZD",
                        }).format(n.total)}`}
                      </Typography>
                    </TableCell>
                  </AppTableRow>
                );
              })}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell
                colSpan={3}
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  borderRadius: 5,
                  textAlign: "right",
                }}
              >
                Total HT
              </TableCell>
              <TableCell align="right">
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    border: "1px solid lightgray",
                    borderRadius: 5,
                    padding: "8px 20px",
                    textAlign: "right",
                  }}
                >
                  {`${new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "DZD",
                  }).format(form.total)}`}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={3}
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  borderRadius: 5,
                  textAlign: "right",
                }}
              >
                Total TVA
              </TableCell>
              <TableCell align="right">
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    border: "1px solid lightgray",
                    borderRadius: 5,
                    padding: "8px 20px",
                    textAlign: "right",
                  }}
                >
                  {`${new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "DZD",
                  }).format(form.total_tva)}`}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={3}
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  borderRadius: 5,
                  textAlign: "right",
                }}
              >
                Total TTC
              </TableCell>
              <TableCell align="right">
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    border: "1px solid lightgray",
                    borderRadius: 5,
                    padding: "8px 20px",
                    textAlign: "right",
                  }}
                >
                  {`${new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "DZD",
                  }).format(form.total_ttc)}`}
                </Typography>
              </TableCell>
            </TableRow>

            {/* <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                0
              )} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow> */}
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
  prix: {
    fontSize: 12,
    fontWeight: "500",
  },
};
