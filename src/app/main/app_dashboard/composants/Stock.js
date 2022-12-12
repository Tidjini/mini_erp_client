import React from "react";
import { Card, Typography } from "@material-ui/core";
// import { useSelector } from "react-redux";

export default function Stock(props) {
  const { styles, stock } = props;

  return (
    <Card
      style={{
        width: "100%",
        minHeight: 170,
        backgroundColor: "#ffb703AA",
        color: "#001d3d",
        padding: 20,
        borderRadius: 15,
        cursor: "pointer",

        ...styles,
      }}
    >
      <Typography style={{ fontSize: 18, fontWeight: "600", marginBottom: 15 }}>
        {stock.produit}
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifycontent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Réalisations:</Typography>
        <Typography style={{ fontSize: 18, fontWeight: "700" }}>
          {stock.realisation}
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
        <Typography>Casse Int:</Typography>
        <Typography style={{ fontSize: 18, fontWeight: "700" }}>
          {stock.casse_int}
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
        <Typography>Casse Ext:</Typography>
        <Typography style={{ fontSize: 18, fontWeight: "700" }}>
          {stock.casse_ext}
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
        <Typography>Expédition:</Typography>
        <Typography style={{ fontSize: 18, fontWeight: "700" }}>
          {stock.expedition}
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
        <Typography>Stock:</Typography>
        <Typography style={{ fontSize: 18, fontWeight: "700" }}>
          {stock.stock}
        </Typography>
      </div>
    </Card>
  );
}
