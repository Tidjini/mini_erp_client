import React from "react";

import {
  Icon,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";

export default function Generic({ open, setOpen, data, onClick, children }) {
  const options = {
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    autoHideDuration: 5000,
    message: "Test notification pour firebase, coool?",
    variant: null,
  };

  return (
    <Snackbar {...options} style={{ marginTop: 68 }} open={open}>
      <Paper
        style={{
          backgroundColor: "#edede9",
          padding: 0,

          width: 400,
          borderRadius: 4,
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "black",
            padding: "10px 20px",
            backgroundColor: "#e9ecef",
            borderRadius: "4px 4px 0 0",
          }}
        >
          <Typography style={{ fontSize: 14, fontWeight: "600" }}>
            {data.title}
          </Typography>
          <IconButton
            key="close"
            aria-label="Close"
            onClick={(event) => {
              setOpen(false);
              event.stopPropagation();
            }}
            style={{
              width: 16,
              height: 16,
              color: "#4a4e69",
            }}
          >
            <Icon>close</Icon>
          </IconButton>
        </div>
        <div
          style={{
            width: "100%",
            color: "black",
            padding: "15px 20px",
            backgroundColor: "#edf2f4",
            borderRadius: "0 0 4px 4px",
          }}
        >
          <Typography style={{ fontSize: 12, fontWeight: "300" }}>
            {data.message}
          </Typography>
          {children}
        </div>
      </Paper>
    </Snackbar>
  );
}
