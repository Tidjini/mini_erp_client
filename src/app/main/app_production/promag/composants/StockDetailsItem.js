import React, { useCallback, useEffect, useState } from "react";

import { Grid, Icon, Typography } from "@material-ui/core";
import { Button, MenuItem, Menu as BaseMenu } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppInput from "app/composants/inputs/AppInput";
import { useForm } from "@fuse/hooks";

const useStyles = makeStyles((theme) => ({
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#3d405b",
      color: "#f1faee",
    },
    margin: 20,
  },
}));

export default function StockDetailsItem(props) {
  const { produit } = props;
  const { form, handleChange, setForm, setInForm } = useForm({
    libelle: "",
    short: "",
    qte_pt: 0,
    qte_piece: 0,
    casse_int_pt: 0,
    casse_int_piece: 0,
    casse_ext_pt: 0,
    casse_ext_piece: 0,
    EXPEDITION: 0,
    rest_pt: 0,
    rest_piece: 0,
  });

  useEffect(() => {
    setForm({ ...produit, qte_restant: produit.qte });
  }, [produit]);

  const handleClick = useCallback((event) => {}, []);

  const handleContextMenu = useCallback((event) => {
    if (event.type === "contextmenu") {
    }
  }, []);

  return (
    <div
      style={{
        borderRadius: "5px 5px 0 0",
        border: "1px solid #002C3D40",
        borderWidth: "1px 1px 0 1px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        style={{
          border: "0 solid #ca6702",
          position: "relative",
          display: "flex",
          justifycontent: "center",
          padding: "20px",
          width: "100%",
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
              style={{ width: 136, height: 136 }}
            />
            <Typography
              style={{ fontSize: 16, fontWeight: "700", paddingRight: 5 }}
            >
              {produit.short}
            </Typography>
          </div>
        )}
      </div>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            border: "1px solid #002C3D40",
            borderWidth: "1px 0 1px 0",
            backgroundColor: "#002C3D60",
            padding: "5px 10px",
          }}
        >
          <Typography
            style={{ fontSize: 16, fontWeight: "700", paddingRight: 5 }}
          >
            {produit.libelle}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            border: "1px solid #002C3D40",
            borderWidth: "0 1px 1px 0",
            padding: "5px 10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            QTE ACTUEL
          </Typography>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            border: "1px solid #002C3D40",
            borderWidth: "0 0 1px 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AppInput
            name="qte_pt"
            handleChange={(e) => {}}
            value={`${form.qte_pt} pt / ${form.qte_piece} (p)`}
            horizontal={true}
            height={32}
            onEnter={() => {}}
            style={{ margin: 5, width: "90%", backgroundColor: "#9E9E9E20" }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
