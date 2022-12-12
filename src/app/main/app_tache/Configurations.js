import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import CategorieView from "./categorie/CategorieView";
import StatueView from "./statue/StatueView";
import TacheCollection from "./taches/TacheCollection";
import UrgenceView from "./urgence/UrgenceView";

export default function Configurations(props) {
  return (
    <Grid
      container
      style={{ padding: 10 }}
      direction="row"
      justifycontent="space-between"
      spacing={1}
    >
      <Grid item xs={12} style={{ padding: 10 }}>
        <Typography
          style={{ fontWeight: 600, fontSize: 18, textTransform: "uppercase" }}
        >
          Géstions des Tâches
        </Typography>
      </Grid>
      <Divider
        style={{
          height: 1.5,
          width: "100%",
          borderRadius: 5,
          backgroundColor: "#D1DBE8",
          margin: 10,
        }}
      />

      <Grid item container>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatueView />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <UrgenceView />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CategorieView />
        </Grid>
      </Grid>
    </Grid>
  );
}
