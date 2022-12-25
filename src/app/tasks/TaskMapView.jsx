import { Grid } from "@material-ui/core";
import { useLoadScript } from "@react-google-maps/api";
import DrawDirection from "app/composants.v2/map/DrawDirections";
import MapView from "app/composants.v2/map/MapView";
import TypedMarker from "app/composants.v2/map/Marker";
import useDirections from "app/hooks/useDirections";
import { map } from "lodash";
import React from "react";
import TaskMapInputs from "./TaskMapInputs";
//center for oran
const defaultCenter = {
  lat: 35.6976541,
  lng: -0.6337376,
};
const libs = ["places"];
export default function TaskMapView() {
  const [maps, setMaps] = React.useState();

  const [center, setCenter] = React.useState(defaultCenter);
  const [origin, setOrigin] = React.useState();
  const [destination, setDestination] = React.useState();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libs,
  });

  const { directions, handleChangeDirections: onChangeDirection } =
    useDirections();

  React.useEffect(() => {
    onChangeDirection({ mapInstance: maps, origin, destination });
  }, [origin, destination]);

  return (
    <Grid item container spacing={1} xl={6} lg={6} md={12} sm={12} xs={12}>
      <TaskMapInputs
        isLoaded={isLoaded}
        onOriginChanged={(depart) => {
          setCenter({ ...depart });
          setOrigin({ ...depart });
        }}
        onDestinationChanged={(destination) => {
          setCenter({ ...destination });
          setDestination({ ...destination });
        }}
      />

      <MapView
        center={center}
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
          origin={origin}
          destination={destination}
          onClick={(event) => {
            console.log(event);
          }}
          directions={directions}
        />
      </MapView>
    </Grid>
  );
}
