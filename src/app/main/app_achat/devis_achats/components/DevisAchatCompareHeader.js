import React, { useState, useEffect } from "react";
import { TableCell, TableHead, TableRow, Typography } from "@material-ui/core";

export default function DevisAchatCompareHeader(props) {
  const { header } = props;

  return (
    <TableHead>
      <TableRow style={{ background: "#002C3D" }}>
        {header.map((column, index) => (
          <TableCell
            key={index}
            align={"center"}
            padding={"default"}
            sortDirection={false}
            style={{
              minWidth: 150,
              position:
                typeof column === "object" && column !== null
                  ? column.position
                  : "none",
              left:
                typeof column === "object" && column !== null ? column.left : 0,
              background: "#002C3D",
            }}
          >
            <Typography
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {typeof column === "object" && column !== null
                ? column.label
                : column}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
