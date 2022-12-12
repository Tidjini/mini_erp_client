import React from "react";

import { TableRow, TableCell, Typography } from "@material-ui/core";
import { wordElipsis } from "app/composants/utils";
import { showMessage } from "app/store/actions/fuse";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function CompteRow(props) {
  const dispatch = useDispatch();

  const { compte, selected, onClickItem } = props;

  useEffect(() => {}, [compte]);
  useEffect(() => {}, [selected]);

  return (
    <TableRow
      className="h-32 cursor-pointer"
      hover
      role="checkbox"
      tabIndex={-1}
      key={compte.compte_code_id}
      selected={undefined}
      style={{
        boxShadow: "1px 3px 3px #9E9E9E20",
        background:
          compte.compte_code_id === ""
            ? "#94d2bd50"
            : selected.id === compte.compte_code_id
            ? "#DFE2E8CC"
            : "#adb5bd20",
      }}
      onClick={(e) => {
        onClickItem(compte);
      }}
      onDoubleClick={(e) => {
        onClickItem(compte);
        dispatch(
          showMessage({
            message: `Consultation du compte ${compte.compte_code_id} avec tous les pieces et ecritures (detail)`,
            variant: "success",
            autoHideDuration: 1800,
            anchorOrigin: {
              vertical: "bottom", //top bottom
              horizontal: "center", //left center right
            },
          })
        );
      }}
    >
      <TableCell
        width={100}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
      >
        <Typography
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#474747",
            fontStyle: "italic",
          }}
        >
          {compte.compte}
        </Typography>
      </TableCell>
      <TableCell
        width={250}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
      >
        <Typography style={{ fontSize: 12, fontStyle: "italic" }}>
          {wordElipsis(compte.compte__intitule, 100)}
        </Typography>
      </TableCell>

      <TableCell
        width={100}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
      >
        <Typography style={{ fontSize: 12, fontStyle: "italic" }}>
          {compte.ecritures}
        </Typography>
      </TableCell>

      <TableCell
        width={150}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
      >
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: 16,
            padding: "4px 5px",
            textAlign: "right",
          }}
        >
          {`${new Intl.NumberFormat("fr-FR").format(compte.debit)}`}
        </Typography>
      </TableCell>
      <TableCell
        width={150}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 0 1px 1px",
        }}
      >
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: 16,
            padding: "4px 5px",
            textAlign: "right",
          }}
        >
          {`${new Intl.NumberFormat("fr-FR").format(compte.credit)}`}
        </Typography>
      </TableCell>

      <TableCell
        width={200}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 1px",
        }}
      >
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: 16,
            border: "1px solid #2a9d8f",
            borderRadius: 5,
            padding: "4px 20px",
            textAlign: "right",
            color: "#2a9d8f",
          }}
        >
          {`${new Intl.NumberFormat("fr-FR").format(compte.solde_debit)}`}
        </Typography>
      </TableCell>
      <TableCell
        width={200}
        style={{
          border: "1px solid #9E9E9E60",
          borderWidth: "0 1px 1px 0",
        }}
      >
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: 16,
            border: "1px solid #e76f51",
            borderRadius: 5,
            padding: "4px 20px",
            textAlign: "right",
            color: "#e76f51",
          }}
        >
          {`${new Intl.NumberFormat("fr-FR").format(compte.solde_credit)}`}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
