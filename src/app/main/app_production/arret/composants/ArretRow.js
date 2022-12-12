import React from "react";

import { TableRow } from "@material-ui/core";

import { getDate } from "app/main/helpers/utils";
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
      <Cell
        key="date_debut"
        content={`${getDate(item.date)}`}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>

      <Cell
        key="poste"
        content={item.poste}
        contentStyle={{
          fontWeight: "600",
          color: "#474747",
          fontSize: 12,
          textTransform: "uppercase",
        }}
      ></Cell>

      <Cell
        key="heure_debut"
        content={`${item.heure_debut} / ${item.heure_fin}`}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>

      <Cell
        key="duree_minute"
        content={`${item.duree_minute} min`}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>

      <Cell
        key="zone"
        content={`${item.type_arret}`}
        contentStyle={{
          fontWeight: "700",
          color: "#005f73",
          fontSize: 14,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="type_arret"
        content={`${item.type_intervention}`}
        contentStyle={{
          fontWeight: "700",
          color: "#005f73",
          fontSize: 14,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="equipement"
        content={item.equipement}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>

      <Cell
        key="description"
        content={`${item.description}`}
        contentStyle={{
          fontWeight: "700",
          color: "#005f73",
          fontSize: 14,
          textAlign: "left",
        }}
      ></Cell>
      <Cell
        key="intervenant"
        content={
          item.intervenant_object &&
          `${item.intervenant_object.nom} ${item.intervenant_object.prenom}`
        }
        style={{
          borderWidth: "1px",
        }}
      ></Cell>
    </TableRow>
  );
}


