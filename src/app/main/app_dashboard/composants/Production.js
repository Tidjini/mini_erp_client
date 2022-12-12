import React from "react";
import { Card, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function Production(props) {
  const { styles } = props;
  const production = useSelector(
    ({ app_dashboard }) => app_dashboard.production.general
  );

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
        Production
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifycontent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Empilage:</Typography>
        <Typography style={{ fontSize: 18, fontWeight: "700" }}>
          {production.empilements}
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
        <Typography>ENF/DÉF:</Typography>
        <Typography style={{ fontSize: 18, fontWeight: "700" }}>
          {production.enfournements} / {production.defournements}
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
        <Typography style={{ color: "#006d77" }}>Emballages:</Typography>
        <Typography
          style={{ fontSize: 18, fontWeight: "700", color: "#006d77" }}
        >
          {production.emballages}
        </Typography>
      </div>
    </Card>
  );
}
