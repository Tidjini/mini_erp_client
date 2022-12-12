import React from "react";
import { Card, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function Arrets(props) {
  const { styles } = props;
  const production = useSelector(
    ({ app_dashboard }) => app_dashboard.production.general
  );

  return (
    <Card
      style={{
        width: "100%",
        minHeight: 170,
        backgroundColor: "#f77f0088",
        color: "#001d3d",
        padding: 20,
        borderRadius: 15,
        cursor: "pointer",

        ...styles,
      }}
    >
      <Typography style={{ fontSize: 18, fontWeight: "600", marginBottom: 15 }}>
        Arrets
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifycontent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Production:</Typography>
        <Typography style={{ fontSize: 18, fontWeight: "700" }}>
          {production.production_arrets}
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
        <Typography>Emballages:</Typography>
        <Typography style={{ fontSize: 18, fontWeight: "700" }}>
          {production.emballage_arrets}
        </Typography>
      </div>
    </Card>
  );
}
