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
  const { style, children, onLoad, isLoaded, loadError } = props;

  const renderMap = () => {
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
