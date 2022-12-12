import React from "react";
import moment from "moment";
import { TableRow, TableCell, Typography, Button } from "@material-ui/core";
import { wordElipsis } from "app/composants/utils";

export default function EcritureMouvement(props) {
  const { ecriture, onEdit, setSelected, error, setError } = props;

  return (
    <TableRow
      className="h-32 cursor-pointer"
      hover
      role="checkbox"
      tabIndex={-1}
      key={ecriture.num_ligne}
      style={{
        boxShadow: "1px 3px 3px #9E9E9E20",
        background: "#adb5bd20",
      }}
      onClick={(e) => {
        // setSelected(ecriture);
      }}
      onDoubleClick={(e) => {
        onEdit(ecriture);
      }}
    >
      <TableCell
        width={130}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
      >
        <Typography style={{ fontSize: 16, fontWeight: "bold" }}>
          {ecriture.num_mouvement}
        </Typography>
      </TableCell>
      <TableCell
        width={250}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
      >
        <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
          {`[${ecriture.journal}]   ${wordElipsis(
            ecriture.daily ? ecriture.daily.intitule : "",
            50
          )}`}
        </Typography>
      </TableCell>
      <TableCell
        width={110}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
      >
        <Typography style={{ fontSize: 12, fontWeight: "600" }}>
          {ecriture.date}
        </Typography>
      </TableCell>
      <TableCell
        width={110}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
      >
        <Typography style={{ fontSize: 12, fontWeight: "600" }}>
          {ecriture.statut}
        </Typography>
      </TableCell>

      <TableCell
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
      >
        <Typography style={{ fontSize: 12, fontWeight: "400" }}>
          {wordElipsis(ecriture.libelle, 150)}
        </Typography>
      </TableCell>
      <TableCell
        width={150}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
      >
        <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
          {ecriture.num_piece}
        </Typography>
      </TableCell>
      <TableCell
        width={200}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 1px",
          textAlign: "right",
        }}
      >
        <Typography style={{ fontSize: 14, fontWeight: "700" }}>
          {`${new Intl.NumberFormat("fr-FR").format(ecriture.debit)}`}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
