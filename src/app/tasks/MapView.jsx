import React from "react";
import {
  GoogleMap,
  useLoadScript,
  InfoBox,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Typography } from "@material-ui/core";

const container = {
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
export default function MapView() {
  const [res, setRes] = React.useState();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY, // ,
    // ...otherOptions
  });

  const renderMap = () => {
    function onLoad(mapInstance) {}

    return (
      <GoogleMap
        mapContainerStyle={container}
        center={center}
        options={options(window.google)}
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
        <InfoBox
          onLoad={(infoBox) => {
            console.log("infoBox: ", infoBox);
          }}
          position={center}
        >
          <div style={{ backgroundColor: "yellow", opacity: 1, padding: 12 }}>
            <div style={{ fontSize: 16, fontColor: `#08233B` }}>
              Hello, World!
            </div>
          </div>
        </InfoBox>

        <Marker
          onLoad={(marker) => {
            console.log("marker: ", marker);
          }}
          position={{
            lat: 35.7279158,
            lng: -0.5875089,
          }}
        />
        <Marker
          onLoad={(marker) => {
            console.log("marker: ", marker);
          }}
          position={{
            lat: 35.69856,
            lng: -0.618288,
          }}
        />

        <DirectionsService
          // required
          options={{
            // eslint-disable-line react-perf/jsx-no-new-object-as-prop
            destination: {
              lat: 35.7279158,
              lng: -0.5875089,
            },
            origin: {
              lat: 35.69856,
              lng: -0.618288,
            },
            travelMode: "DRIVING",
          }}
          // required
          callback={(response) => {
            console.log(response);

            if (response !== null) {
              if (response.status === "OK") {
                setRes({ ...response });
              } else {
                console.log("response: ", response);
              }
            }
          }}
          // optional
          onLoad={(directionsService) => {
            console.log(
              "DirectionsService onLoad directionsService: ",
              directionsService
            );
          }}
          // optional
          onUnmount={(directionsService) => {
            console.log(
              "DirectionsService onUnmount directionsService: ",
              directionsService
            );
          }}
        >
          {res !== null && (
            <DirectionsRenderer
              // required
              options={{
                // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                directions: res,
              }}
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
            />
          )}
        </DirectionsService>
      </GoogleMap>
    );
  };

  if (loadError) return <Typography>ERROR LOADIGN</Typography>;

  return isLoaded ? renderMap() : <Typography>Loading ...</Typography>;
}
