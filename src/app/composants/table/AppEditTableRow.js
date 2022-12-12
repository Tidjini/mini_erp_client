import React from "react";
import TableRow from "@material-ui/core/TableRow";

import AppEditTableCell from "./AppEditTableCell";

export default function AppEditTableRow(props) {
  const { item, id, isSelected, isNew, setSelected, cells } = props;

  return (
    <TableRow
      className="h-32 cursor-pointer"
      hover
      role="checkbox"
      tabIndex={-1}
      key={item[id]}
      style={{
        boxShadow: "1px 3px 3px #9E9E9E20",
        background: isNew
          ? "#94d2bd50"
          : isSelected
          ? "#DFE2E8CC"
          : "#adb5bd20",
      }}
      onClick={(e) => {
        setSelected(item);
      }}
    >
      {cells.map((cell, index) => (
        <AppEditTableCell cell={cell} key={index} />
      ))}
    </TableRow>
  );
}
