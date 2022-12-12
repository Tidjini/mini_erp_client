import React from "react";

import { TableRow } from "@material-ui/core";

import Cell from "app/main/composants/table/Cell";

export default function ArticleRow(props) {
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
        key="reference"
        content={item.reference}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "left",
        }}
      ></Cell>
      <Cell key="designation" content={item.designation}></Cell>
      <Cell key="unite" content={item.unite}></Cell>
      <Cell
        key="dernier_achat"
        content={item.dernier_achat}
        contentStyle={{
          fontWeight: "bold",
          color: item.alert_achat ? "#ef233c" : "#2a9d8f",
          fontSize: 13,
          textAlign: "right",
          padding: "5px 10px",
        }}
      ></Cell>
      <Cell
        key="alert_achat"
        content={
          item.alert_achat
            ? "achat très proche".toUpperCase()
            : "peut acheter".toUpperCase()
        }
        contentStyle={{
          fontWeight: "bold",
          backgroundColor: item.alert_achat ? "#ef233c" : "#2a9d8f",
          color: "#f1faee",
          fontSize: 11,
          textAlign: "right",
          padding: "5px 10px",
        }}
      ></Cell>
      <Cell key="tolere_achat" content={item.tolere_achat + "%"}></Cell>
      <Cell
        key="prix_achat_max"
        content={new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "DZD",
        }).format(item.prix_achat_max)}
        style={{
          borderWidth: "1px",
        }}
        contentStyle={{
          fontWeight: "700",
          color: "#264653",
          fontSize: 12,
          textAlign: "right",
        }}
      ></Cell>
    </TableRow>
  );
}
