import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const container = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
export default function MapView() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAq9mw2eu7Kxc3HZqE1H3ECbmpTmtl7ZEU">
      <GoogleMap
        mapContainerStyle={container}
        center={center}
        zoom={10}
      ></GoogleMap>
    </LoadScript>
  );
}
