import React from "react";

import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import mapStyles from "./styles";

const container = {
  minWidth: 100,
  minHeight: 100,
  width: "100%",
  height: "100%",
};

const center = {
  lat: 35.6976541,
  lng: -0.6337376,
};

const options = (google) => {
  return {
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },
  };
};
export default function MapView(props) {
  const { style } = props;
  const [directions, setDirections] = React.useState();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  let directionsService;

  function changeDirections(maps, depart, arrive) {
    if (depart === null) return;
    if (arrive === null) return;

    directionsService = new maps.DirectionsService();
    const origin = {
      lat: depart.lat,
      lng: depart.lng,
    };
    const destination = {
      lat: arrive.lat,
      lng: arrive.lng,
    };
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          // setDistance(result.routes[0].legs[0].distance.text);
          // setDuration(result.routes[0].legs[0].duration.text);
          // setDistanceM(result.routes[0].legs[0].distance.value);
          // setDurationS(result.routes[0].legs[0].duration.value);
          // hideElements(form.max_poid, result.routes[0].legs[0].distance.value);

          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  const renderMap = () => {
    function onLoad(mapInstance) {
      // console.log(mapInstance);
      // console.log(window);
      changeDirections(
        window.google.maps,
        {
          lat: 35.7279158,
          lng: -0.5875089,
        },
        {
          lat: 35.69856,
          lng: -0.618288,
        }
      );
    }

    return (
      <Grid
        item
        xs={(style && style.xs) || 12}
        sm={(style && style.sm) || 12}
        md={(style && style.md) || 12}
        lg={(style && style.lg) || 12}
        xl={(style && style.xl) || 12}
        style={{ ...style }}
      >
        <GoogleMap
          mapContainerStyle={{ ...container, ...style }}
          center={center}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true,
          }}
          onLoad={onLoad}
          zoom={10}
          onBoundsChanged={() => {
            // console.log("onBoundsChanged changed");
          }}
          onCenterChanged={() => {
            // console.log("center changed");
          }}
          onClick={(event) => {
            // console.log("click", event);
          }}
          onDblClick={(event) => {
            // console.log("db click", event);
          }}
          onMouseMove={(e) => {
            // console.log("on Mouse Mouve", e);
          }}
          onMouseOut={(e) => {
            // console.log("on Mouse Out", e);
          }}
          onMouseOver={(e) => {
            // console.log("on Mouse Out", e);
          }}
        >
          {directions !== null && (
            <DirectionsRenderer
              directions={directions}
              // required
              // options={{
              //   // eslint-disable-line react-perf/jsx-no-new-object-as-prop
              //   directions: res,
              // }}
              // optional
              onLoad={(directionsRenderer) => {
                console.log(
                  "DirectionsRenderer onLoad directionsRenderer: ",
                  directionsRenderer
                );
              }}
              // optional
              onUnmount={(directionsRenderer) => {
                console.log(
                  "DirectionsRenderer onUnmount directionsRenderer: ",
                  directionsRenderer
                );
              }}
              options={{
                strokeColor: "#20BF55",
                strokeOpacity: 0.8,
                strokeWeight: 6,
                clickable: true,
              }}
            />
          )}
        </GoogleMap>
      </Grid>
    );
  };

  if (loadError) return <Typography>ERROR LOADIGN</Typography>;

  return isLoaded ? renderMap() : <Typography>Loading ...</Typography>;
}
