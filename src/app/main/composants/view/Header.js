import { Button, Grid, Icon, IconButton, Typography } from "@material-ui/core";
import React from "react";

export default function Header(props) {
  const {
    style,
    onBackClicked,
    icon,
    title,
    hint,
    onSave,
    onSaveAndNew,
    onDelete,
    children,
  } = props;
  return (
    <Grid container className="w-full flex" style={style.header}>
      <Grid item xs={12} sm={7} style={style.flexCenter}>
        <IconButton
          aria-haspopup="true"
          onClick={(e) => {
            onBackClicked(e);
          }}
        >
          <Icon color="action" className="text-24" style={{ color: "white" }}>
            arrow_back
          </Icon>
        </IconButton>
        <img
          alt="state"
          src={icon || "assets/images/bloc_note.png"}
          style={style.icon}
        />
        {title}

        {hint}
      </Grid>
      <Grid item xs={12} sm={1}>
        {onSaveAndNew && (
          <Button
            variant="contained"
            style={{ ...style.button, backgroundColor: "#83c5be" }}
            onClick={onSaveAndNew}
          >
            Sauv. Nouveau
          </Button>
        )}
      </Grid>
      <Grid item xs={12} sm={1}>
        {onSave && (
          <Button
            variant="contained"
            style={{ ...style.button }}
            onClick={onSave}
          >
            Sauvgarder
          </Button>
        )}
      </Grid>

      <Grid item xs={12} sm={1}>
        {onDelete && (
          <Button
            variant="contained"
            style={{ ...style.button, backgroundColor: "#e63946" }}
            onClick={onDelete}
          >
            Supprimer
          </Button>
        )}
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
}
