import React from "react";
import TableRow from "@material-ui/core/TableRow";

export default function AppTableRow(props) {
  const { isSelected, key, onClick, children } = props;
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
      style={{ height: 10 }}
      onClick={onClick}
    >
      {children}
    </TableRow>
  );
}
