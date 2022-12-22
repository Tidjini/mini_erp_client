import { Grid, Hidden } from "@material-ui/core";
import React from "react";

export default function InputFile(props) {
  const { style } = props;

  const { xs, sm, md, lg, xl, smDown, mdDown, lgDown, xlDown } = style || {};

  return (
    <Hidden smDown={smDown} mdDown={mdDown} lgDown={lgDown} xlDown={xlDown}>
      <Grid
        item
        container
        display="flex"
        style={{
          background: "#edede9",
          width: 100,
          height: 100,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        + File
      </Grid>
    </Hidden>
  );
}
