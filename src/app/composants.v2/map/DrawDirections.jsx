import React, { useCallback, useState } from "react";

import {
  DirectionsRenderer,
  Marker,
  Polyline,
  Circle,
} from "@react-google-maps/api";
export default function DrawDirection({ directions, depart, destination }) {
  return (
    directions !== null && (
      <div>
        <DirectionsRenderer
          options={{
            polylineOptions: {
              stokeColor: "#20BF55",
              strokeOpacity: 0,
              strokeWeight: 0,
            },
            markerOptions: {
              icon: {
                scaledSize: new window.google.maps.Size(0, 0),
              },
            },
          }}
          directions={directions}
        />
        <Polyline
          path={directions.routes[0].overview_path}
          geodesic={true}
          options={{
            strokeColor: "#20BF55",
            strokeOpacity: 0.8,
            strokeWeight: 6,
            clickable: true,
          }}
        />
        <Marker
          key="depart"
          position={{ lat: depart.lat, lng: depart.lng }}
          icon={{
            url: "/assets/start.svg",
            scaledSize: new window.google.maps.Size(36, 36),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(18, 18),
          }}
        ></Marker>
        <Marker
          key="dest"
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "/assets/end.svg",
            scaledSize: new window.google.maps.Size(36, 36),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(18, 18),
          }}
        />
      </div>
    )
  );
}
