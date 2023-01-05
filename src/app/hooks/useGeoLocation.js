import React from "react";
import { useSelector } from "react-redux";
import { ApiService } from "app/services/ApiService";
import { useGetCollection } from "./useRequest";

export const useGeoLocation = () => {
  const [position, setPosition] = React.useState();

  const user = useSelector(({ auth }) => auth.user.data);
  const apiService = new ApiService("localisations", "user");

  React.useEffect(() => {
    function handleGeoPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const { longitude, latitude } = position.coords;
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
    // Add event listener
    const interval = setInterval(handleGeoPosition, 1 * 5 * 1000);
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
