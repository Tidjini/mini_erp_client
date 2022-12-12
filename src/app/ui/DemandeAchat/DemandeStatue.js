import { TableCell, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export default function DemandeStatue(props) {
  const { statue } = props;

  const [state, setState] = useState({
    background: "#ABAEB050",
    color: "#3C1E01",
    label: "Instance",
  });

  useEffect(() => {
    if (statue === 1) {
      setState({
        ...state,
      });
    }
    if (statue === 2) {
      setState({
        ...state,
        background: "#94C9A980",
        color: "#777DA7",
        label: "Email Envoyée",
      });
    }
    if (statue === 3) {
      setState({
        ...state,
        background: "#F5BB0080",
        color: "#8EA604",
        label: "Réponse Reçus",
      });
    }
    if (statue === 4) {
      setState({
        ...state,
        background: "#70A28850",
        color: "#04395E",
        label: "Transformé en devis",
      });
    }
    if (statue === 5) {
      setState({
        ...state,
        background: "#99F7AB",
        color: "#8EA604",
        label: "Demande Confirmée",
      });
    }
    if (statue === 6) {
      setState({
        ...state,
        background: "#BF310080",
        color: "#BF3100",
        label: "Demande Annulée",
      });
    }
  }, [statue]);
  return (
    <TableCell className="truncate" component="th" scope="row" width={50}>
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: 12,
          borderRadius: 5,
          padding: "8px 20px",
          textAlign: "center",
          color: state.color,
          background: state.background,
        }}
      >
        {state.label.toUpperCase()}
      </Typography>
    </TableCell>
  );
}
