import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@material-ui/core/CircularProgress";
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

export function AppInputValidator(props) {
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
    displayProgress,
    validation,
    valid,
    onFocus,
    onBlur,
  } = props;
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        alignItems: horizontal ? "center" : "left",
        marginLeft: 10,
        borderRadius: "4px 4px 4px 4px",
      }}
    >
      <div
        className={classes.root}
        style={{
          padding: 5,
          height: height,
          width: width,
          fontWeight: "700",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        className={classes.root}
        style={{
          ...style,
          background: "#C1C1C110",
          borderWidth: "1px",
          borderColor:
            validation === true && valid === true
              ? "#06d6a0"
              : validation === true && valid === false
              ? "#ef476f"
              : "#b7b7a490",
          borderRadius: "4px",
          boxShadow: "1px 3px 3px #9E9E9E20",
          padding: 5,
          height: height,
          width: width,
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
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.stopPropagation();
              const target = event.target;
              const keyboardEvent = new KeyboardEvent("keypress", {
                bubbles: true,
                cancelable: true,
                key: "Tab",
                shiftKey: false,
                keyCode: 9,
              });
              target.dispatchEvent(keyboardEvent);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              event.target.blur();
            }
          }}
          onBlur={(event) => onBlur(event)}
          onFocus={onFocus}
          onChange={handleChange}
          value={value}
        />
        <CircularProgress
          color="success"
          size={16}
          style={{
            opacity: displayProgress ? 1 : 0,
            color: "#f77f00",
            marginRight: 4,
          }}
        />
      </div>
      {validation === true && (
        <div
          style={{
            width: 24,
            height: 24,
            display: "flex",
            background: valid ? "#06d6a0" : "#ef476f",
            justifycontent: "center",
            alignItems: "center",
            borderRadius: 25,
            margin: "0px 5px 0px 5px",
          }}
        >
          <Icon
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {valid === true && "check"}
            {valid === false && "close"}
          </Icon>
        </div>
      )}
    </div>
  );
}
