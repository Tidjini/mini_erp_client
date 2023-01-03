import React from "react";
import Typography from "@material-ui/core/Typography";
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
import { useCollectionData } from "app/hooks/common/useCollectionData";
import { Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import Loader from "app/composants.v2/Loader";
import AddressInfoWindow from "./AddressInfoWindow";

//center for oran
const defaultCenter = {
  lat: 35.6976541,
  lng: -0.6337376,
};
const libs = ["places"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TaskCollectionMapView({ onSave }) {
  const [path, setPath] = React.useState();
  const [openCollection, setOpenCollection] = React.useState(false);

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

  const [displayAddress, setDisplayAddress] = React.useState({
    display: false,
    position: {
      lat: 35.6976541,
      lng: -0.6337376,
    },
    address: "",
    type: 1,
  });
  const user = useSelector(({ auth }) => auth.user.data);

  const {
    data: tasks,
    loading,
    metadata,
    handleGetData: onGet,
  } = useCollectionData("task-localisations");

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
            onClick={(event) => {
              setOpenCollection(true);
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
            onClick={(e) => {
              setDisplayInfo({
                display: true,
                position: {
                  lat: user.localisation.latitude,
                  lng: user.localisation.longitude,
                },
                user: { ...user },
              });
            }}
          />
        )}

        <DrawDirection
          maps={maps}
          origin={origin}
          destination={destination}
          onClick={(event) => {}}
          directions={directions}
          onOriginClick={(e) => {
            setDisplayAddress({
              display: true,
              type: 1,
              address: origin.address,
              position: {
                lat: origin.lat,
                lng: origin.lng,
              },
            });
          }}
          onDestinationClick={(e) => {
            setDisplayAddress({
              display: true,
              type: 2,
              address: destination.address,
              position: {
                lat: destination.lat,
                lng: destination.lng,
              },
            });
          }}
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
        <AddressInfoWindow
          information={displayAddress}
          onCloseClick={(e) => {
            setDisplayAddress({
              ...displayAddress,
              display: false,
            });
          }}
        />
      </MapView>
      <Dialog
        open={openCollection}
        TransitionComponent={Transition}
        keepMounted
        onClose={(e) => {
          setOpenCollection(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography
            style={{ color: "#001d3d", fontWeight: "600", fontSize: 18 }}
          >
            Tâches d'Aujourd'hui
          </Typography>
        </DialogTitle>
        <DialogContent
          style={{
            backgroundColor: "#8d99ae01",
            boxShadow: "1px 3px 3px 3px #9E9E9E20",
            borderRadius: 15,
            padding: 20,
          }}
        >
          <Loader isLoading={loading} />

          {tasks.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 32,
                border: "1px solid gray",
                width: "auto",
              }}
            >
              <img
                src="assets/images/empty-folder.png"
                style={{
                  width: 56,
                  height: 56,
                }}
              />
              <Typography style={{ color: "#4a4e69", fontSize: 11 }}>
                Liste de Directions Est Vide
              </Typography>
            </div>
          )}
          {tasks.map((item, index) => {
            return (
              <TaskLocationItemV2
                key={index}
                data={item}
                onClick={(event) => {
                  setPath(item);
                }}
                onDelete={(event) => {
                  //onDeleteLocalisation(index);
                }}
              />
            );
          })}
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
