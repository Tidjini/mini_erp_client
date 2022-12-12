import { TableCell, Typography } from "@material-ui/core";
import React from "react";
function getDate(date, statue) {
  let state = ["Disponible", "#00916E"];

  if (date === null || date === undefined) {
    return state;
  }
  const dateTime = new Date(date);

  const today = new Date();
  const disponible = new Date();
  disponible.setDate(today.getDate() + 5);
  const verified = new Date();
  verified.setDate(today.getDate() + 1);

  const dateStr = `${("0" + dateTime.getDate()).slice(-2)}/${(
    "0" +
    (dateTime.getMonth() + 1)
  ).slice(-2)}/${dateTime.getFullYear()}`;
  if (
    today.getFullYear() <= dateTime.getFullYear() &&
    today.getMonth() <= dateTime.getMonth()
  ) {
    if (disponible <= dateTime) {
      state = [`Disponible: ${dateStr}`, "#00916E"];
    } else if (verified <= dateTime) {
      state = [`A vérifier: ${dateStr}`, "#e76f51"];
    } else {
      state = [`éxpirer`, "#9b2226"];
    }
  }

  if (statue === 3) {
    state = ["Cloturé", "#00916E"];
  }
  if (statue === 4) {
    state = ["Cloturé", "#9b2226"];
  }

  return state;
}

export default function DevisValidation(props) {
  const { date, statue } = props;
  const dateState = getDate(date, statue);
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
          background: dateState[1],
        }}
      >
        {dateState[0].toUpperCase()}
      </Typography>
    </TableCell>
  );
}
