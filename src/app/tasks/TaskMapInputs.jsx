import { Grid } from "@material-ui/core";
import LocationInput from "app/composants.v2/InputLocation";
import React from "react";
import { useSelector } from "react-redux";

export default function TaskMapInputs({
  isLoaded,
  onOriginChanged,
  originAddress,
  onDestinationChanged,
  destinaitonAddress,
  changeDirection,
}) {
  const user = useSelector(({ auth }) => auth.user.data);

  return (
    isLoaded && (
      <Grid item container spacing={1} xs={12}>
        <Grid item xs={12} sm={6} md={6}>
          <LocationInput
            label="Départ"
            value={originAddress}
            onChange={(depart) => {
              onOriginChanged(depart);
              changeDirection && changeDirection();
            }}
            disabled={!user.is_admin && !user.is_stuff}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <LocationInput
            label="Arrivée"
            onChange={(arrive) => {
              onDestinationChanged(arrive);
              changeDirection && changeDirection();
            }}
            value={destinaitonAddress}
            disabled={!user.is_admin && !user.is_stuff}
          />
        </Grid>
      </Grid>
    )
  );
}
