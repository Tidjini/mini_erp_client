import { Grid } from "@material-ui/core";
import React from "react";
import AppInput from "./AppInput";

export default function AppHeader(props) {
  const { title, subtitle, input, setValue } = props;
  return (
    <Grid
      container
      style={{
        marginTop: 10,
        marginBottom: 10,
        display: "flex",
        position: "relative",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: "#A6B5BC50",
      }}
    >
      <Grid item xs={12} sm={6}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          {title}
        </h1>
        <h1
          style={{
            fontSize: 14,
            fontWeight: "300",
            color: "#A6B5BC",
          }}
        >
          {subtitle}
        </h1>
      </Grid>
      {input && (
        <Grid item xs={12} sm={4} style={{ margin: "auto", marginTop: 10 }}>
          <AppInput
            placeholder={input.placeholder}
            icon={input.icon}
            setValue={setValue}
          />
        </Grid>
      )}
    </Grid>
  );
}
