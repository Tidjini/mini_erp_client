import React, { useState } from "react";
import {
  TableHead,
  TableSortLabel,
  TableCell,
  TableRow,
  Tooltip,
  ListItemText,
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper,
  },
}));

function TableHeader(props) {
  const { columns } = props;
  const classes = useStyles(props);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-64">
        {columns.map((column) => {
          return (
            <TableCell
              key={column.id}
              align={column.align}
              padding={column.disablePadding ? "none" : "default"}
              sortDirection={
                props.order.id === column.id ? props.order.direction : false
              }
            >
              {column.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    column.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === column.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
