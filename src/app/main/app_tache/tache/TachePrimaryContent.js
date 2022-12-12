import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { getDate } from "app/helpers/utils";

export default function TachePrimaryContent({ item }) {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      alignItems="center"
      justify="space-between"
    >
      <Grid item container xs={8} direction="row" alignItems="center">
        <Typography
          style={{
            width: 38,
            height: 38,
            backgroundColor: "red",
            borderRadius: 25,
            display: "flex",
            alignItems: "center",
            justifycontent: "center",
            fontWeight: 800,
          }}
        >
          T.M
        </Typography>
        <Typography
          style={{
            fontWeight: 600,
            marginLeft: 15,
          }}
        >
          Tidjini. Messaoudi
        </Typography>
      </Grid>

      <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
        <Typography
          style={{
            fontSize: 11,
            backgroundColor: item.urgence ? `${item.urgence.colour}` : "#000",
            color: item.urgence ? `#fff` : "#000",
            borderRadius: 4,
            padding: 4,
          }}
        >
          {item.urgence && item.urgence.intitule}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
        <Typography
          style={{
            fontSize: 11,
            backgroundColor: item.urgence ? `${item.urgence.colour}` : "#000",
            color: item.urgence ? `#fff` : "#000",
            borderRadius: 4,
            padding: 4,
          }}
        >
          EN COURS
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography style={{ fontWeight: "bold" }}>SOFT DEV</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography style={{ fontWeight: "bold" }}>
          Complete web application (gestion des tâches)
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
        <Typography style={{ fontSize: 12 }}>{`Début: ${getDate(
          item.debut
        )}`}</Typography>
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={2}>
        <Typography style={{ fontSize: 12 }}>{`Fin: ${getDate(
          item.fin
        )}`}</Typography>
      </Grid>
    </Grid>
  );
}
