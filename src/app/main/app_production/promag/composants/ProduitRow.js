import React from "react";

import { TableRow, Typography } from "@material-ui/core";

import { convertToTonne, getDate } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

export default function ProduitRow(props) {
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
      <Cell key="designation" content={item.designation}></Cell>
      <Cell
        key="symbole"
        content={item.symbole}
        contentStyle={{
          fontWeight: "600",
          color: "#474747",
          fontSize: 12,
          textTransform: "uppercase",
        }}
      ></Cell>
      <Cell
        key="nbr_piece_wagon"
        content={item.nbr_piece_wagon}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="nbr_piece_palette_production"
        content={item.nbr_piece_palette_production}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="nbr_piece_palette_emballage"
        content={item.nbr_piece_palette_emballage}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>

      <Cell
        key="qte_stock"
        content={item.qte_stock}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="qte_stock_pt"
        content={`${item.qte_stock_pt} pt`}
        contentStyle={{
          fontWeight: "700",
          color: "#005f73",
          fontSize: 14,
          textAlign: "left",
        }}
      ></Cell>

      <Cell
        key="qte_stock_vrac"
        content={`${item.qte_stock_vrac} piece`}
        contentStyle={{
          fontWeight: "700",
          color: "#005f73",
          fontSize: 14,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="poids"
        content={`${item.poids}`}
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
