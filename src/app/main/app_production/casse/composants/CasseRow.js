import React from "react";

import { TableRow } from "@material-ui/core";

import { getDate } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

export default function CasseRow(props) {
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
        key="produit"
        content={item.produit_object && `${item.produit_object.designation}`}
      ></Cell>

      <Cell
        key="nbr_palette"
        content={`${item.nbr_palette} Pt`}
        contentStyle={{
          fontWeight: "600",
          color: "#474747",
          fontSize: 12,
          textTransform: "uppercase",
        }}
      ></Cell>
      <Cell
        key="nbr_piece"
        content={`${item.nbr_piece} piece`}
        contentStyle={{
          fontWeight: "600",
          color: "#474747",
          fontSize: 12,
          textTransform: "uppercase",
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
        style={{
          borderWidth: "1px",
        }}
      ></Cell>

      <Cell
        key="type"
        content={`${item.type}`}
        contentStyle={{
          fontWeight: "600",
          color: "#474747",
          fontSize: 12,
          textTransform: "uppercase",
        }}
      ></Cell>
      <Cell
        key="type"
        content={`${item.phase}`}
        contentStyle={{
          fontWeight: "600",
          color: "#474747",
          fontSize: 12,
          textTransform: "uppercase",
        }}
        style={{
          borderWidth: "1px",
        }}
      ></Cell>
    </TableRow>
  );
}
