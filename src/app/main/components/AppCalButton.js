import React from "react";
import { Button, Grid } from "@material-ui/core";

export default function AppCalButton(props) {
  const { label, width, col, onClick } = props;
  return (
    <Grid item md={col} xs={6}>
      <Button
        style={{
          background: "#252836",
          color: "#EA7C69",
          display: "flex",
          alignItems: "center",
          border: "1px solid #EA7C69",
          borderRadius: 8,
          width: width,
          minWidth: 42,
          height: 72,
          marginTop: 10,
          fontSize: 24,
          fontWeight: "bold",
        }}
        onClick={(e) => {
          onClick(label);
        }}
      >
        {label}
      </Button>
    </Grid>
  );
}
