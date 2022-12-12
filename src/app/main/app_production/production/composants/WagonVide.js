import React from "react";

import { Typography } from "@material-ui/core";

export default function WagonVide(props) {
  return (
    <div
      style={{
        padding: "4px 8px",
      }}
    >
      <div
        style={{
          width: 62,
          height: 42,
          borderRadius: 5,
          border: "1px dashed #a5a58d90",
          borderWidth: "1px 4px",
          borderColor: "#a5a58d90",
          position: "relative",
          display: "flex",
          justifycontent: "space-between",
        }}
      >
        <Typography
          style={{
            fontSize: 9,
            fontWeight: "700",
            padding: "2px 5px",
            color: "#a5a58d",
            display: "flex",
            alignSelf: "start",
            borderRadius: 3,
          }}
        >
          VIDE
        </Typography>
        <div
          style={{
            position: "absolute",
            top: -1,
            left: 0,
            width: 56,
            height: 42,
            backgroundColor: "#a5a58d20",
            borderStyle: "solid",
            borderRightWidth: 56,
            borderTopWidth: 40,
            borderRightColor: "transparent",
            borderTopColor: "#02304710",
          }}
        ></div>
      </div>
    </div>
  );
}
