import { Grid } from "@material-ui/core";
import LocationInput from "app/composants.v2/InputLocation";
import React from "react";

export default function TaskMapInputs({
  isLoaded,
  onOriginChanged,
  onDestinationChanged,
  changeDirection,
}) {
  return (
    isLoaded && (
      <Grid item container spacing={1} xs={12}>
        <Grid item xs={12} sm={6} md={6}>
          <LocationInput
            label="Départ"
            value="Pharmacie Ben Okba, W46, Hassi Ben Okba, Algérie"
            onChange={(depart) => {
              onOriginChanged(depart);
              changeDirection && changeDirection();
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <LocationInput
            label="Arrivée"
            onChange={(arrive) => {
              onDestinationChanged(arrive);
              changeDirection && changeDirection();
            }}
            value="Pharmacie Ben Okba, W46, Hassi Ben Okba, Algérie"
          />
        </Grid>
      </Grid>
    )
  );
}
