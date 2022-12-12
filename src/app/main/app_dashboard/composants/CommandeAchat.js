import React from "react";
import { Card, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function CommandeAchat(props) {
  const { styles } = props;
  const commande = useSelector(
    ({ app_dashboard }) => app_dashboard.commande.general
  );

  return (
    <Card
      style={{
        width: "100%",
        minHeight: 200,
        backgroundColor: "#e63946",
        color: "#f1faee",
        borderRadius: 15,
        padding: 20,
        cursor: "pointer",
        ...styles,
      }}
    >
      <Typography style={{ fontSize: 24, fontWeight: "600", marginBottom: 15 }}>
        ACHATS
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifycontent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Aujourd'hui:</Typography>
        <Typography style={{ fontSize: 16, fontWeight: "700" }}>
          {commande.total}
        </Typography>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifycontent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Montant TTC:</Typography>
        <Typography style={{ fontSize: 18, fontWeight: "700" }}>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "DZD",
          }).format(commande.total_ttc)}
        </Typography>
      </div>

      {commande.min && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifycontent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Min:</Typography>
          <Typography style={{ fontSize: 16, fontWeight: "600" }}>
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "DZD",
            }).format(commande.min)}
          </Typography>
        </div>
      )}
      {commande.max && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifycontent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Max:</Typography>
          <Typography style={{ fontSize: 16, fontWeight: "600" }}>
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "DZD",
            }).format(commande.max)}
          </Typography>
        </div>
      )}
    </Card>
  );
}
