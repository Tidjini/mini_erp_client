import React from "react";
import InputBase from "./InputBase";
import { Grid, Typography } from "@material-ui/core";

import FormControl from "@material-ui/core/FormControl";
import { useInputSize } from "app/main/hooks";

export default function Input(props) {
  const {
    label,
    placeholder,
    style,
    type,
    format,
    handleChange,
    value,
    name,
    onEnterPressed,
    onTabPressed,
    grid,
    inputStyle,
    onBlur,
    autoComplete,
    autoFocus,
    maxLength,
    pattern,
    multiline,
    rows,
  } = props;

  const size = useInputSize(style);

  return (
    <Grid
      item
      xs={grid && grid.xs && grid.xs}
      sm={grid && grid.sm && grid.sm}
      md={grid && grid.md && grid.md}
      lg={grid && grid.lg && grid.lg}
      xl={grid && grid.xl && grid.xl}
      style={{
        padding: 5,
        ...style,
        height: size[1],
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

        <InputBase
          placeholder={placeholder}
          style={inputStyle}
          type={type}
          format={format}
          handleChange={handleChange}
          value={value}
          name={name}
          onEnterPressed={onEnterPressed}
          onTabPressed={onTabPressed}
          inputProps={{ maxLength: maxLength }}
          pattern={pattern}
          autoComplete={autoComplete}
          multiline={multiline}
          rows={rows}
        />
      </FormControl>
    </Grid>
  );
}
