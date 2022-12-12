import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export default function CommandeStatut(props) {
  const { value, onClick } = props;

  const [state, setState] = useState({
    background: "#ABAEB050",
    color: "#3C1E01",
    label: "Instance",
  });

  useEffect(() => {
    switch (value) {
      case "Receptionne":
        setState({
          ...state,
          background: "#99F7AB",
          color: "#8EA604",
          label: "Receptioné",
        });
        break;
      case "Problem_Reception":
        setState({
          ...state,
          background: "#BF310080",
          color: "#BF3100",
          label: "Problem",
        });
        break;
      case "Instance":
      default:
        setState({
          ...state,
        });
        break;
    }
  }, [value]);
  return (
    <Typography
      style={{
        textAlign: "center",
        borderRadius: 5,
        background: state.background,
        color: state.color,
        fontWeight: "bold",
        padding: "5px 15px",
        textTransform: "uppercase",
        fontSize: 12,
      }}
      onClick={onClick}
    >
      {state.label}
    </Typography>
  );
}
