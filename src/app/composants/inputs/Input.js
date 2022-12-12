import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { Grid, Icon, Typography } from "@material-ui/core";

import FormControl from "@material-ui/core/FormControl";

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

export default function Input(props) {
  const {
    label,
    placeholder,
    style,
    type,
    handleChange,
    value,
    name,
    onEnterPressed,
    onTabPressed,
    grid,
  } = props;
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
        height: style.horizontal ? style.height : Number(style.height) + 25,
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
            type={type === undefined ? "text" : type}
            format={style.format === undefined ? "" : style.format}
            style={{
              color: "#2b2d42",
              fontSize: 14,
              width: "100%",
              marginLeft: 4,
            }}
            onKeyDown={(event) => {
              if (event.key === "Tab") {
                if (onTabPressed) onTabPressed(event);
              }
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                if (onEnterPressed) onEnterPressed(event);
                else event.preventDefault();
              }
            }}
            onBlur={(event) => {}}
            onFocus={(event) => {
              type === "number" && event.target.select();
            }}
            onChange={(e) => {
              handleChange(e);
            }}
            value={value}
            autoFocus={style.autoFocus}
            inputProps={{ maxLength: style.maxLength }}
            pattern={style.onlyDigit === true && "[0-9]*"}
            autoComplete="off"
            multiline={style.multiline}
            rows={style.rows}
          />
        </div>
      </FormControl>
    </Grid>
  );
}
