import { Grid, Paper, Typography } from "@material-ui/core";
import { InfoBox, useLoadScript } from "@react-google-maps/api";
import DrawDirection from "app/composants.v2/map/DrawDirections";
import MapView from "app/composants.v2/map/MapView";
import TypedMarker from "app/composants.v2/map/Marker";
import useDirections from "app/hooks/useDirections";
import { map } from "lodash";
import React from "react";
import TaskMapInputs from "./TaskMapInputs";
import { transporters } from "./samples";
import CollectionActions from "app/composants.v2/collection/CollectionActions";
import Action from "app/hooks/Action";
import { backcolors } from "app/composants.v2/constants";
//center for oran
const defaultCenter = {
  lat: 35.6976541,
  lng: -0.6337376,
};
const libs = ["places"];

export default function TaskMapView({ onSave }) {
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
  const saveAction = new Action(
    "Sauvgarder",
    () => {
      if (origin && destination) onSave(origin, destination);

      setCenter(defaultCenter);
      setOrigin(undefined);
      setDestination(undefined);
    },
    "cancel",
    {
      backgroundColor: backcolors.add,
    }
  );
  return (
    <Grid item xl={6} lg={6} md={12} sm={12} xs={12} style={{ paddingTop: 20 }}>
      <Paper style={{ width: "100%", borderRadius: 15 }}>
        <Typography
          style={{
            padding: 20,
            fontSize: 18,
            fontWeight: "700",
            width: "100%",
            backgroundColor: "#26465350",
            borderRadius: "15px 15px 0 0",
          }}
        >
          Directions
        </Typography>
        <div
          style={{
            backgroundColor: "white",
            padding: "10px 20px 20px 15px",
          }}
        >
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
        </div>
        <MapView
          center={center}
          isLoaded={isLoaded}
          loadError={loadError}
          style={{
            borderRadius: "0px 0px 15px 15px",
          }}
          onLoad={(instance) => {
            setMaps(window.google.maps);
          }}
        >
          {transporters &&
            transporters.map((t, index) => {
              if (t.localisation === null) return;
              const { longitude, latitude } = t.localisation;
              return (
                <TypedMarker
                  key={index}
                  position={{
                    lat: latitude,
                    lng: longitude,
                  }}
                />
              );
            })}

          <DrawDirection
            maps={maps}
            origin={origin}
            destination={destination}
            onClick={(event) => {
              console.log(event);
            }}
            directions={directions}
          />
          <div
            style={{
              marginTop: 20,
              width: "100%",
              borderRadius: 10,
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <CollectionActions actions={[saveAction]} />
          </div>
        </MapView>
      </Paper>
    </Grid>
  );
}
