import MapView from "app/composants.v2/map/MapView";
import TypedMarker from "app/composants.v2/map/Marker";
import useDirections from "app/hooks/useDirections";
import React from "react";

export default function TaskMapView() {
  const { directions, handleChangeDirections: onChangeDirection } =
    useDirections();

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
        console.log(window.google.maps);
      }}
    >
      <TypedMarker
        position={{
          lat: 35.6976541,
          lng: -0.6337376,
        }}
      />
      <TypedMarker
        type={0}
        position={{
          lat: 35.7279158,
          lng: -0.5875089,
        }}
      />
      <TypedMarker
        type={1}
        position={{
          lat: 35.69856,
          lng: -0.618288,
        }}
      />
    </MapView>
  );
}
