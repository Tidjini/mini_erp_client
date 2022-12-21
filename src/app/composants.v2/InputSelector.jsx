import React from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";

const BootstrapInput = withStyles((theme) => ({
  root: {
    width: "100%",
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: "12px 26px 12px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export default function InputSelector(props) {
  const {
    name,
    label,
    value,
    options,
    onChange,
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
        {label && (
          <Typography style={{ fontWeight: "bold" }}>{label}</Typography>
        )}

        <NativeSelect
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          input={<BootstrapInput />}
        >
          {/*todo later <option aria-label="None" value="" /> */}
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.display}
              </option>
            ))}
        </NativeSelect>
      </Grid>
    </Hidden>
  );
}
