import { Grid } from "@material-ui/core";
import LocationInput from "app/composants.v2/InputLocation";
import React from "react";

export default function TaskMapInputs({
  isLoaded,
  onDepartChanged,
  onArriveChanged,
}) {
  return (
    isLoaded && (
      <Grid item container spacing={1} xs={12}>
        <Grid item xs={12}>
          <LocationInput
            label="Départ"
            defaultValue={undefined}
            onChange={(depart) => {
              onDepartChanged(depart);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <LocationInput
            label="Arrivée"
            defaultValue={undefined}
            onChange={(arrive) => {
              onArriveChanged(arrive);
            }}
          />
        </Grid>
      </Grid>
    )
  );
}
