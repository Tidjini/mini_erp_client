import React from "react";

import { TableRow } from "@material-ui/core";

import { getDate } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

export default function ProductionRow(props) {
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
        key="date"
        content={`${getDate(item.date)}`}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="intitule"
        content={`${item.intitule}`}
        contentStyle={{
          fontWeight: "700",
          color: "#005f73",
          fontSize: 14,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="poste"
        content={`${item.poste}`}
        contentStyle={{
          fontWeight: "700",
          color: "#005f73",
          fontSize: 14,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="equipe"
        content={`${item.equipe}`}
        contentStyle={{
          fontWeight: "700",
          color: "#005f73",
          fontSize: 14,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="responsable_object"
        content={`${item.responsable_nom}`}
        contentStyle={{
          fontWeight: "700",
          color: "#005f73",
          fontSize: 14,
          textAlign: "left",
        }}
        style={{
          borderWidth: "1px",
        }}
      ></Cell>
    </TableRow>
  );
}
