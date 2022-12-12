import React from "react";

import { Button, TableRow } from "@material-ui/core";

import { getDate } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

import AppActionDialog from "app/main/components/AppActionDialog";

export default function CommandeRow(props) {
  const { item, onDoubleClick, onClick } = props;

  return (
    <TableRow
      className="h-32"
      style={{
        cursor: "pointer",
        fontSize: 12,
      }}
      onClick={(e) => {
        onClick && onClick(e, item);
      }}
    >
      <Cell
        key="statut"
        content={item.statut}
        style={{ border: "1px solid #9E9E9E60", borderWidth: "1px 0 1px 1px" }}
        contentStyle={{
          textAlign: "center",
          borderRadius: 5,
          fontWeight: "bold",
          padding: "5px 15px",
          textTransform: "uppercase",
          fontSize: 12,
          background: "#ABAEB050",
          color: "#3C1E01",
          label: "Instance",
        }}
      ></Cell>
      <Cell
        key="numero"
        content={item.numero}
        contentStyle={{
          fontSize: 12,
        }}
      ></Cell>
      <Cell
        key="numero_commande"
        content={item.numero_commande}
        contentStyle={{
          fontSize: 12,
        }}
      ></Cell>
      <Cell
        key="label"
        content={item.label}
        contentStyle={{
          fontSize: 12,
        }}
      ></Cell>
      <Cell
        key="date_commande"
        content={getDate(item.date_commande)}
        contentStyle={{
          fontSize: 12,
        }}
      ></Cell>
      <Cell
        key="fournisseur"
        content={item.fournisseur}
        contentStyle={{
          fontSize: 12,
        }}
      ></Cell>
      <Cell
        key="numero_devis"
        content={item.numero_devis}
        contentStyle={{
          fontSize: 12,
        }}
      ></Cell>
      <Cell
        key="modalite_reglement"
        content={item.modalite_reglement}
        contentStyle={{
          fontWeight: "bold",
          fontSize: 12,
          borderRadius: 5,
          padding: "5px 15px",
          textAlign: "center",
          background: "gray",
          color: "white",
          textTransform: "uppercase",
        }}
      ></Cell>
      <Cell
        key="modalite_paiement"
        content={item.modalite_paiement}
        contentStyle={{
          fontWeight: "bold",
          fontSize: 12,
          borderRadius: 5,
          padding: "5px 15px",
          textAlign: "center",
          background: "#403F4C",
          color: "white",
          textTransform: "uppercase",
        }}
      ></Cell>

      <Cell
        key="total_ttc"
        content={new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "DZD",
        }).format(item.total_ttc)}
        contentStyle={{
          fontWeight: "bold",
          fontSize: 14,
          border: "1px solid gray",
          borderRadius: 5,
          padding: "5px 15px",
          textAlign: "right",
        }}
      ></Cell>

      <Cell
        key="total_ttc"
        content={
          <AppActionDialog
            buttonLabel="Supprimer"
            title="Suppression"
            actionOne={(e) => {
              onDoubleClick && onDoubleClick(e, item);
            }}
            actionOneLabel="Supprimer"
            actionTwo={undefined}
            actionTwoLabel=""
            actionThreeLabel="Annuler"
            message={`Voulez-vous supprimer cette commande d'achat ? (même les article liés seront supprimés)`}
            backgroundColor={"red"}
          />
        }
        style={{
          borderWidth: "1px",
        }}
      ></Cell>
    </TableRow>
  );
}
