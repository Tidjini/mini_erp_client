import {
  Icon,
  IconButton,
  makeStyles,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@material-ui/core";
import { green, amber, blue } from "@material-ui/core/colors";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 50,
  },
  success: {
    backgroundColor: green[600],
    color: "#FFFFFF",
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.getContrastText(theme.palette.error.dark),
  },
  info: {
    backgroundColor: blue[600],
    color: "#FFFFFF",
  },
  warning: {
    backgroundColor: amber[600],
    color: "#FFFFFF",
  },
}));

const variantIcon = {
  success: "check_circle",
  warning: "warning",
  error: "error_outline",
  info: "info",
};
export default function TestNotif({ open, setOpen }) {
  const options = {
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    autoHideDuration: 6000,
    message: "Test notification pour firebase, coool?",
    variant: null,
  };

  const classes = useStyles();
  return (
    <Snackbar
      {...options}
      open={open}
      onClose={() => setOpen(false)}
      classes={{
        root: classes.root,
      }}
      ContentProps={{
        variant: "body2",
        headlineMapping: {
          body1: "div",
          body2: "div",
        },
      }}
    >
      <SnackbarContent
        className={clsx(classes[options.variant])}
        message={
          <div className="flex items-center">
            {variantIcon[options.variant] && (
              <Icon className="mr-8" color="inherit">
                {variantIcon[options.variant]}
              </Icon>
            )}
            {options.message}
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <Icon>close</Icon>
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}
