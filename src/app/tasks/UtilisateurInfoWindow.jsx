import React from "react";
import Typography from "@material-ui/core/Typography";
import { InfoWindow } from "@react-google-maps/api";
import useUserStateInfo from "app/hooks/useUserStateInfo";

export default function UtilisateurInfoWindow({ information, onCloseClick }) {
  const { display, user, position } = information;
  const { name, statue } = user;

  const { stateInfo } = useUserStateInfo(statue);
  const onLoad = (infoBox) => {
    console.log("infoBox: ", infoBox);
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
            src="assets/images/man.png"
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              marginRight: 14,
            }}
          />
          <div>
            <Typography
              style={{
                padding: "5px 5px",
                fontWeight: "700",
              }}
            >
              {name}
            </Typography>
            <Typography
              style={{
                padding: "5px 20px",
                borderRadius: 15,

                fontSize: 11,
                fontWeight: "700",
                textAlign: "center",
                ...stateInfo,
              }}
            >
              {stateInfo.text.toUpperCase()}
            </Typography>
          </div>
        </div>
      </InfoWindow>
    )
  );
}
