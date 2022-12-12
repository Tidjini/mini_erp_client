import React, { useEffect, useState } from "react";

import { TableCell } from "@material-ui/core";

export default function AppTableCell(props) {
  const { type, value, label, icon, style, Composant } = props;
  return (
    <TableCell
      className={type === "image" ? "w-52" : ""}
      scope="row"
      style={style}
      padding={type === "image" ? "none" : ""}
    >
      {type === "image" ? (
        value != null && value != "" ? (
          <img
            className="w-full block rounded"
            src={value}
            alt={label}
            style={{
              height: 36,
              width: 36,
              borderRadius: 56,
              margin: 16,
            }}
          />
        ) : (
          <img
            className="w-full block rounded"
            src="/assets/images/ecommerce/product-image-placeholder.png"
            alt={label}
            style={{
              height: 36,
              width: 36,
              borderRadius: 56,
              margin: 16,
            }}
          />
        )
      ) : type === "icon" ? (
        icon
      ) : type === "composant" ? (
        <Composant value={value} />
      ) : (
        value
      )}
    </TableCell>
  );
}
