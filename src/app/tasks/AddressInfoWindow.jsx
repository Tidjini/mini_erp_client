import React from "react";
import Typography from "@material-ui/core/Typography";
import { InfoWindow } from "@react-google-maps/api";

export default function AddressInfoWindow({ information, onCloseClick }) {
  const { display, address, type, position } = information;

  const onLoad = (infoBox) => {
    //console.log("infoBox: ", infoBox);
  };

  return (
    display && (
      <InfoWindow
        onLoad={onLoad}
        position={position}
        onCloseClick={onCloseClick}
        options={{ height: 300 }}
      >
        <div
          style={{
            padding: 5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={
              type === 1
                ? "assets/images/maps/start.svg"
                : "assets/images/maps/end.svg"
            }
            style={{
              width: 14,
              height: 14,
              marginRight: 16,
              display: "block",
            }}
          />
          <Typography
            style={{
              padding: "5px 5px",
              fontWeight: "700",
            }}
          >
            {address}
          </Typography>
        </div>
      </InfoWindow>
    )
  );
}
