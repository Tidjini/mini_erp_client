import React from "react";
import { Grid } from "@material-ui/core";

export default function Container(props) {
  const { xs, sm, md, lg, xl, style, children } = props;
  return (
    <Grid
      container
      item
      alignContent="flex-start"
      spacing={2}
      style={{ ...style }}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
    >
      {children}
    </Grid>
  );
}
