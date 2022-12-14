import React, { useEffect, useState } from "react";
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Checkbox,
  Typography,
  ProgressBar,
} from "@material-ui/core";
import { FuseScrollbars } from "@fuse";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import _ from "@lodash";
import TableHeader from "./TableHeader";
// import TasksProgress from "./TasksProgress";

function TableCollection(props) {
  const { columns, collection, getCollectionPage } = props;
  const [state, setState] = useState({
    selected: [],
    searchText: "",
    data: [],
    page: 0,
    rowsPerPage: 50,
    order: {
      direction: "asc",
      id: null,
    },
    count: 0,
    previous: null,
    next: null,
  });

  useEffect(() => {
    setState({
      ...state,
      data: [...collection.results],
      count: collection.count,
      previous: collection.previous,
      next: collection.next,
    });
  }, [collection]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";
    const { order } = state;
    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setState({
      ...state,
      order: {
        direction,
        id,
      },
    });
  }
  function handleSelectAllClick(event) {}

  function handleClick(item) {
    const { history, viewUrl } = props;
    history.push(viewUrl + "/" + item.id + "/");
  }

  function handleCheck(event, id) {
    const { selected } = state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setState({
      selected: newSelected,
    });
  }
  function handleChangePage(event, page) {
    getCollectionPage(page + 1);
    setState({
      ...state,
      page,
    });
    //setIndex(page);
  }

  function handleChangeRowsPerPage(event) {}

  function getDate(date) {
    const dateTime = new Date(date);
    return `${("0" + dateTime.getDate()).slice(-2)}/${(
      "0" +
      (dateTime.getMonth() + 1)
    ).slice(-2)}/${dateTime.getFullYear()}`;
  }
  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <TableHeader
            numSelected={state.selected.length}
            order={state.order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={state.data.length}
            columns={columns}
          />

          <TableBody>
            {_.orderBy(
              state.data,
              [
                (o) => {
                  switch (state.order.id) {
                    default: {
                      return o[state.order.id];
                    }
                  }
                },
              ],
              [state.order.direction]
            )
              // .slice(
              //   state.page * state.rowsPerPage,
              //   state.page * state.rowsPerPage + state.rowsPerPage
              // )
              .map((n) => {
                const isSelected = state.selected.indexOf(n.id) !== -1;
                const progress = (n.tasks_today_done / n.tasks_today) * 100;
                return (
                  <TableRow
                    className="h-64 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                    style={{
                      background:
                        n.acheve === true ? "#DEE2E680" : "transparent",
                      textDecoration:
                        n.acheve === true ? "line-through" : "none",
                    }}
                  >
                    <TableCell className="truncate" component="th" scope="row">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignContent: "center",
                        }}
                      >
                        <img
                          alt="homme femme"
                          src={
                            n.acheve === true
                              ? "assets/images/check.png"
                              : "assets/images/work_process.png"
                          }
                          style={{
                            width: 24,
                            height: 24,
                          }}
                        />
                        <div>
                          <Typography
                            style={{
                              fontWeight: "bold",
                              fontSize: 14,
                              marginLeft: 14,
                              alignSelf: "center",
                            }}
                          >
                            {n.task.toUpperCase()}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: 12,
                              marginLeft: 14,
                              alignSelf: "center",
                              fontStyle: "italic",
                            }}
                          >
                            {n.descrpition}
                          </Typography>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell
                      className="truncate"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignContent: "center",
                        }}
                      >
                        <img
                          alt="homme femme"
                          src={"assets/images/clock.png"}
                          style={{
                            width: 24,
                            height: 24,
                          }}
                        />

                        <Typography
                          style={{
                            fontWeight: "bold",
                            fontSize: 11,
                            marginLeft: 14,
                            alignSelf: "center",
                          }}
                        >
                          {n.time}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell
                      className="truncate"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignContent: "center",
                        }}
                      >
                        <img
                          alt="homme femme"
                          src={
                            n.sex === 1
                              ? "assets/images/man.png"
                              : "assets/images/woman.png"
                          }
                          style={{
                            width: 28,
                            height: 28,
                          }}
                        />

                        <Typography
                          style={{
                            fontSize: 16,
                            marginLeft: 14,
                            alignSelf: "center",
                          }}
                        >
                          {n.persone}
                        </Typography>
                      </div>
                    </TableCell>

                    <TableCell
                      className="truncate"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignContent: "center",
                        }}
                      >
                        <img
                          alt="homme femme"
                          src={
                            n.retard === false
                              ? "assets/images/clock_in.png"
                              : "assets/images/time.png"
                          }
                          style={{
                            width: 28,
                            height: 28,
                          }}
                        />

                        <Typography
                          style={{
                            fontWeight: "bold",
                            fontSize: 14,
                            marginLeft: 14,
                            alignSelf: "center",
                          }}
                        >
                          {n.retard === false
                            ? "?? temps".toLocaleUpperCase()
                            : "en retard".toLocaleUpperCase()}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell
                      className="truncate"
                      component="th"
                      scope="row"
                      align="left"
                      width={50}
                    >
                      <Typography
                        style={{
                          fontWeight: "bold",
                          fontSize: 12,
                          borderRadius: 5,
                          padding: "8px 20px",
                          textAlign: "center",
                          background: "#403F4C",
                          color: "white",
                        }}
                      >
                        {n.state.toUpperCase()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      {/* <TablePagination
        component="div"
        count={state.data.length}
        rowsPerPage={state.rowsPerPage}
        page={state.page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}

      <TablePagination
        component="div"
        style={{ minHeight: 68 }}
        count={state.count}
        rowsPerPage={state.rowsPerPage}
        rowsPerPageOptions={[state.rowsPerPage]}
        page={state.page}
        backIconButtonProps={{
          "aria-label": "Pr??c??dente Page",
          disabled: state.previous === null || state.previous === undefined,
        }}
        nextIconButtonProps={{
          "aria-label": "Page Suivante",
          disabled: state.next === null || state.next === undefined,
        }}
        labelDisplayedRows={({ from, to, count }) => {
          return `  ${from}-${to > count ? count : to} sur ${
            count !== -1 ? count : "more than" + to
          }`;
        }}
        labelRowsPerPage="Lignes par page"
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(TableCollection);
