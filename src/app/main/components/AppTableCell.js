import React from "react";

import { TableCell } from "@material-ui/core";

export default function AppTableCell(props) {
  const { type, children, style } = props;
  return (
    <TableCell
      className={type === "image" ? "w-52" : ""}
      scope="row"
      style={style}
      padding={type === "image" ? "none" : ""}
    >
      {children}
    </TableCell>
  );
}
