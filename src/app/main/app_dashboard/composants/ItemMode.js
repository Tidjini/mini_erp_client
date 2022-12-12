import React from "react";
import { Card, Typography } from "@material-ui/core";

export default function ItemMode(props) {
  const { styles, mode } = props;
  const [reglement, setReglemenbt] = React.useState({
    title: "",
    total: 0.0,
  });
  const [modes, setModes] = React.useState([]);

  React.useEffect(() => {
    let keys = Object.keys(mode);
    setReglemenbt({ title: keys[0], total: mode[keys[0]]["total"] });

    let interKeys = Object.keys(mode[keys[0]]);
    const modes = [];
    for (let i = 1; i < interKeys.length; i++) {
      modes.push({ title: interKeys[i], total: mode[keys[0]][interKeys[i]] });
    }
    setModes(modes);
  }, [mode]);
  return (
    <Card
      style={{
        width: "100%",
        minHeight: 200,
        backgroundColor: "#e56b6f10",
        color: "#2f3e46",
        borderRadius: 15,
        padding: 20,
        cursor: "pointer",
        ...styles,
      }}
    >
      <Typography style={{ fontSize: 24, fontWeight: "600", marginBottom: 15 }}>
        {reglement.title}
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifycontent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Total:</Typography>
        <Typography style={{ fontSize: 16, fontWeight: "700" }}>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "DZD",
          }).format(reglement.total)}
        </Typography>
      </div>
      {modes.map((item) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifycontent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{item.title}</Typography>
          <Typography style={{ fontSize: 16, fontWeight: "700" }}>
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "DZD",
            }).format(item.total)}
          </Typography>
        </div>
      ))}
    </Card>
  );
}
