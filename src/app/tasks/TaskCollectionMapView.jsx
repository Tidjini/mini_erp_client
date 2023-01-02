import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { useLoadScript } from "@react-google-maps/api";
import DrawDirection from "app/composants.v2/map/DrawDirections";
import MapView from "app/composants.v2/map/MapView";
import TypedMarker from "app/composants.v2/map/Marker";
import useDirections from "app/hooks/useDirections";

import TaskMapInputs from "./TaskMapInputs";
import CollectionActions from "app/composants.v2/collection/CollectionActions";
import Action from "app/hooks/Action";
import { backcolors } from "app/composants.v2/constants";
import { useSelector } from "react-redux";
import { useGetCollection } from "app/hooks/useRequest";
import UtilisateurInfoWindow from "./UtilisateurInfoWindow";
//center for oran
const defaultCenter = {
  lat: 35.6976541,
  lng: -0.6337376,
};
const libs = ["places"];

export default function TaskCollectionMapView({ onSave, path }) {
  const [maps, setMaps] = React.useState();
  const [displayInfo, setDisplayInfo] = React.useState({
    display: false,
    position: {
      lat: 35.6976541,
      lng: -0.6337376,
    },
    user: {},
  });

  const user = useSelector(({ auth }) => auth.user.data);

  const { data: transporters, handleGet: getUserCollection } =
    useGetCollection("profiles");

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
    getUserCollection();
  }, [origin, destination]);

  const saveAction = new Action(
    "Sauvgarder",
    () => {
      if (origin && destination) {
        let distance = 0;
        let duration = 0;
        if (directions) {
          distance = directions.routes[0].legs[0].distance.value;
          duration = directions.routes[0].legs[0].duration.value;
        }

        onSave && onSave(origin, destination, distance, duration);
      }

      setCenter(defaultCenter);
      setOrigin(undefined);
      setDestination(undefined);
    },
    "cancel",
    {
      backgroundColor: backcolors.add,
    }
  );

  React.useEffect(() => {
    if (path) {
      setOrigin({
        address: path.origin_address,
        lat: path.origin_lat,
        lng: path.origin_lng,
      });
      setDestination({
        address: path.destination_address,
        lat: path.destination_lat,
        lng: path.destination_lng,
      });
    }
  }, [path]);

  return (
    <Grid
      item
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={12}
      style={{ paddingTop: 20 }}
    >
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
            originAddress={origin && origin.address}
            destinaitonAddress={destination && destination.address}
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
            innerHeight: "100%",
          }}
          onLoad={(instance) => {
            setMaps(window.google.maps);
          }}
        >
          {(user.is_admin || user.is_staff) &&
            transporters &&
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
                  onClick={(e) => {
                    setDisplayInfo({
                      display: true,
                      position: {
                        lat: latitude,
                        lng: longitude,
                      },
                      user: { ...t },
                    });
                  }}
                />
              );
            })}

          {!user.is_admin && !user.is_staff && user.localisation && (
            <TypedMarker
              position={{
                lat: user.localisation.latitude,
                lng: user.localisation.longitude,
              }}
            />
          )}

          <DrawDirection
            maps={maps}
            origin={origin}
            destination={destination}
            onClick={(event) => {}}
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
            {(user.is_admin || user.is_staff) && (
              <CollectionActions actions={[saveAction]} />
            )}
          </div>

          <UtilisateurInfoWindow
            information={displayInfo}
            onCloseClick={(e) => {
              setDisplayInfo({
                ...displayInfo,
                display: false,
              });
            }}
          />
        </MapView>
      </Paper>
    </Grid>
  );
}