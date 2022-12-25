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
            defaultValue={{
              address: "Hamri Pharmacy, Oran, Algérie",
              lat: 35.6840886,
              lng: -0.6387731,
            }}
            onChange={(depart) => {
              onOriginChanged(depart);
              changeDirection && changeDirection();
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <LocationInput
            label="Arrivée"
            defaultValue={"Pharmacie Ben Okba, W46, Hassi Ben Okba, Algérie"}
            onChange={(arrive) => {
              onDestinationChanged(arrive);
              changeDirection && changeDirection();
            }}
          />
        </Grid>
      </Grid>
    )
  );
}
