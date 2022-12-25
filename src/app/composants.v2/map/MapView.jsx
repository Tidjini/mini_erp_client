import React from "react";

import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import mapStyles from "./styles";

const container = {
  minWidth: 100,
  minHeight: 300,
  width: "100%",
  height: "100%",
};

//center for oran
const center = {
  lat: 35.6976541,
  lng: -0.6337376,
};

export default function MapView(props) {
  const { style, children, onChangeDirection } = props;
  //   const { directions, handleChangeDirections: onChangeDirection } =
  //     useDirections();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const renderMap = () => {
    function onLoad(mapInstance) {
      if (onChangeDirection) {
        onChangeDirection({
          mapInstance: window.google.maps,
          origin: {
            lat: 35.7279158,
            lng: -0.5875089,
          },
          destination: {
            lat: 35.69856,
            lng: -0.618288,
          },
        });
      }
    }

    return (
      <Grid
        item
        xs={(style && style.xs) || 12}
        sm={(style && style.sm) || 12}
        md={(style && style.md) || 12}
        lg={(style && style.lg) || 12}
        xl={(style && style.xl) || 12}
        style={{ ...style }}
      >
        <GoogleMap
          mapContainerStyle={{ ...container, ...style }}
          center={center}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true,
          }}
          onLoad={onLoad}
          zoom={(style && style.zoom) || 12}
        >
          {children}
        </GoogleMap>
      </Grid>
    );
  };

  if (loadError) return <Typography>ERROR LOADIGN</Typography>;

  return isLoaded ? renderMap() : <Typography>Loading ...</Typography>;
}
