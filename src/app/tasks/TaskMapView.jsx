import { Grid, Paper, Typography } from "@material-ui/core";
import { InfoBox, InfoWindow, useLoadScript } from "@react-google-maps/api";
import DrawDirection from "app/composants.v2/map/DrawDirections";
import MapView from "app/composants.v2/map/MapView";
import TypedMarker from "app/composants.v2/map/Marker";
import useDirections from "app/hooks/useDirections";
import React from "react";
import TaskMapInputs from "./TaskMapInputs";
import CollectionActions from "app/composants.v2/collection/CollectionActions";
import Action from "app/hooks/Action";
import { backcolors } from "app/composants.v2/constants";
import { useSelector } from "react-redux";
import { useGetCollection } from "app/hooks/useRequest";
//center for oran
const defaultCenter = {
  lat: 35.6976541,
  lng: -0.6337376,
};
const libs = ["places"];

export default function TaskMapView({ onSave, path }) {
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

        onSave(origin, destination, distance, duration);
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
  const onLoad = (infoBox) => {
    console.log("infoBox: ", infoBox);
  };
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

          {displayInfo && displayInfo.display && (
            <InfoWindow
              onLoad={onLoad}
              position={displayInfo.position}
              onCloseClick={(e) => {
                setDisplayInfo({
                  ...displayInfo,
                  display: false,
                });
              }}
              options={{ height: 300 }}
            >
              <div
                style={{
                  padding: 5,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="assets/images/man.png"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    marginRight: 14,
                  }}
                />
                <div>
                  <Typography
                    style={{
                      padding: "5px 5px",
                      fontWeight: "700",
                    }}
                  >
                    {displayInfo.user.name}
                  </Typography>
                  <Typography
                    style={{
                      padding: "5px 20px",
                      borderRadius: 15,
                      backgroundColor: "#2a9d8f20",
                      color: "#2a9d8f",
                      fontSize: 11,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    ACTIVE
                  </Typography>
                </div>
              </div>
            </InfoWindow>
          )}
        </MapView>
      </Paper>
    </Grid>
  );
}
