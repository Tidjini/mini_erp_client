import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { Grid, Icon, Typography } from "@material-ui/core";

import FormControl from "@material-ui/core/FormControl";
import { useInputSize } from "app/main/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function DateTimeInput(props) {
  const { label, placeholder, style, handleChange, value, name, grid } = props;

  const size = useInputSize(style);

  const classes = useStyles();

  return (
    <Grid
      item
      xs={grid && grid.xs && grid.xs}
      sm={grid && grid.sm && grid.sm}
      md={grid && grid.md && grid.md}
      lg={grid && grid.lg && grid.lg}
      xl={grid && grid.xl && grid.xl}
      style={{
        borderRadius: "4px 4px 4px 4px",
        padding: 5,
        ...style,
        height: size[1],
      }}
    >
      <FormControl
        style={{
          display: "flex",
          flexDirection: style && style.horizontal ? "row" : "column",
          alignItems:
            style && style.horizontal && !style.multiline ? "center" : "start",
        }}
      >
        {label && (
          <Typography
            style={{
              fontWeight: "700",
              textTransform: "uppercase",
              marginRight: 5,
            }}
          >
            {label}
          </Typography>
        )}
        <div
          className={classes.root}
          style={{
            background: "#C1C1C110",
            borderWidth: "1px",
            borderColor: "#b7b7a490",
            borderRadius: "4px",
            boxShadow: "1px 3px 3px #9E9E9E20",
            padding: 5,
            height: style.height,
            width: "100%",
          }}
        >
          {style.icon !== undefined && (
            <Icon style={{ color: "#2b2d42" }}>{style.icon}</Icon>
          )}
          <InputBase
            className={classes.input}
            name={name}
            id={name}
            placeholder={placeholder}
            type={"date"}
            format="DD/MM/YYYY"
            style={{
              color: "#2b2d42",
              fontSize: 14,
              width: "65%",
              marginLeft: 4,
            }}
            onChange={(e) => {
              handleChange(e);
            }}
            value={value && value.substring(0, 10)}
            autoComplete="off"
          />
          <InputBase
            className={classes.input}
            name={name}
            id={name}
            type="time"
            format="HH:MM"
            style={{
              color: "#2b2d42",
              fontSize: 11,
              width: "35%",
              marginLeft: 4,
            }}
            onChange={(e) => {
              handleChange(e);
            }}
            value={value && value.substring(11, 16)}
            autoComplete="off"
          />
        </div>
      </FormControl>
    </Grid>
  );
}
