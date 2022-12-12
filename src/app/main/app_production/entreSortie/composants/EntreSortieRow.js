import React from "react";

import { Icon, TableRow } from "@material-ui/core";

import { getDate } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

export default function EntreSortieRow(props) {
  const { item, onDoubleClick, onClick } = props;

  return (
    <TableRow
      className="h-32"
      style={{
        cursor: "pointer",
        backgroundColor: item.type === "ENTREE" ? "#2a9d8f10" : "#fb560710",
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
        key="type"
        content={
          <Icon
            style={{
              color: item.type === "ENTREE" ? "green" : "red",
              backgroundColor:
                item.type === "ENTREE" ? "#2a9d8f10" : "#fb560710",
              fontSize: 16,
              width: 24,
              height: 24,
              borderRadius: 12,
              textAlign: "center",
              paddingTop: 6,
            }}
          >
            {item.type === "ENTREE" ? "arrow_upward" : "arrow_downward"}
          </Icon>
        }
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>

      <Cell
        key="observation"
        content={`${item.observation}`}
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
