import React from "react";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";

const container = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

// const options = {
//   zoomControlOptions: {
//     position: new window.google.maps().ControlPosition.RIGHT_CENTER,
//   },
// };
export default function MapView() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBTFjZHNvGlyoPoYwefs1sAfa6hYPIsALw">
      <GoogleMap
        mapContainerStyle={container}
        center={center}
        zoom={10}
      ></GoogleMap>
    </LoadScript>
  );
}
