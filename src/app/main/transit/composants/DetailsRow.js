import React from "react";

import { TableRow, TableCell, Typography } from "@material-ui/core";

import { convertToTonne } from "app/helpers/utils";
import { detailsRow as styles } from "./styles";
import OperationStatue from "./OperationStatue";

export default function DetailsRow(props) {
  const { item, onDoubleClick, onClick } = props;

  return (
    <TableRow
      className="h-32"
      style={{
        ...styles.row,
        backgroundColor: "#e0fbfc05",
      }}
      onDoubleClick={(e) => {
        onDoubleClick && onDoubleClick(e, item);
      }}
      onClick={(e) => {
        onClick && onClick(e, item);
      }}
    >
      <TableCell key="numéro" style={styles.cell}>
        <Typography style={{ ...styles.cellContent }}>{item.numero}</Typography>
      </TableCell>
      <TableCell key="chauffeur" style={styles.cell}>
        <Typography style={{ ...styles.cellContent }}>
          {item.chauffeur}
        </Typography>
      </TableCell>
      <TableCell key="camion" style={styles.cell}>
        <Typography
          style={{
            ...styles.cellContent,
            fontWeight: "600",
            fontSize: 12,
            textTransform: "uppercase",
          }}
        >
          {item.camion}
        </Typography>
      </TableCell>
      <TableCell key="tare_initial" style={styles.cell}>
        <Typography
          style={{
            ...styles.cellContent,
            color: "#264653",
            fontSize: 12,
          }}
        >
          {convertToTonne(item.tare_initial)}
        </Typography>
      </TableCell>
      <TableCell key="tare_port" style={styles.cell}>
        <Typography
          style={{
            ...styles.cellContent,
            color: "#264653",
            fontSize: 12,
          }}
        >
          {convertToTonne(item.tare_port)}
        </Typography>
      </TableCell>
      <TableCell key="brut_port" style={styles.cell}>
        <Typography
          style={{
            ...styles.cellContent,
            color: "#e07a5f",
            fontSize: 12,
          }}
        >
          {convertToTonne(item.brut_port)}
        </Typography>
      </TableCell>
      <TableCell key="brut_depot" style={styles.cell}>
        <Typography
          style={{
            ...styles.cellContent,
            color: "#264653",
            fontSize: 12,
          }}
        >
          {convertToTonne(item.brut_depot)}
        </Typography>
      </TableCell>
      <TableCell key="tare_final" style={styles.cell}>
        <Typography
          style={{
            ...styles.cellContent,
            color: "#264653",
            fontSize: 12,
          }}
        >
          {convertToTonne(item.tare_final)}
        </Typography>
      </TableCell>
      <TableCell key="net_depot" style={styles.cell}>
        <Typography
          style={{
            ...styles.cellContent,
            color: "#005f73",
          }}
        >
          {convertToTonne(item.net_depot)}
        </Typography>
      </TableCell>

      <TableCell
        key="statue"
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "1px",
          background: "#e8e8e810",
        }}
      >
        <OperationStatue statue={item.statue} alert={item.alert} />
      </TableCell>
    </TableRow>
  );
}
