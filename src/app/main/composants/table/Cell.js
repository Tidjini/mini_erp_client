import { TableCell, Typography } from "@material-ui/core";
import React from "react";

export default function Cell({ key, style, content, contentStyle, children }) {
  return (
    <TableCell
      key={key}
      style={{
        border: "1px solid #9E9E9E60",
        borderWidth: "1px 0 1px 1px",
        background: "#e8e8e810",
        ...style,
      }}
    >
      {!children && (
        <Typography
          style={{
            fontWeight: "700",
            color: "#474747",
            fontSize: 14,
            textAlign: "left",
            ...contentStyle,
          }}
        >
          {content}
        </Typography>
      )}

      {children}
    </TableCell>
  );
}
