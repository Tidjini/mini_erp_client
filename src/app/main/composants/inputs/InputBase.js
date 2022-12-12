import React from "react";
import { InputBase as Base } from "@material-ui/core";

export default function InputBase(props) {
  const {
    placeholder,
    style,
    type,
    format,
    handleChange,
    value,
    name,
    onEnterPressed,
    onTabPressed,
    onBlur,
    autoComplete,
    autoFocus,
    maxLength,
    pattern,
    multiline,
    rows,
  } = props;

  return (
    <Base
      key={name}
      name={name}
      id={name}
      placeholder={placeholder}
      type={type === undefined ? "text" : type}
      format={format === undefined ? "" : format}
      style={{
        background: "#c1c1c1c10",
        borderWidth: "1px",
        borderColor: "#b7b7a490",
        borderRadius: "4px",
        boxShadow: "1px 3px 3px #9E9E9E20",
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: 5,
        color: "#2b2d42",
        fontSize: 14,
        flex: 1,
        ...style,
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
      onBlur={(event) => {
        //when we leave
        if (onBlur) onBlur(event);
      }}
      onFocus={(event) => {
        //select all if is number
        type === "number" && event.target.select();
      }}
      onChange={(e) => {
        handleChange(e);
      }}
      value={value}
      autoFocus={autoFocus}
      inputProps={{ maxLength: maxLength }}
      pattern={pattern}
      autoComplete={autoComplete}
      multiline={multiline}
      rows={rows}
    />
  );
}
