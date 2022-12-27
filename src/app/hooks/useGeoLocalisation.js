import React from "react";
import { useSelector } from "react-redux";
import { ApiService } from "app/services/ApiService";

export const useGeoLocalisation = () => {
  const [position, setPosition] = React.useState();

  const user = useSelector(({ auth }) => auth.user.data);
  const apiService = new ApiService("localisations", "user");

  React.useEffect(() => {
    function handleGeoPosition() {
      // navigator.permissions.query({ name: "geolocation" }).then((res) => {
      //   console.log(res);
      // });
      if ("geolocation" in navigator) {
        console.log("Available");

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
            .then((res) => {
              console.log(res);
            })
            .catch((exception) => {
              console.log(exception);
            });

          // console.log("Latitude is :", position.coords.latitude);
          // console.log("Longitude is :", position.coords.longitude);
        });
      } else {
        console.log("Not Available");
      }
    }
    // Add event listener
    const interval = setInterval(handleGeoPosition, 1 * 60 * 1000);
    // Call handler right away so state gets updated with initial window size
    handleGeoPosition();
    // Remove event listener on cleanup
    return () => clearInterval(interval);
  }, [user]);
};