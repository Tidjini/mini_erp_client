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

export function AppInputSearch(props) {
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
    setOpenSearch,
    displayProgress,
    validation,
    displayValidation,
    valid,
    onFocus,
    onBlur,
    onEnter,
    onTab,
    refInput,
    maxLength,
  } = props;
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        alignItems: horizontal ? "center" : "left",
        // marginLeft: 10,
        // marginTop: 5,
        borderRadius: "4px 4px 4px 4px",
        boxShadow: "1px 3px 3px #9E9E9E20",
      }}
    >
      <div
        className={classes.root}
        style={{
          ...style,
          background: "#C1C1C110",
          borderWidth: 1,
          borderColor:
            validation === true && valid === true
              ? "#06d6a0"
              : validation === true && valid === false
              ? "#ef476f"
              : "#b7b7a490",
          borderRadius: "4px 0 0 4px",
          padding: 5,
          height: height,

          fontWeight: "700",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        className={classes.root}
        style={{
          background: "#C1C1C110",
          borderWidth: "1px 1px 1px 0px",
          borderColor:
            validation === true && valid === true
              ? "#06d6a0"
              : validation === true && valid === false
              ? "#ef476f"
              : "#b7b7a490",
          borderRadius: "0px 4px 4px 0px",
          padding: 5,
          height: height,
          width: width,
          boxShadow: 0,
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
            if (event.key === "Enter") {
              onEnter(event);
            }
            if (event.key === "Tab") {
              onTab(event);
            }
          }}
          onBlur={onBlur}
          onFocus={(event) => {
            event.target.select();
            onFocus(event);
          }}
          onChange={handleChange}
          value={value}
          autoFocus
          autoComplete="off"
          inputRef={refInput}
          inputProps={{ maxLength: maxLength }}
        />
        <CircularProgress
          size={16}
          style={{
            opacity: displayProgress ? 1 : 0,
            color: "#f77f00",
            marginRight: 4,
          }}
        />
        <Icon
          style={{
            color: "#264653",
            fontSize: 16,
            marginRight: 4,
          }}
          onClick={(event) => {
            if (setOpenSearch !== undefined) {
              setOpenSearch(true);
            }
          }}
        >
          search
        </Icon>
      </div>
      {displayValidation && validation === true && (
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
