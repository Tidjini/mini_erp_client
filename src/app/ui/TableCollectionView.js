import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import { FuseScrollbars } from "@fuse";
import { withRouter } from "react-router-dom";
import _ from "@lodash";
import AppTableRow from "./AppTableRow";
import AppTableCell from "./AppTableCell";
import { getMultiValue } from "../helpers/utils";
import { Colors } from "../main/Config";

function TableCollectionView(props) {
  const {
    rows,
    data,
    viewUrl,
    dataTemplate,
    onEditing,
    count,
    setNextPage,
    next,
    previous,
    index,
  } = props;

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
      setSelected(data.map((n) => n.url));
      return;
    }
    setSelected([]);
  }

  function onChangePage(event, page) {
    setPage(0);
    setNextPage(index + page);
  }

  function onChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table
          className="min-w-md"
          size="small"
          stickyHeader={true}
          aria-labelledby="tableTitle"
        >
          <TableBody style={{ minHeight: 50, color: Colors.subtitle }}>
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
              .map((n) => {
                const isSelected = selected.indexOf(n.url) !== -1;
                return (
                  <AppTableRow
                    isSelected={isSelected}
                    key={n.url}
                    onClick={(event) => {
                      if (onEditing != undefined) onEditing(n);
                    }}
                  >
                    {dataTemplate.map((data) => (
                      <AppTableCell
                        type={data.type}
                        value={getMultiValue(
                          n,
                          data.value,
                          data.upper,
                          data.suifix,
                          data.list
                        )}
                        label={getMultiValue(n, data.label)}
                        style={data.style}
                        Composant={data.composant}
                      />
                    ))}
                  </AppTableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[200]}
          page={page}
          backIconButtonProps={{
            "aria-label": "Précédente Page",
            disabled: previous === null || previous === undefined,
          }}
          nextIconButtonProps={{
            "aria-label": "Page Suivante",
            disabled: next === null || next === undefined,
          }}
          labelDisplayedRows={({ from, to, count }) =>
            `  ${from + (index - 1) * 200}-${
              to + (index - 1) * 200 > count ? count : to + (index - 1) * 200
            } sur ${count !== -1 ? count : "more than" + to}`
          }
          labelRowsPerPage="Lignes par page"
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          style={{}}
        />
      </FuseScrollbars>
    </div>
  );
}
export const TableCollection = withRouter(TableCollectionView);
