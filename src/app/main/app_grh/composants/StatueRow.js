import React from "react";

import { TableRow } from "@material-ui/core";

import Cell from "app/main/composants/table/Cell";

export default function StatueRow(props) {
  const { item, onDoubleClick, onClick } = props;

  return (
    <TableRow
      className="h-32"
      style={{
        cursor: "pointer",
      }}
      onDoubleClick={(e) => {
        onDoubleClick && onDoubleClick(e, item);
      }}
      onClick={(e) => {
        onClick && onClick(e, item);
      }}
    >
      <Cell key="statue" content={item.statue}></Cell>
      <Cell
        key="active"
        content={item.active ? "Active" : "Non Active"}
        style={{
          borderWidth: "1px",
        }}
      ></Cell>
    </TableRow>
  );
}
