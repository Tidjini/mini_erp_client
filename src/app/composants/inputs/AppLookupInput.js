import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Icon, Typography } from "@material-ui/core";

import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";
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

//in style placeholder, icon, width, height, type, format, direction (row, column)
export default function AppLookupInput(props) {
  const {
    context,
    label,
    style,
    handleChange,
    value,
    name,
    setOpenDialog,
    setSelected,
    selected,
    onLeave,
    initial,
  } = props;
  const classes = useStyles();

  const [displayValidation, setDisplayValidation] = React.useState(false);
  const [displayProgress, setDisplayProgress] = React.useState(false);
  const [valid, setValid] = React.useState(false);

  async function onEnter(event) {
    setDisplayProgress(true);
    setDisplayValidation(false);

    //processing
    const value = event.target.value;
    const link = buildGetItemLink(value);
    if (link === undefined) return;
    const response = await axios.get(link);
    //processing

    setDisplayProgress(false);
    setDisplayValidation(true);

    if (response.data) {
      setSelected({ ...response.data });
      setValid(true);
      if (onLeave) onLeave({ ...response.data });
    } else {
      setValid(false);
      setOpenDialog(true);
      setSelected(initial);
    }
  }

  function onBlur(event) {}
  function onFocus(event) {}

  function buildGetItemLink(value) {
    const path = `get/?collection=${name}&attribute=${context.primary}&value=${value}`;
    return DATA_SERVICE_URL + path;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: style.direction ? "row" : "column",
        alignItems: style.direction ? "center" : "left",
      }}
    >
      {label && (
        <Typography
          className={classes.root}
          style={{
            background: "#C1C1C110",
            borderWidth: 1,
            borderColor:
              displayValidation === true && valid === true
                ? "#06d6a0"
                : displayValidation === true && valid === false
                ? "#ef476f"
                : "#b7b7a490",
            borderRadius: "4px 0 0 4px",
            padding: 5,
            height: style.height,

            fontWeight: "700",
            textTransform: "uppercase",
            ...style,
          }}
        >
          {label}
        </Typography>
      )}

      <div
        className={classes.root}
        style={{
          background: "#C1C1C110",
          borderWidth: "1px 1px 1px 1px",
          borderColor:
            displayValidation === true && valid === true
              ? "#06d6a0"
              : displayValidation === true && valid === false
              ? "#ef476f"
              : "#b7b7a490",
          borderRadius: "0px 4px 4px 0px",
          padding: 5,
          height: style.height,
          width: style.width,
          boxShadow: 0,
        }}
      >
        {style.icon !== undefined && (
          <Icon style={{ color: theme.light.text }}>{style.icon}</Icon>
        )}
        <InputBase
          className={classes.input}
          name={name}
          id={name}
          placeholder={style.placeholder}
          type={style.type === undefined ? "text" : style.type}
          format={style.format === undefined ? "" : style.format}
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
          inputProps={{ maxLength: style.maxLength }}
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
            setOpenDialog(true);
          }}
        >
          search
        </Icon>
      </div>
    </div>
  );
}
