import React from "react";
import { MenuItem, Menu as BaseMenu } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#3d405b",
      color: "#f1faee",
    },
    margin: 20,
  },
}));
export default function PhaseMenuActions(props) {
  const {
    nextOperation,
    previousOperation,
    setCover,
    oldCover,
    operation,
    produits,
    produit,
    anchorEl,
    setAnchorEl,
  } = props;
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNextOperation = (produit) => {
    nextOperation(produit);
    setCover(oldCover);
    setAnchorEl(null);
  };
  const handlePreviousOperation = () => {
    previousOperation();
    setCover(oldCover);
    setAnchorEl(null);
  };
  return (
    <BaseMenu
      id="basic-menu"
      className={classes.menu}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {operation === "ATTENTE" &&
        produits &&
        produits.results.map((produit, index) => (
          <MenuItem
            key={index}
            onClick={(e) => {
              handleNextOperation(produit.id);
            }}
            style={{
              fontSize: 12,
              fontWeight: "600",
              margin: 0,
            }}
          >
            {`Empilement : ${produit.symbole}`}
          </MenuItem>
        ))}

      {operation === "EMPILEMENT" && (
        <MenuItem
          onClick={() => handleNextOperation(produit !== null ? produit : null)}
          style={{
            fontSize: 12,
            fontWeight: "600",
            margin: 0,
          }}
        >
          Enfournement
        </MenuItem>
      )}
      {operation === "ENFOURNEMENT" && (
        <MenuItem
          onClick={(e) => {
            handleNextOperation(produit !== null ? produit : null);
          }}
          style={{
            fontSize: 12,
            fontWeight: "600",
            margin: 0,
          }}
        >
          Défournement
        </MenuItem>
      )}
      {operation === "DEFOURNEMENT" && (
        <MenuItem
          onClick={(e) => {
            handleNextOperation(produit !== null ? produit : null);
          }}
          style={{
            fontSize: 12,
            fontWeight: "600",
            margin: 0,
          }}
        >
          Emballage
        </MenuItem>
      )}
      {operation === "EMBALLAGE" && (
        <MenuItem
          onClick={(e) => {
            handleNextOperation(produit !== null ? produit : null);
          }}
          style={{
            fontSize: 12,
            fontWeight: "600",
            margin: 0,
          }}
        >
          Vers Stockage
        </MenuItem>
      )}

      <MenuItem
        onClick={(e) => {
          handlePreviousOperation();
        }}
        style={{
          fontSize: 12,
          fontWeight: "600",
          margin: 0,
        }}
      >
        Opération Précédentes
      </MenuItem>
    </BaseMenu>
  );
}
