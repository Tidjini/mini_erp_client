import React, { useEffect, useState } from "react";
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Checkbox,
} from "@material-ui/core";
import { FuseScrollbars } from "@fuse";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import _ from "@lodash";
import TableHeader from "./TableHeader";

class TableCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      searchText: "",
      data: [],
      page: 0,
      rowsPerPage: 10,
      order: {
        direction: "asc",
        id: null,
      },
    };
  }
  componentDidMount() {}

  handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";
    const { order } = this.state;
    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    this.setState({
      order: {
        direction,
        id,
      },
    });
  }
  handleSelectAllClick(event) {
    const { data } = this.state;

    if (event.target.checked) {
      this.setState({
        selected: data.map((n) => n.id),
      });
      return;
    }
    this.setState({
      selected: [],
    });
  }

  handleClick(item) {
    const { history, viewUrl } = this.props;
    //TODO handle this url

    history.push(viewUrl + "/" + item.id + "/" + item.handle);
  }

  handleCheck(event, id) {
    const { selected } = this.state;
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
    this.setState({
      selected: newSelected,
    });
  }
  handleChangePage(event, page) {
    this.setState({
      page,
    });
  }

  handleChangeRowsPerPage(event) {
    this.setState({
      rowsPerPage: event.target.value,
    });
  }

  render() {
    //products = collectionData
    const { rows } = this.props;
    //search Text we get it from meteor tracker
    const { selected, data, page, order, rowsPerPage } = this.state;

    /* useEffect(() => {
      dispatch(Actions.getProducts());
    }, [dispatch]);*/

    /*useEffect(() => {
      setData(
        searchText.length === 0
          ? products
          : _.filter(products, item =>
              item.name.toLowerCase().includes(searchText.toLowerCase())
            )
      );
    }, [products, searchText]);*/

    return (
      <div className="w-full flex flex-col">
        <FuseScrollbars className="flex-grow overflow-x-auto">
          <Table className="min-w-xl" aria-labelledby="tableTitle">
            <TableHeader
              numSelected={selected.length}
              order={order}
              onSelectAllClick={this.handleSelectAllClick.bind(this)}
              onRequestSort={this.handleRequestSort.bind(this)}
              rowCount={data.length}
              rows={rows}
            />

            <TableBody>
              {_.orderBy(
                data,
                [
                  (o) => {
                    switch (order.id) {
                      case "categories": {
                        return o.categories[0];
                      }
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
                  const isSelected = selected.indexOf(n.id) !== -1;
                  return (
                    <TableRow
                      className="h-64 cursor-pointer"
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                      onClick={(event) => this.handleClick(n)}
                    >
                      <TableCell
                        className="truncate"
                        component="th"
                        scope="row"
                      >
                        {n.article}
                      </TableCell>
                      <TableCell
                        className="w-48 px-4 sm:px-12"
                        padding="checkbox"
                      >
                        <Checkbox
                          checked={isSelected}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) =>
                            this.handleCheck(event, n.id).bind(this)
                          }
                        />
                      </TableCell>

                      <TableCell
                        className="w-52"
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        {n.images.length > 0 && n.featuredImageId ? (
                          <img
                            className="w-full block rounded"
                            src={
                              _.find(n.images, { id: n.featuredImageId }).url
                            }
                            alt={n.name}
                          />
                        ) : (
                          <img
                            className="w-full block rounded"
                            src="assets/images/ecommerce/product-image-placeholder.png"
                            alt={n.name}
                          />
                        )}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {n.name}
                      </TableCell>

                      <TableCell
                        className="truncate"
                        component="th"
                        scope="row"
                      >
                        {n.categories.join(", ")}
                      </TableCell>

                      <TableCell component="th" scope="row" align="right">
                        <span>$</span>
                        {n.priceTaxIncl}
                      </TableCell>

                      <TableCell component="th" scope="row" align="right">
                        {n.quantity}
                        <i
                          className={clsx(
                            "inline-block w-8 h-8 rounded ml-8",
                            n.quantity <= 5 && "bg-red",
                            n.quantity > 5 && n.quantity <= 25 && "bg-orange",
                            n.quantity > 25 && "bg-green"
                          )}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row" align="right">
                        {n.active ? (
                          <Icon className="text-green text-20">
                            check_circle
                          </Icon>
                        ) : (
                          <Icon className="text-red text-20">
                            remove_circle
                          </Icon>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </FuseScrollbars>

        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

export default withRouter(TableCollection);
