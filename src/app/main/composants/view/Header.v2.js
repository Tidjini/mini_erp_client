import { Grid, Icon, IconButton } from "@material-ui/core";
import React from "react";
import Button from "app/main/composants/base/Button";
export default function Header(props) {
  const {
    onBackClicked,
    icon,
    title,
    hint,
    onSave,
    onSaveAndNew,
    onDelete,
    backgroundColor,
  } = props;
  return (
    <Grid
      style={{
        borderRadius: 10,
        backgroundColor: backgroundColor || "black",
      }}
      container
      direction="row"
      justifycontent="space-between"
      alignItems="center"
      spacing={1}
    >
      <Grid item container alignItems="center" sm={12} md={6} lg={3} xl={2}>
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
          style={{ width: 36, height: 36 }}
        />
        {title}

        {hint}
      </Grid>

      {onSave && (
        <Grid item xs={6} sm={3} md={2} lg={1}>
          <Button onClick={onSave}>Sauvgarder</Button>
        </Grid>
      )}
      {onSaveAndNew && (
        <Grid item xs={6} sm={3} md={2} lg={1}>
          <Button style={{ backgroundColor: "#83c5be" }} onClick={onSaveAndNew}>
            Sauv.Nouveau
          </Button>
        </Grid>
      )}
      {onDelete && (
        <Grid item xs={6} sm={3} md={2} lg={1}>
          <Button
            onClick={onDelete}
            style={{
              backgroundColor: "#e63946",
            }}
          >
            Supprimer
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
