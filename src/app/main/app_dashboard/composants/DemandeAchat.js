import React from "react";
import { Card, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function DemandeAchat(props) {
  const { styles } = props;
  const demande = useSelector(({ app_dashboard }) => app_dashboard.demande);

  return (
    <Card
      style={{
        width: "100%",
        minHeight: 200,
        backgroundColor: "#02c39a",
        color: "#ffffff",
        padding: 20,
        borderRadius: 15,
        cursor: "pointer",

        ...styles,
      }}
    >
      <Typography style={{ fontSize: 24, fontWeight: "600", marginBottom: 15 }}>
        DEMANDES
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
        <Typography style={{ fontSize: 18, fontWeight: "700" }}>
          {demande.total}
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
        <Typography style={{ color: "#006d77" }}>Confirmés:</Typography>
        <Typography
          style={{ fontSize: 18, fontWeight: "700", color: "#006d77" }}
        >
          {demande.confirmes}
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
        <Typography style={{ color: "#db3a34" }}>Annulés:</Typography>
        <Typography
          style={{ fontSize: 18, fontWeight: "700", color: "#db3a34" }}
        >
          {demande.annules}
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
        <Typography>Instances:</Typography>
        <Typography style={{ fontSize: 18, fontWeight: "700" }}>
          {demande.instances}
        </Typography>
      </div>
    </Card>
  );
}
