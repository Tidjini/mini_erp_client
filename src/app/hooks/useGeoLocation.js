import React from "react";
import { useSelector } from "react-redux";
import { ApiService } from "app/services/ApiService";
import { useGetCollection } from "./useRequest";
const RADIUS = 6373.0;

function distance(pointA, pointB) {
  const toRadians = (degrees, precision = 10) => {
    return parseFloat(
      ((parseFloat(degrees) * Math.PI) / 180).toFixed(precision)
    );
  };

  const latA = toRadians(pointA.latitude);
  const lngA = toRadians(pointA.longitude);
  const latB = toRadians(pointB.latitude);
  const lngB = toRadians(pointB.longitude);

  const dLat = latB - latA;
  const dLng = lngB - lngA;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(latA) * Math.cos(latB) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return RADIUS * c;
}

export const useGeoLocation = () => {
  const [position, setPosition] = React.useState();

  const user = useSelector(({ auth }) => auth.user.data);
  const apiService = new ApiService("localisations", "user");

  React.useEffect(() => {
    function handleGeoPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (nPosition) {
          const { longitude, latitude } = nPosition.coords;
          console.log("distance in metters", position);

          if (position) {
            const d = distance(position, nPosition.coords);
            console.log("distance in metters", d * 1000);
          }
          setPosition({
            longitude: longitude,
            latitude: latitude,
          });

          const localisation = {
            user: user.id,
            longitude: longitude,
            latitude: latitude,
          };

          apiService
            .saveItem(localisation)
            .then((res) => {})
            .catch((exception) => {
              console.error(exception);
            });
        });
      } else {
      }
    }
    if (!Boolean(user.id)) return;
    // Add event listener
    const interval = setInterval(handleGeoPosition, 1 * 10 * 1000);
    // Call handler right away so state gets updated with initial window size
    handleGeoPosition();
    // Remove event listener on cleanup
    return () => clearInterval(interval);
  }, [user]);
};

export const useGetUserLoacalisations = () => {
  const { data, handleGet: getUserCollection } = useGetCollection("profiles");

  React.useEffect(() => {
    function refresh() {
      getUserCollection();
    }

    const interval = setInterval(refresh, 1 * 60 * 1000);
    refresh();
    return () => clearInterval(interval);
  }, []);

  return {
    data,
  };
};
