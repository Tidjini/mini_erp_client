import React from "react";

import { TableRow, Typography } from "@material-ui/core";

import { convertToTonne, getDate } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

export default function WagonRow(props) {
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
      <Cell key="numero" content={item.numero}></Cell>

      <Cell
        key="phase_actuel"
        content={item.phase_actuel}
        contentStyle={{
          fontWeight: "700",
          color: "white",
          fontSize: 12,
          textAlign: "left",
        }}
        style={{
          fontWeight: "bold",
          fontSize: 12,
          padding: "5px 15px",
          textAlign: "center",
          background:
            item.phase_actuel === "ATTENTE"
              ? "#002C3D"
              : item.phase_actuel === "EMPILEMENT"
              ? "#005F73"
              : item.phase_actuel === "ENFOURNEMENT"
              ? "#CA6702"
              : item.phase_actuel === "DEFOURNEMENT"
              ? "#BB3E03"
              : "#EE9B00",
          color: "white",
          textTransform: "uppercase",
          maxWidth: 150,
        }}
      ></Cell>

      <Cell
        key="produit"
        content={item.produit_object && item.produit_object.designation}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="nbr_piece_wagon_actuel"
        content={item.nbr_piece_wagon_actuel}
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
