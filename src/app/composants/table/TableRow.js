import {
  TableRow as TableRowBase,
  TableCell,
  Typography,
} from "@material-ui/core";
import React from "react";

export default function TableRow(props) {
  const { item, cols, onDoubleClickItem, onClickItem } = props;
  return (
    <TableRowBase
      className="h-32"
      style={{ cursor: "pointer" }}
      onDoubleClick={(e) => {
        onDoubleClickItem && onDoubleClickItem(e, item);
      }}
      onClick={(e) => {
        onClickItem && onClickItem(e, item);
      }}
    >
      {cols.map((col, index) => {
        const Composant = col.composant;
        return (
          <TableCell
            key={index}
            style={{ ...col.cellStyle, cursor: col.onClick && "pointer" }}
          >
            {!Composant && (
              <Typography
                style={col.contentStyle}
                onClick={(e) => {
                  col.onClick && col.onClick(e, item);
                }}
              >
                {col.value}
              </Typography>
            )}
            {Composant && (
              <Composant
                onClick={(e) => {
                  col.onClick && col.onClick(e, item);
                }}
                value={col.value}
              />
            )}
          </TableCell>
        );
      })}
    </TableRowBase>
  );
}
