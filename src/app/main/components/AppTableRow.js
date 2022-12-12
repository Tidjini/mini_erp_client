import { TableRow } from "@material-ui/core";
import React from "react";

export default function AppTableRow(props) {
  const { isSelected, key, style, onClick, children } = props;

  return (
    <TableRow
      className="cursor-pointer"
      hover
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      key={key}
      size="small"
      selected={isSelected}
      style={{ ...style }}
      onClick={onClick}
    >
      {children}
    </TableRow>
  );
}
