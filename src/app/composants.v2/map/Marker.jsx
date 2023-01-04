import React from "react";
import { Marker } from "@react-google-maps/api";

export default function TypedMarker({ position, type, onClick, state }) {
  const getIcon = (type) => {
    switch (type) {
      default:
        if (state === "a") return "/assets/images/maps/car_active.svg";

        if (state === "n") return "/assets/images/maps/car_busy.svg";

        return "/assets/images/maps/car_inactive.svg";
      case 0:
        return "/assets/images/maps/start.svg";
      case 1:
        return "/assets/images/maps/end.svg";
    }
  };
  return (
    <Marker
      position={{ ...position }}
      onClick={onClick}
      icon={{
        url: getIcon(type),
        scaledSize: new window.google.maps.Size(36, 36),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(16, 16),
      }}
    ></Marker>
  );
}
