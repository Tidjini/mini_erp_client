import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { useLoadScript } from "@react-google-maps/api";
import DrawDirection from "app/composants.v2/map/DrawDirections";
import MapView from "app/composants.v2/map/MapView";
import TypedMarker from "app/composants.v2/map/Marker";
import useDirections from "app/hooks/useDirections";

import { useSelector } from "react-redux";
import { useGetCollection } from "app/hooks/useRequest";
import UtilisateurInfoWindow from "./UtilisateurInfoWindow";
import useWindowSize from "app/hooks/useWindowSize";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import TaskLocationItemV2 from "./TaskLocationItem.v2";
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
    <Grid
      item
      container
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={12}
      justify="center"
    >
      <Grid item xl={6} style={{ position: "absolute", zIndex: 5 }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            margin: 10,
            boxShadow: "1px 5px 5px #9E9E9E20",
            borderRadius: 58,
          }}
        >
          <Typography
            style={{
              padding: "15px 25px",
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Tâches Directions / Localisation
          </Typography>
          <IconButton
            style={{
              backgroundColor: "#2a9d8f",
              borderRadius: "0 58px 58px 0",
              margin: 10,
              padding: 10,
            }}
          >
            <Icon style={{ color: "white" }}>list_alt</Icon>
          </IconButton>
        </div>
      </Grid>

      <MapView
        center={center}
        isLoaded={isLoaded}
        loadError={loadError}
        style={{
          borderRadius: "0px 0px 15px 15px",
          height: height - 68,
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
      <Grid
        item
        container
        spacing={1}
        style={{
          alignItems: "flex-start",
          backgroundColor: "#8d99ae01",
          boxShadow: "1px 3px 3px 3px #9E9E9E20",
          borderRadius: 15,
          padding: "30px 20px",
        }}
        xl={6}
        lg={6}
        md={12}
        sm={12}
        xs={12}
      >
        {/* {tasks.map((item, index) => {
          return (
            <TaskLocationItemV2
              key={index}
              data={item}
              onClick={(event) => {
                //setSelectedPath(item);
              }}
              onDelete={(event) => {
                //onDeleteLocalisation(index);
              }}
            />
          );
        })} */}
      </Grid>
    </Grid>
  );
}
