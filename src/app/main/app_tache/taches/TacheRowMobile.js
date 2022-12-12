import React from "react";

import {
  DialogTitle,
  Grid,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";

import { getDate, getTime } from "app/main/helpers/utils";
import Cell from "app/main/composants/table/Cell";

export default function TacheRowMobile(props) {
  const { item, onDoubleClick, onClick } = props;
  return (
    <div
      key={item.id}
      style={{
        cursor: "pointer",
        backgroundColor: item.tache_statue
          ? `${item.statue.colour}10`
          : "#edede910",
        // background: "white",
        borderColor: item.tache_statue ? `${item.statue.colour}` : "#edede9",

        borderWidth: "1px 1px 1px 10px",
        borderRadius: 5,
        padding: "10px",
        marginTop: 5,
        boxShadow: "2px 6px 6px #9E9E9E30",
      }}
      onDoubleClick={(e) => {
        onDoubleClick && onDoubleClick(e, item);
      }}
      onClick={(e) => {
        onClick && onClick(e, item);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifycontent: "space-between",
        }}
      >
        <Typography
          style={{
            fontSize: 18,
            fontWeight: 600,
            textTransform: "uppercase",
            textDecoration: "underline",
          }}
        >
          {item.intitule}
        </Typography>
        {/* <Typography>{item.statue && item.statue.intitule}</Typography> */}
        <Typography
          style={{
            fontWeight: 600,
            textTransform: "uppercase",
            backgroundColor:
              item.statue == 1
                ? `#264653`
                : item.statue == 2
                ? "#f77f00"
                : "#2a9d8f",
            padding: "5px 15px",
            borderRadius: 4,
            color: "white",
            fontSize: 11,
          }}
        >
          {item.statue == 1
            ? `En Pause`
            : item.statue == 2
            ? "En Cours"
            : "Terminer"}
        </Typography>
      </div>
      <Typography
        style={{
          fontWeight: 600,
          marginTop: 5,
          fontSize: 11,
          color: "gray",
          textTransform: "uppercase",
        }}
      >
        {item.employe_name}
      </Typography>
      <Typography
        style={{
          fontSize: 13,
          marginTop: 5,
          color: "#2f3e46",
        }}
      >
        {item.description}
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifycontent: "space-between",
          marginTop: 10,
        }}
      >
        <Typography
          style={{
            fontSize: 12,
            color: "#2b2d42",
          }}
        >{`Début: ${getDate(item.debut)}, ${getTime(item.debut)}`}</Typography>
        <Typography
          style={{
            fontSize: 12,
            color: "#2b2d42",
          }}
        >{`Fin: ${getDate(item.fin)}, ${getTime(item.fin)}`}</Typography>
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
      </div>
    </div>
  );
}
