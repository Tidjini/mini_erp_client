import React from "react";

import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import mapStyles from "./styles";
import useDirections from "app/hooks/useDirections";

const container = {
  minWidth: 100,
  minHeight: 100,
  width: "100%",
  height: "100%",
};

const center = {
  lat: 35.6976541,
  lng: -0.6337376,
};

export default function MapView(props) {
  const { style } = props;
  const { directions, handleChangeDirections: onChangeDirection } =
    useDirections();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const renderMap = () => {
    function onLoad(mapInstance) {
      // console.log(mapInstance);
      // console.log(window);

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
          zoom={10}
        ></GoogleMap>
      </Grid>
    );
  };

  if (loadError) return <Typography>ERROR LOADIGN</Typography>;

  return isLoaded ? renderMap() : <Typography>Loading ...</Typography>;
}
