import React from "react";

import { DirectionsRenderer, Polyline } from "@react-google-maps/api";
import TypedMarker from "./Marker";
export default function DrawDirection({
  maps,
  origin,
  destination,
  onClick,
  onOriginClick,
  onDestinationClick,
  onChange,
  directions,
}) {
  return (
    <div>
      {directions && (
        <div>
          <DirectionsRenderer
            options={{
              polylineOptions: {
                strokeOpacity: 0,
                strokeWeight: 0,
              },
              markerOptions: {
                opacity: 0,
              },
            }}
            directions={directions}
          />
          <Polyline
            path={directions.routes[0].overview_path}
            geodesic={true}
            options={{
              strokeColor: "#1D68C3",
              strokeOpacity: 0.8,
              strokeWeight: 4,
              clickable: true,
            }}
            onClick={onClick}
          />
        </div>
      )}

      {origin && (
        <TypedMarker
          position={origin}
          type={0}
          onClick={onOriginClick}
        ></TypedMarker>
      )}
      {destination && (
        <TypedMarker
          position={destination}
          type={1}
          onClick={onDestinationClick}
        />
      )}
    </div>
  );
}
