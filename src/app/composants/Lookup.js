import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { Typography } from "@material-ui/core";

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 4,
    position: "relative",
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: 10,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial"].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export default function Lookup(props) {
  const { name, label, value, options, handleChange, style, emptyValue } =
    props;

  return (
    <FormControl
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        ...style,
      }}
    >
      <Typography
        style={{
          fontWeight: 700,
          textTransform: "uppercase",
          fontSize: 12,
          height: 20,
        }}
      >
        {label}
      </Typography>
      {/* <InputLabel htmlFor={name}>{label}</InputLabel> */}

      <NativeSelect
        id={name}
        name={name}
        value={value || ""}
        onChange={handleChange}
        input={<BootstrapInput />}
        style={{ width: "100%" }}
      >
        {emptyValue && (
          <option key={-1} value={""}>
            {emptyValue}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.display}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
