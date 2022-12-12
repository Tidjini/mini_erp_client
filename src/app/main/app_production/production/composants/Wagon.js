import React, { useCallback, useEffect, useState } from "react";

import { Typography } from "@material-ui/core";

import { useSelector } from "react-redux";
import PhaseMenuActions from "./PhaseMenuActions";

export default function Wagon(props) {
  const {
    numero,
    produit,
    produit_designation,
    operation,
    onSelectWagon,
    onUnselectWagon,
    selected,
    nextOperation,
    previousOperation,
  } = props;

  const produits = useSelector(
    ({ production_production }) => production_production.produits
  );

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
  const [anchorEl, setAnchorEl] = React.useState(null);

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

        {produit_designation && (
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
              {produit_designation}
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
      <PhaseMenuActions
        nextOperation={nextOperation}
        previousOperation={previousOperation}
        setCover={setCover}
        oldCover={oldCover}
        operation={operation}
        produits={produits}
        produit={produit}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </div>
  );
}
