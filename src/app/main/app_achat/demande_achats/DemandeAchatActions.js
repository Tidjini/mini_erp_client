import { Button, Grid } from "@material-ui/core";
import React from "react";

export default function DemandeAchatActions() {
  return (
    <Grid
      container
      justify="flex-end"
      item
      xs={12}
      spacing={2}
      style={{
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
      }}
    >
      <Button
        variant="contained"
        style={{
          marginRight: 4,
          boxShadow: "none",
          backgroundColor: "#1265E7",
          color: "#EFF1FF",
          textTransform: "none",
        }}
      >
        Sauvgarder
      </Button>
      <Button
        variant="contained"
        style={{
          marginRight: 4,
          boxShadow: "none",
          backgroundColor: "#3C3D40",
          color: "#EFF1FF",
          textTransform: "none",
        }}
      >
        Envoyer Mail
      </Button>
      <Button
        variant="contained"
        style={{
          marginRight: 4,
          boxShadow: "none",
          backgroundColor: "#467D2B",
          color: "#EFF1FF",
          textTransform: "none",
        }}
      >
        Transformer en devis
      </Button>
      <Button
        variant="contained"
        style={{
          marginRight: 4,
          boxShadow: "none",
          backgroundColor: "#FB5237",
          color: "#EFF1FF",
          textTransform: "none",
        }}
      >
        Fermer
      </Button>
    </Grid>
  );
}
