import { Grid } from "@material-ui/core";
import { useLoadScript } from "@react-google-maps/api";
import LocationInput from "app/composants.v2/InputLocation";
import DrawDirection from "app/composants.v2/map/DrawDirections";
import MapView from "app/composants.v2/map/MapView";
import TypedMarker from "app/composants.v2/map/Marker";
import React from "react";
import TaskMapInputs from "./TaskMapInputs";

export default function TaskMapView() {
  const [maps, setMaps] = React.useState();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  return (
    <Grid item container spacing={1} xl={6} lg={6} md={12} sm={12} xs={12}>
      <TaskMapInputs isLoaded={isLoaded} />

      <MapView
        isLoaded={isLoaded}
        loadError={loadError}
        style={{
          borderRadius: 15,
        }}
        onLoad={(instance) => {
          setMaps(window.google.maps);
        }}
      >
        <TypedMarker
          position={{
            lat: 35.6976541,
            lng: -0.6337376,
          }}
        />

        <DrawDirection
          maps={maps}
          origin={{
            lat: 35.7279158,
            lng: -0.5875089,
          }}
          destination={{
            lat: 35.69856,
            lng: -0.618288,
          }}
        />
      </MapView>
    </Grid>
  );
}
