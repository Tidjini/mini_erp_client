import React from "react";

export default function useDirections() {
  const [directions, setDirections] = React.useState(null);

  const handleChangeDirections = ({
    mapInstance,
    origin,
    destination,
    travelMode = "DRIVING",
  }) => {
    //if origin or destination not define return
    if (!Boolean(origin) || !Boolean(destination)) return;
    setDirections(null);

    new mapInstance.DirectionsService().route(
      {
        origin,
        destination,
        travelMode,
        provideRouteAlternatives: true,
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === mapInstance.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
          setDirections(null);
        }
      }
    );
  };

  return { directions, handleChangeDirections };
}
