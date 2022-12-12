import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import {
  Button,
  Grid,
  Icon,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import { theme } from "./AppTheme";
import { Close } from "@material-ui/icons";

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

const data = [
  { opt: 1, label: "Some data 1 mmd mmdd mm" },
  { opt: 2, label: "Some data 2" },
  { opt: 3, label: "Some data 3" },
];
export default function AppInputSearch(props) {
  const {
    label,
    placeholder,
    icon,
    height,
    width,
    style,
    handleChange,
    handleClear,
    handleSelection,
    value,
    options,
    displayProgress,
    displayAtt,
  } = props;

  const classes = useStyles();

  const [displayList, setDisplayList] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showClear, setShowClear] = useState(false);

  const [searchMessage, setSearchMessage] = useState("Items not exit");

  const onBlur = (e) => {
    setTimeout(function () {
      setDisplayList(false);
    }, 400);
  };
  const onChange = (e) => {
    const { value } = e.target;
    setShowProgress(true);
    setShowClear(false);
    setSearchMessage("En cours de recherche");
    setTimeout(function () {
      setDisplayList(true);
      setShowProgress(false);
      setSearchMessage("Items not exit");
      setShowClear(true);
    }, 1000);
    handleChange(e);
    if (value === "") setShowClear(false);
  };

  const onClear = (e) => {
    handleClear(e);
    setShowClear(false);
  };
  function onSelectItem(item) {
    handleSelection(item);
    setDisplayList(false);
  }

  return (
    <div
      style={{
        ...style,
        position: "relative",
      }}
    >
      <div>
        {label && (
          <h6
            style={{
              color: theme.light.text,
              fontSize: 13,
              fontWeight: "600",
              marginBottom: 4,
              marginLeft: 4,
              verticalAlign: "center",
            }}
          >
            {label}
          </h6>
        )}

        <div
          className={classes.root}
          style={{
            background: "#C1C1C110",
            borderWidth: 1,
            borderColor: "#b7b7a450",
            borderRadius: 4,
            padding: 5,
            height: height,
            maxHeight: 40,
            boxShadow: 0,
            width: width,
          }}
        >
          {icon != undefined && (
            <Icon style={{ color: theme.light.text }}>{icon}</Icon>
          )}

          <InputBase
            type="text"
            style={{
              width: "100%",
              color: theme.light.text,
              fontSize: 13,
              fontWeight: "600",
              marginLeft: 4,
              verticalAlign: "center",
            }}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
          />

          {showProgress && (
            <CircularProgress
              color="secondary"
              style={{
                width: height - 24,
                height: height - 24,
                marginLeft: 8,
                marginRight: 8,
              }}
            />
          )}
          {showClear && (
            <IconButton
              aria-label="fingerprint"
              color="secondary"
              onClick={onClear}
            >
              <Close
                style={{
                  width: height - 24,
                  height: height - 24,
                }}
              />
            </IconButton>
          )}
        </div>
      </div>

      <div
        className={classes.root}
        style={{
          ...style,
          background: "#F1F1F1",
          borderWidth: 1,
          borderColor: "#b7b7a450",
          borderRadius: 4,
          padding: 5,
          minHeight: 56,
          boxShadow: 0,
          width: "100%",
          zIndex: 5,
          display: displayList === true ? "block" : "none",
          position: "absolute",
        }}
      >
        {options.length <= 0 && (
          <h1
            style={{
              color: theme.light.text,
              fontSize: 12,
              fontWeight: "400",
              marginLeft: 4,
              verticalAlign: "center",
              marginTop: 5,
              marginBottom: 5,
              cursor: "pointer",
            }}
          >
            {searchMessage}
          </h1>
        )}
        {options
          .filter((item) =>
            item.label.toLowerCase().includes(value.toLowerCase())
          )
          .map((item, id) => (
            <MenuItem
              key={id}
              style={{
                color: theme.light.text,
                fontSize: 12,
                fontWeight: "400",
                marginLeft: 4,
                verticalAlign: "center",
                marginTop: 5,
                marginBottom: 5,
                cursor: "pointer",
              }}
              onClick={() => {
                onSelectItem(item);
              }}
            >
              {item.label}
            </MenuItem>
          ))}
      </div>
    </div>
  );
}
