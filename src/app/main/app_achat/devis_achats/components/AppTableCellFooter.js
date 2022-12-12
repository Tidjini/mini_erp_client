import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

export default function AppTableCellFooter({ index, column, colSpan }) {
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
  return (
    <TableCell
      key={index}
      colSpan={colSpan}
      align="right"
      style={{
        border: "1px solid",
        position: columnData.position,
        left: columnData.left,
        backgroundColor: "white",
      }}
      sortDirection={false}
    >
      <Typography
        style={{
          fontSize: 16,
          fontWeight: "bold",
          padding: 2,
        }}
      >
        {columnData.label !== "" &&
          isNaN(columnData.label) === false &&
          `${new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "DZD",
          }).format(columnData.label)}`}

        {isNaN(columnData.label) === true && columnData.label}
      </Typography>
    </TableCell>
  );
}
