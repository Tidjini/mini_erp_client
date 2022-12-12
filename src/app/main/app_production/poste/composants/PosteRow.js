import React from "react";

import { TableRow, Typography } from "@material-ui/core";

import { convertToTonne, getDate } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

export default function PosteRow(props) {
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
      <Cell key="intitule" content={item.intitule}></Cell>
      <Cell key="periode" content={item.periode}></Cell>
      <Cell
        key="nbr_heure"
        content={`${item.nbr_heure} Heure(s)`}
        style={{
          borderWidth: "1px",
        }}
      ></Cell>
    </TableRow>
  );
}
