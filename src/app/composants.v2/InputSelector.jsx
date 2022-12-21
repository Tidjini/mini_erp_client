import React from "react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const BootstrapInput = withStyles((theme) => ({
  root: {
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
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
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
    handleChange,
    horizontal,
    width,
    height,
    style,
  } = props;

  return (
    <FormControl
      //   className={classes.margin}
      style={{
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        alignItems: horizontal ? "center" : "left",
        borderRadius: "4px 4px 4px 4px",
        width: width,
        marginRight: "10px",
        height: height,
        margin: "5px 0",

        ...style,
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
      {/* <InputLabel htmlFor={name}>{label}</InputLabel> */}

      <NativeSelect
        id={name}
        name={name}
        value={value || ""}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        {/*todo later <option aria-label="None" value="" /> */}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.display}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
