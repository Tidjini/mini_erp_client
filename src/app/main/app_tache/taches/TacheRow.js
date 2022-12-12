import React from "react";

import { Hidden, TableCell, TableRow, Typography } from "@material-ui/core";

import { getDate, getTime } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

export default function TacheRow(props) {
  const { item, onDoubleClick, onClick } = props;
  {
    /* <TableCell
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
    </TableCell> */
  }
  return (
    <TableRow
      className="h-32"
      style={{
        cursor: "pointer",
        backgroundColor: item.tache_statue
          ? `${item.statue.colour}20`
          : "#edede920",
        width: "100%",
      }}
      onDoubleClick={(e) => {
        onDoubleClick && onDoubleClick(e, item);
      }}
      onClick={(e) => {
        onClick && onClick(e, item);
      }}
    >
      <Cell
        key="statue"
        content={
          item.statue == 1
            ? `En Pause`
            : item.statue == 2
            ? "En Cours"
            : "Terminer"
        }
        contentStyle={{
          fontSize: 11,
          fontWeight: 800,
          textTransform: "uppercase",
          backgroundColor:
            item.statue == 1
              ? `#264653`
              : item.statue == 2
              ? "#f77f00"
              : "#2a9d8f",
          padding: 5,
          borderRadius: 4,
          color: "#edf2f4",
        }}
        style={{
          width: 120,
          textAlign: "center",
        }}
      ></Cell>
      <Cell
        key="categorie"
        content={item.intitule ? `${item.intitule}` : "----"}
        contentStyle={{
          fontSize: 12,
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      ></Cell>
      <Cell
        key="responsable"
        content={item.employe_name ? `${item.employe_name} ` : "-----"}
        contentStyle={{
          color: "#474747",
          fontSize: 13,
          textTransform: "uppercase",
        }}
      ></Cell>

      <TableCell
        key="urgence"
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "1px 0 1px 1px",
          backgroundColor: "#e8e8e810",
        }}
      >
        <Typography
          style={{
            fontSize: 12,
            fontWeight: 800,
            color:
              item.urgence == 1
                ? `#264653`
                : item.urgence == 2
                ? "#f77f00"
                : "#e63946",
          }}
        >
          {item.urgence == 1
            ? `Normal`
            : item.urgence == 2
            ? "Urgent"
            : "Très Urgent"}
        </Typography>
      </TableCell>

      <TableCell
        key="debut"
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "1px 0 1px 1px",
          backgroundColor: "#e8e8e810",
        }}
      >
        <Typography
          style={{
            fontWeight: "700",
            color: "#264653",
            fontSize: 14,
            textAlign: "left",
          }}
        >
          {item.debut_effective
            ? `${getDate(item.debut_effective)}, ${getTime(
                item.debut_effective
              )}`
            : "-------"}
        </Typography>
        <Typography
          style={{
            color: "#264653",
            fontSize: 11,
            textAlign: "left",
          }}
        >
          {item.debut
            ? `${getDate(item.debut)}, ${getTime(item.debut)}`
            : "-------"}
        </Typography>
      </TableCell>

      <TableCell
        key="fin"
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "1px 0 1px 1px",
          backgroundColor: "#e8e8e810",
        }}
      >
        <Typography
          style={{
            fontWeight: "700",
            color: "#264653",
            fontSize: 14,
            textAlign: "left",
          }}
        >
          {item.fin_effective
            ? `${getDate(item.fin_effective)}, ${getTime(item.fin_effective)}`
            : "------"}
        </Typography>
        <Typography
          style={{
            color: "#264653",
            fontSize: 11,
            textAlign: "left",
          }}
        >
          {item.fin ? `${getDate(item.fin)}, ${getTime(item.fin)}` : "-------"}
        </Typography>
      </TableCell>

      <Cell
        key="employe"
        content={item.employe}
        contentStyle={{
          fontWeight: "600",
          color: "#474747",
          fontSize: 11,
          textTransform: "uppercase",
        }}
      ></Cell>
      <Cell
        key="description"
        content={`${item.description}`}
        contentStyle={{
          fontWeight: "600",
          color: "#474747",
          fontSize: 12,
        }}
        style={{
          borderWidth: "1px",
        }}
      ></Cell>
    </TableRow>
  );
}
