import React, { useEffect, useState } from "react";
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { FuseScrollbars } from "@fuse";
import { withRouter } from "react-router-dom";
import _ from "@lodash";
import TableHeader from "./TableHeader";
import DevisStatue from "./DevisStatus";
import DevisValidation from "./DevisValidation";
import AppActionDialog from "app/main/components/AppActionDialog";

function TableCollection(props) {
  const { columns, collection, getCollectionPage, onDelete } = props;
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

  function handleChangePage(event, page) {
    getCollectionPage(page + 1);
    setState({
      ...state,
      page,
    });
    //setIndex(page);
  }

  function handleChangeRowsPerPage(event) {
    // setState({
    //   rowsPerPage: event.target.value,
    // });
  }

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
            ).map((n) => {
              const isSelected = state.selected.indexOf(n.id) !== -1;
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
                >
                  <DevisStatue statue={n.statue} />
                  <DevisValidation date={n.date_validation} statue={n.statue} />

                  <TableCell
                    className="truncate"
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <Typography style={{ fontWeight: "bold", fontSize: 12 }}>
                      {n.numero}
                    </Typography>
                  </TableCell>
                  <TableCell className="truncate" component="th" scope="row">
                    <Typography
                      style={{
                        fontWeight: "500",
                        fontSize: 12,
                        color: "#667688",
                        fontStyle: "italic",
                      }}
                    >
                      {n.date_devis && `${getDate(n.date_devis)}`}
                    </Typography>
                  </TableCell>
                  <TableCell className="truncate" component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                      }}
                    >
                      {/* <Icon style={{ color: "#5982a2" }}>account_circle </Icon> */}
                      <Icon style={{ color: "#ee9b00" }}>
                        supervised_user_circle
                      </Icon>
                      <Typography
                        style={{
                          fontSize: 14,
                          color: "#264653",
                          paddingTop: 2,
                          marginLeft: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {n.fournisseur_object &&
                          `${n.fournisseur_object.raison_social.toUpperCase()}`}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell
                    className="truncate"
                    component="th"
                    scope="row"
                    align="left"
                  >
                    <Typography style={{ fontWeight: "bold", fontSize: 12 }}>
                      {n.numero_devis}
                    </Typography>
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
                        background: "gray",
                        color: "white",
                      }}
                    >
                      {n.modalite_reglement &&
                        n.modalite_reglement.toUpperCase()}
                    </Typography>
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
                      {n.modalite_paiement && n.modalite_paiement.toUpperCase()}
                    </Typography>
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
                      }).format(n.total_ttc)}`}
                    </Typography>
                  </TableCell>
                  {onDelete && (
                    <TableCell
                      className="truncate"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      <AppActionDialog
                        buttonLabel="Supprimez"
                        title="Suppression"
                        actionOne={() => onDelete(n)}
                        actionOneLabel="Supprimez"
                        actionTwo={undefined}
                        actionTwoLabel=""
                        actionThreeLabel="Annuler"
                        message={`Voulez-vous supprimer cette proforma ? (même les devis liés seront supprimés)`}
                        backgroundColor={"red"}
                      />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        component="div"
        style={{ minHeight: 68 }}
        count={state.count}
        rowsPerPage={state.rowsPerPage}
        rowsPerPageOptions={[state.rowsPerPage]}
        page={state.page}
        backIconButtonProps={{
          "aria-label": "Précédente Page",
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
