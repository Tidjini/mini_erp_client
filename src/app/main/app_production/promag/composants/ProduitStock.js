import React, { useCallback, useEffect, useState } from "react";

import { Icon, Typography } from "@material-ui/core";
import { Button, MenuItem, Menu as BaseMenu } from "@material-ui/core";
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

export default function ProduitStock(props) {
  const { produit } = props;

  const handleClick = useCallback((event) => {}, []);

  const handleContextMenu = useCallback((event) => {
    if (event.type === "contextmenu") {
    }
  }, []);

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
          width: 56,
          height: 56,
          borderRadius: 5,
          border: "2px dashed #ca6702",
          position: "relative",
          display: "flex",
          justifycontent: "space-between",
          cursor: "pointer",
        }}
      >
        {produit && (
          <div
            style={{
              textAlign: "right",
              margin: "0 5px",
              display: "flex",
              justifycontent: "end",
              flexDirection: "column",
              zIndex: 10,
            }}
          >
            <img
              alt="state"
              src={"assets/images/app_production/pallets.png"}
              style={{ width: 36, height: 36 }}
            />
            <Typography
              style={{ fontSize: 9, fontWeight: "900", paddingRight: 5 }}
            >
              {produit}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
