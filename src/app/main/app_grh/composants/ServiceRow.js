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
      <Cell
        key="service"
        content={item.service}
        style={{
          borderWidth: "1px",
        }}
      ></Cell>
    </TableRow>
  );
}
