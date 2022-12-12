import React, { useCallback, useEffect, useState } from "react";

import { Typography } from "@material-ui/core";
import { MenuItem, Menu as BaseMenu } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#3d405b",
      color: "#f1faee",
    },
    margin: 20,
  },
}));

function Wagon(props) {
  const {
    numero,
    produit,
    operation,
    menu,
    onSelectWagon,
    onUnselectWagon,
    selected,
    nextOperation,
    casse,
  } = props;

  const produits = useSelector(
    ({ production_main }) => production_main.produits
  );

  const classes = useStyles();
  const [cover, setCover] = useState({
    backgroundOne: "transparent",
    backgroundTwo: "transparent",
    border: "#264653",
  });
  const [oldCover, setOldCover] = useState({
    backgroundOne: "transparent",
    backgroundTwo: "transparent",
    border: "#264653",
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNextOperation = (produit) => {
    nextOperation(produit);
    setCover(oldCover);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (selected === true) {
      setOldCover(cover);
      setCover({ ...cover, border: "#52b788" });
    } else {
      setCover(oldCover);
    }
  }, [selected]);

  const handleClick = useCallback((event) => {
    event.stopPropagation();

    if (event.ctrlKey) {
      console.log("Ctrl+click has just happened!", event.ctrlKey);
    }
    if (selected === true) {
      onUnselectWagon(numero);
    } else {
      onSelectWagon(numero, event.ctrlKey);
    }
  });

  const handleContextMenu = useCallback(
    (event) => {
      if (event.type === "contextmenu") {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        if (selected === true) return;
        onSelectWagon(numero, event.ctrlKey);
      }
    },
    [cover]
  );

  useEffect(() => {
    switch (operation) {
      case "EMPILEMENT":
        setCover({
          backgroundOne: "#26465330",
          backgroundTwo: "#02304730",
          border: "#264653",
        });
        break;
      case "ENFOURNEMENT":
        setCover({
          backgroundOne: "#ca670220",
          backgroundTwo: "#e07a5f20",
          border: "#ca6702",
        });
        break;
      case "DEFOURNEMENT":
        setCover({
          backgroundOne: "#ae201240",
          backgroundTwo: "#ca670240",
          border: "#ae2012",
        });
        break;
      case "EMBALLAGE":
        setCover({
          backgroundOne: "#f77f0030",
          backgroundTwo: "#ca670230",
          border: "#f77f00",
        });
        break;
      default:
        break;
    }
  }, [operation]);

  return (
    <div
      style={{
        padding: "4px 8px",
      }}
    >
      <div
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        style={{
          width: 62,
          height: 42,
          borderRadius: 5,
          borderWidth: "1px 4px",
          borderColor: cover.border,
          position: "relative",
          display: "flex",
          justifycontent: "space-between",
          cursor: "pointer",
        }}
      >
        <Typography
          style={{
            fontWeight: "700",
            padding: "2px 5px",
            backgroundColor: "#212529",
            color: "#fefae0",
            display: "flex",
            alignSelf: "start",
            borderRadius: 3,
            zIndex: 10,
          }}
        >
          {numero}
        </Typography>
        <div
          style={{
            position: "absolute",
            top: -1,
            left: 0,
            width: 56,
            height: 42,
            backgroundColor: cover.backgroundOne,
            borderStyle: "solid",
            borderRightWidth: 56,
            borderTopWidth: 40,
            borderRightColor: "transparent",
            borderTopColor: cover.backgroundTwo,
          }}
        ></div>

        {produit && (
          <div
            style={{
              textAlign: "right",
              margin: "0 5px",
              display: "flex",
              justifycontent: "end",
              flexDirection: "column",
            }}
          >
            <img
              alt="state"
              src={"assets/images/app_production/brick.png"}
              style={{ width: 18, height: 18 }}
            />
            <Typography
              style={{ fontSize: 9, fontWeight: "900", paddingRight: 5 }}
            >
              {produit.symbole}
            </Typography>
          </div>
        )}
        {selected && (
          <img
            alt="state"
            src={"assets/images/app_production/accept.png"}
            style={{
              width: 14,
              height: 14,
              position: "absolute",
              bottom: 2,
              left: 2,
            }}
          />
        )}
      </div>
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
        {operation === "ATTENTE" && (
          <MenuItem
            onClick={(e) => {
              handleNextOperation(null);
            }}
            style={{
              fontSize: 12,
              fontWeight: "600",
              margin: 0,
            }}
          >
            {`Empilement : Vide`}
          </MenuItem>
        )}

        {operation === "EMPILEMENT" && (
          <MenuItem
            onClick={() =>
              handleNextOperation(produit !== null ? produit.id : null)
            }
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
              handleNextOperation(produit !== null ? produit.id : null);
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
              handleNextOperation(produit !== null ? produit.id : null);
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
              handleNextOperation(produit !== null ? produit.id : null);
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
        {operation !== "ATTENTE" && (
          <MenuItem
            onClick={casse}
            style={{
              fontSize: 12,
              fontWeight: "600",
              margin: 0,
            }}
          >
            Casse
          </MenuItem>
        )}
      </BaseMenu>
    </div>
  );
}
export default withReducer("production_main", reducer)(Wagon);
