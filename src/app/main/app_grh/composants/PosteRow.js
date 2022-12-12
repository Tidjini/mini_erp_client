import React from "react";

import { TableRow } from "@material-ui/core";

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
      <Cell key="poste" content={item.poste}></Cell>
      <Cell key="mission" content={item.mission}></Cell>
      <Cell key="taches" content={item.taches}></Cell>
      <Cell key="competences" content={item.competences}></Cell>
      <Cell
        key="type"
        content={item.type}
        style={{
          borderWidth: "1px",
        }}
      ></Cell>
    </TableRow>
  );
}
