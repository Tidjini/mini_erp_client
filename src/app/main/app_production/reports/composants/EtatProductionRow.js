import React from "react";

import { TableRow, Typography } from "@material-ui/core";

import { convertToTonne, getDate } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

export default function EtatProductionRow(props) {
  const { item, onDoubleClick, onClick } = props;
  const normalStyle = {
    fontWeight: "700",
    color: "#474747",
    fontSize: 11,
  };

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
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        content={item.date !== "TOTAL" ? getDate(item.date) : "TOTAL"}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="equipe"
        contentStyle={{ ...normalStyle, textTransform: "uppercase" }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
        content={item.equipe}
      ></Cell>
      <Cell
        key="production_objectif"
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        content={item.production_objectif}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>

      <Cell
        key="production_total"
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        content={item.production_total}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="production_ecart"
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        content={item.production_ecart}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="production_Brique 08"
        content={item["production_Brique 08"]}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="production_Brique 12"
        content={item["production_Brique 12"]}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="production_durre"
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        content={item.production_durre}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="production_arret"
        content={item.production_arret}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="production_effective"
        content={item.production_effective}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="emballage_objectif"
        content={item.emballage_objectif}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="emballage_total"
        content={item.emballage_total}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="emballage_ecart"
        content={item.emballage_ecart}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="emballage_Brique 08"
        content={item["emballage_Brique 08"]}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="emballage_Brique 12"
        content={item["emballage_Brique 12"]}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="emballage_durre"
        content={item.emballage_durre}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="emballage_arret"
        content={item.emballage_arret}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="emballage_effective"
        content={item.emballage_effective}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="expedition_Brique 08"
        content={item["expedition_Brique 08"]}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="expedition_Brique 12"
        content={item["expedition_Brique 12"]}
        contentStyle={{
          ...normalStyle,
          color: item.date === "TOTAL" ? "#e8e8e8" : "#474747",
        }}
        style={{
          ...normalStyle,
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="stocks_Brique 08"
        content={item["stocks_Brique 08"]}
        contentStyle={{ ...normalStyle, fontSize: 12 }}
        style={{
          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
      <Cell
        key="stocks_Brique 12"
        content={item["stocks_Brique 12"]}
        contentStyle={{ ...normalStyle, fontSize: 12 }}
        style={{
          borderWidth: "1px",

          background: item.date === "TOTAL" ? "#474747" : "#e8e8e810",
        }}
      ></Cell>
    </TableRow>
  );
}
