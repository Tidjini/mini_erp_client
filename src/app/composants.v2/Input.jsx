import React from "react";
import InputBase from "@material-ui/core/InputBase";
import { Grid, Typography, Hidden } from "@material-ui/core";

export default function Input(props) {
  const {
    label,
    onEnterPressed,
    onTabPressed,
    style,
    xs,
    sm,
    md,
    lg,
    xl,
    smDown,
    mdDown,
    lgDown,
    xlDown,
  } = props;

  return (
    <Hidden smDown={smDown} mdDown={mdDown} lgDown={lgDown} xlDown={xlDown}>
      <Grid
        item
        xs={xs || 12}
        sm={sm || 12}
        md={md || 12}
        lg={lg || 12}
        xl={xl || 12}
        style={{
          ...style,
        }}
      >
        <div>
          {label && (
            <Typography style={{ fontWeight: "bold" }}>{label}</Typography>
          )}
          <InputBase
            {...props}
            key={props.name}
            id={props.name}
            style={{
              color: "#2b2d42",
              fontSize: 14,
              width: "100%",
              flex: 1,
              background: "#c1c1c1c10",
              borderWidth: "1px",
              borderColor: "#b7b7a490",
              borderRadius: "4px",
              boxShadow: "1px 3px 3px #9E9E9E20",
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: 5,
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
              const { type } = props;
              type === "number" && event.target.select();
            }}
            autoFocus={style && style.autoFocus}
            inputProps={{ maxLength: style && style.maxLength }}
            pattern={
              style && style.onlyDigit && style.onlyDigit === true && "[0-9]*"
            }
            autoComplete="off"
            multiline={style && style.multiline}
            rows={style && style.rows}
          />
        </div>
      </Grid>
    </Hidden>
  );
}
