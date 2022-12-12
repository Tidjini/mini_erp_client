import { TableCell, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export default function DevisStatue(props) {
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
        label: "En Négociation",
      });
    }
    if (statue === 3) {
      setState({
        ...state,
        background: "#99F7AB",
        color: "#8EA604",
        label: "Devis Confirmé",
      });
    }
    if (statue === 4) {
      setState({
        ...state,
        background: "#BF310080",
        color: "#BF3100",
        label: "Devis Annulé",
      });
    }
  }, [statue]);
  return (
    <TableCell className="truncate" component="th" scope="row" width={50}>
      <Typography
        style={{
          textAlign: "left",
          borderRadius: 5,
          background: state.background,
          color: state.color,
          fontWeight: "bold",
          padding: "5px 20px",
        }}
      >
        {state.label.toUpperCase()}
      </Typography>
    </TableCell>
  );
}
