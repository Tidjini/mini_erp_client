import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { Icon } from "@material-ui/core";

import { theme } from "app/composants/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function AppInput(props) {
  const {
    label,
    placeholder,
    icon,
    width,
    height,
    style,
    handleChange,
    value,
    type,
    format,
    name,
    horizontal,
    onEnter,
    onTab,
    maxLength,
    onlyDigit,
  } = props;
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        alignItems: horizontal ? "center" : "left",
        borderRadius: "4px 4px 4px 4px",
        width: width,
        ...style,
      }}
    >
      {label && (
        <div
          className={classes.root}
          style={{
            padding: 5,
            height: height,
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
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
          height: height,
          width: "100%",
        }}
      >
        {icon !== undefined && (
          <Icon style={{ color: theme.light.text }}>{icon}</Icon>
        )}
        <InputBase
          className={classes.input}
          name={name}
          id={name}
          placeholder={placeholder}
          type={type === undefined ? "text" : type}
          format={format === undefined ? "" : format}
          style={{
            color: theme.light.text,
            fontSize: 14,
            width: "100%",
            marginLeft: 4,
          }}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              if (onTab) onTab(event);
            }
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (onEnter) onEnter(event);
            }
          }}
          onBlur={(event) => {}}
          onFocus={(event) => {
            event.target.select();
          }}
          onChange={(e) => {
            handleChange(e);
          }}
          value={value}
          autoFocus
          inputProps={{ maxLength: maxLength }}
          pattern={onlyDigit === true && "[0-9]*"}
        />
      </div>
    </div>
  );
}
