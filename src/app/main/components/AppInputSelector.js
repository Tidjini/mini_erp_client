import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { Icon, MenuItem, Select } from "@material-ui/core";
import { theme } from "./AppTheme";

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

export default function AppInputSelector(props) {
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
    items,
  } = props;
  const classes = useStyles();

  return (
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
          ...style,
          background: "#C1C1C110",
          borderWidth: 1,
          borderColor: "#b7b7a450",
          borderRadius: 4,
          padding: 5,
          height: height,
          width: width,
          boxShadow: 0,
        }}
      >
        {icon != undefined && (
          <Icon style={{ color: theme.light.text }}>{icon}</Icon>
        )}

        <Select
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
            border: "none",
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              alert("enter press here! ");
            }
          }}
          onChange={handleChange}
          value={value}
        >
          {items &&
            items.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.display}
              </MenuItem>
            ))}
        </Select>
      </div>
    </div>
  );
}
