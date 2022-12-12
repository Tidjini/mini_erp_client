import React from "react";
import { Card, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function DevisAchat(props) {
  const { styles } = props;
  const devis = useSelector(({ app_dashboard }) => app_dashboard.devis);

  return (
    <Card
      style={{
        width: "100%",
        minHeight: 200,
        backgroundColor: "#ffc300AA",
        color: "#3d405b",
        borderRadius: 15,
        padding: 20,
        cursor: "pointer",
        ...styles,
      }}
    >
      <Typography style={{ fontSize: 24, fontWeight: "600", marginBottom: 15 }}>
        DEVIS
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
        <Typography style={{ fontSize: 16, fontWeight: "600" }}>
          {devis.total}
        </Typography>
      </div>

      {devis.min && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifycontent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography style={{ color: "#006d77" }}>Min:</Typography>
          <Typography
            style={{ fontSize: 16, fontWeight: "600", color: "#006d77" }}
          >
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "DZD",
            }).format(devis.min)}
          </Typography>
        </div>
      )}
      {devis.max && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifycontent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography style={{ color: "#e63946" }}>Max:</Typography>
          <Typography
            style={{ fontSize: 16, fontWeight: "600", color: "#e63946" }}
          >
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "DZD",
            }).format(devis.max)}
          </Typography>
        </div>
      )}
    </Card>
  );
}
