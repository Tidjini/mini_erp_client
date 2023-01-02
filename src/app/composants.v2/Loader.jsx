import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export default function Loader({ isLoading }) {
  return (
    <div
      style={{
        backgroundColor: "#26465350",
        position: "absolute",
        width: "100%",
        height: "100%",
        display: isLoading ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5,
      }}
    >
      <Typography className="text-18 mb-16" color="textSecondary">
        Loading...
      </Typography>
      {/* <LinearProgress className="w-xs" color="secondary" /> */}
      <CircularProgress color="inherit" size={36} />
    </div>
  );
}
