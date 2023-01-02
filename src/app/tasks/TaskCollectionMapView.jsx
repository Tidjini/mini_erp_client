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
import { useSelector } from "react-redux";
import { useGetCollection } from "app/hooks/useRequest";
import UtilisateurInfoWindow from "./UtilisateurInfoWindow";
import useWindowSize from "app/hooks/useWindowSize";
import Icon from "@material-ui/core/Icon";
//center for oran
const defaultCenter = {
  lat: 35.6976541,
  lng: -0.6337376,
};
const libs = ["places"];

export default function TaskCollectionMapView({ onSave, path }) {
  const [maps, setMaps] = React.useState();
  const { width, height } = useWindowSize();
  const [pathInfo, setPathInfo] = React.useState({
    distance: "distance",
    duration: "duration",
  });
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

  React.useEffect(() => {
    function changePathInformation() {
      const { distance, duration } = directions.routes[0].legs[0];
      setPathInfo({ distance: distance.text, duration: duration.text });
    }
    directions && changePathInformation();
  }, [directions]);

  return (
    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
      <Paper
        style={{
          width: "100%",
          backgroundColor: "#edede950",
        }}
      >
        <Typography
          style={{
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: "600",
            width: "100%",
            backgroundColor: "#edede9",
          }}
        >
          Tâches Directions / Localisation
        </Typography>
        <div style={{ display: "flex", width: "100%", alignItems: "end" }}>
          <Grid
            item
            container
            style={{
              padding: "10px 20px 20px 15px",
            }}
            spacing={2}
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
              style={{
                xl: 6,
                lg: 6,
              }}
            />
            {pathInfo && (
              <Grid
                item
                container
                xl={4}
                lg={4}
                md={12}
                sm={12}
                xs={12}
                alignItems="flex-end"
                style={{ padding: "15px 0" }}
              >
                <Icon style={{ color: "#005f73", margin: "0 10px" }}>
                  watch_later
                </Icon>
                <Typography style={{ fontSize: 16, fontWeight: "700" }}>
                  {pathInfo.duration}
                </Typography>

                <Icon style={{ color: "#5e548e", margin: "0 10px" }}>
                  directions
                </Icon>
                <Typography style={{ fontSize: 16, fontWeight: "700" }}>
                  {pathInfo.distance}
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>

        <MapView
          center={center}
          isLoaded={isLoaded}
          loadError={loadError}
          style={{
            borderRadius: "0px 0px 15px 15px",
            height: height - 200,
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
