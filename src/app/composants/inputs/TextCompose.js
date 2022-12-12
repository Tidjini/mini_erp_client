import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { getCustomValue } from "app/helpers/utils";

export default function TextCompose(props) {
  const { label, value, valueStyle, labelStyle, style, grid, type } = props;
  return (
    <Grid
      item
      xs={grid && grid.xs && grid.xs}
      sm={grid && grid.sm && grid.sm}
      md={grid && grid.md && grid.md}
      lg={grid && grid.lg && grid.lg}
      xl={grid && grid.xl && grid.xl}
      style={style}
    >
      <Typography style={labelStyle}>{label}</Typography>
      <Typography style={valueStyle}>{getCustomValue(type, value)}</Typography>
    </Grid>
  );
}
