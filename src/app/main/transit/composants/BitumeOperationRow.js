import React from "react";

import { TableRow, Typography } from "@material-ui/core";

import { convertToTonne, getDate } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

export default function BitumeOperationRow(props) {
  const { item, onDoubleClick, onClick } = props;

  return (
    <TableRow
      className="h-32"
      style={{
        cursor: "pointer",
        backgroundColor: item.cloture ? "#ef476f05" : "#83c5be10",
      }}
      onDoubleClick={(e) => {
        onDoubleClick && onDoubleClick(e, item);
      }}
      onClick={(e) => {
        onClick && onClick(e, item);
      }}
    >
      <Cell key="numero" content={item.numero}></Cell>
      <Cell
        key="navire"
        content={item.navire}
        contentStyle={{
          fontWeight: "600",
          color: "#474747",
          fontSize: 12,
          textTransform: "uppercase",
        }}
      ></Cell>
      <Cell
        key="gros"
        content={item.gros}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="qte_effective"
        content={convertToTonne(item.qte_effective)}
        contentStyle={{
          fontWeight: "700",
          color: "#005f73",
          fontSize: 14,
          textAlign: "left",
        }}
      ></Cell>

      <Cell key="periode">
        <Typography
          style={{
            fontWeight: "700",
            color: "#474747",
            fontSize: 12,
            textAlign: "left",
          }}
        >
          <span style={{ color: "#f77f00" }}>{getDate(item.debut)}</span>
          <span style={{ color: "#003049" }}> {` - ${getDate(item.fin)}`}</span>
        </Typography>
      </Cell>
      <Cell
        key="cloture"
        style={{
          borderWidth: "1px",
        }}
      >
        <Typography
          style={{
            fontWeight: "700",
            color: item.cloture ? "#ef476f" : "#06d6a0",
            fontSize: 12,
            textAlign: "right",
            padding: "5px 15px",
            borderRadius: 5,
            backgroundColor: item.cloture ? "#ef476f20" : "#83c5be20",
            textTransform: "uppercase",
          }}
        >
          {item.cloture ? "Fermée" : "Ouverte"}
        </Typography>
      </Cell>
    </TableRow>
  );
}
