import React from "react";

import { TableRow } from "@material-ui/core";

import { getDate } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

export default function OperationRow(props) {
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
        key="wagon"
        content={item.wagon}
        style={{
          width: 120,
        }}
      ></Cell>
      <Cell
        key="date"
        content={`${getDate(item.date)}`}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
        style={{
          width: 150,
        }}
      ></Cell>
      <Cell
        key="intitule"
        content={item.intitule}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
        style={{
          width: 200,
        }}
      ></Cell>
      <Cell
        key="produit"
        content={item.produit_designation}
        style={{
          width: 150,
        }}
      ></Cell>
      <Cell
        key="phase"
        content={item.phase}
        style={{
          width: 100,
        }}
      ></Cell>
      <Cell
        key="anomalie"
        content={item.anomalie === true ? "Anomalie" : "Normal"}
        contentStyle={{
          fontWeight: "700",
          color: item.anomalie === true ? "#e63946" : "#2a9d8f",
          fontSize: 12,
          textAlign: "left",
        }}
        style={{
          width: 100,
        }}
      ></Cell>
      <Cell
        key="anomalie_flag"
        content={item.anomalie === true ? item.anomalie_flag : ""}
        contentStyle={{
          fontWeight: "700",
          color: item.anomalie === true ? "#e63946" : "#2a9d8f",
          fontSize: 12,
          textAlign: "left",
        }}
        style={{
          width: 150,
        }}
      ></Cell>

      <Cell
        key="anomalie_agent"
        content={item.agent_anomalie}
        style={{
          width: 150,
        }}
      ></Cell>
      <Cell
        key="anomalie_remarque"
        content={item.anomalie_remarque}
        style={{
          borderWidth: "1px",
        }}
      ></Cell>
    </TableRow>
  );
}
