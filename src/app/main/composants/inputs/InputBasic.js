import React from "react";
import InputBase from "@material-ui/core/InputBase";
import { Icon } from "@material-ui/core";

export default function InputBasic(props) {
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
  } = props;

  return (
    <div
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
        ...style,
      }}
    >
      {style.icon && <Icon style={{ color: "#2b2d42" }}>{style.icon}</Icon>}
      <InputBase
        key={name}
        name={name}
        id={name}
        placeholder={placeholder}
        type={type === undefined ? "text" : type}
        format={format === undefined ? "" : format}
        style={{
          color: "#2b2d42",
          fontSize: 14,
          width: "100%",
          flex: 1,
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
        value={value || ""}
        autoFocus={style.autoFocus}
        inputProps={{ maxLength: style.maxLength }}
        pattern={style.onlyDigit && style.onlyDigit === true && "[0-9]*"}
        autoComplete="off"
        multiline={style.multiline}
        rows={style.rows}
      />
    </div>
  );
}
