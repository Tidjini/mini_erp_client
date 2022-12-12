import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

export default function AppTableCell({
  index,
  item,
  column,
  colSpan,
  onClick,
}) {
  const [columnData, setColumnData] = useState({
    label: "",
    position: "none",
    left: 0,
  });

  useEffect(() => {
    if (typeof column === "object" && column !== null) {
      setColumnData({
        label: column.label,
        position: column.position,
        left: column.left,
      });
    } else {
      setColumnData({ label: column, position: "none", left: 0 });
    }
  }, [column]);

  function handleClick(event) {
    onClick(column.row, index, column);
  }
  return (
    <TableCell
      key={index}
      colSpan={colSpan}
      align={"center"}
      padding={"default"}
      sortDirection={false}
      style={{
        border: "1px solid",
        background:
          index === item.selected || index === item.selected + 1
            ? "#FFBA49"
            : index === item.min || index === item.min + 1
            ? "#2a9d8f"
            : "white",

        position: columnData.position,
        left: columnData.left,
      }}
      onClick={handleClick}
    >
      <Typography
        style={{
          fontSize:
            index === item.selected || index === item.selected + 1
              ? 18
              : index === item.min || index === item.min + 1
              ? 18
              : isNaN(columnData.label) === true
              ? 14
              : 11,
          fontWeight: "bold",

          color:
            index === item.selected || index === item.selected + 1
              ? "#001219"
              : index === item.min || index === item.min + 1
              ? "#f1faee"
              : "#001219",
          padding: 2,
          textDecoration:
            isNaN(columnData.label) === true ? "underline" : "none",
        }}
      >
        {isNaN(columnData.label) === false &&
          `${new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "DZD",
          }).format(columnData.label)}`}
        {isNaN(columnData.label) === true && columnData.label.toUpperCase()}
      </Typography>
    </TableCell>
  );
}
