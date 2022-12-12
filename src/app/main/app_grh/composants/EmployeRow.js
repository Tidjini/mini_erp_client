import React from "react";

import { TableRow, Typography } from "@material-ui/core";

import { convertToTonne, getDate } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

export default function EmployeRow(props) {
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
      <Cell key="nom" content={item.nom}></Cell>
      <Cell key="prenom" content={item.prenom}></Cell>
      <Cell key="poste" content={item.poste}></Cell>
      <Cell key="service" content={item.service_nom}></Cell>
      <Cell key="statue" content={item.statue}></Cell>
      <Cell
        key="superviseur"
        content={item.superviseur !== null ? "Oui" : "Non"}
        style={{
          borderWidth: "1px",
        }}
      ></Cell>
    </TableRow>
  );
}
