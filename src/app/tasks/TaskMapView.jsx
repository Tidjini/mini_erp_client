import DrawDirection from "app/composants.v2/map/DrawDirections";
import MapView from "app/composants.v2/map/MapView";
import TypedMarker from "app/composants.v2/map/Marker";
import React from "react";

export default function TaskMapView() {
  const [maps, setMaps] = React.useState();
  return (
    <MapView
      style={{
        borderRadius: 15,
        xl: 6,
        lg: 6,
        md: 12,
        sm: 12,
        xs: 12,
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
      {maps && (
        <DrawDirection
          maps={maps}
          origin={{
            lat: 35.7279158,
            lng: -0.5875089,
          }}
          destination={{
            lat: 35.69856,
            lng: -0.618288,
          }}
        />
      )}
    </MapView>
  );
}
