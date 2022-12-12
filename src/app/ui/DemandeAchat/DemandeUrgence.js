import { TableCell, Typography } from "@material-ui/core";
import React from "react";
function getUrgence(urgence) {
  let state = ["Normal", "#00916E"];

  if (urgence === null || urgence === undefined) {
    return state;
  }

  if (urgence === 1) return state;
  if (urgence === 2) return [`Moyenne`, "#EE9B00"];
  if (urgence === 3) return [`Urgent`, "#BB3E03"];
  else return [`très Urgent`, "#d00000"];
}

export default function DemandeUrgence(props) {
  const { urgence } = props;
  const state = getUrgence(urgence);
  return (
    <TableCell
      className="truncate"
      component="th"
      scope="row"
      align="left"
      width={50}
    >
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: 12,
          borderRadius: 5,
          padding: "8px 20px",
          textAlign: "center",
          color: "white",
          background: state[1],
        }}
      >
        {state[0].toUpperCase()}
      </Typography>
    </TableCell>
  );
}
