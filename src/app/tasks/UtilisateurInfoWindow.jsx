import React from "react";
import Typography from "@material-ui/core/Typography";
import { InfoWindow } from "@react-google-maps/api";

export default function UtilisateurInfoWindow({ information, onCloseClick }) {
  const { display, user, position } = information;
  const { name, statue } = user;

  const [stateInfo, setStateInfo] = React.useState({
    color: "#414962",
    backgroundColor: "#41496220",
    text: "Non Définie",
  });
  const onLoad = (infoBox) => {
    console.log("infoBox: ", infoBox);
  };

  React.useEffect(() => {
    switch (statue) {
      case "a":
        setStateInfo({
          color: "#2a9d8f",
          backgroundColor: "#2a9d8f20",
          text: "Active",
        });
        break;
      case "n":
        setStateInfo({
          color: "#e63946",
          backgroundColor: "#e6394620",
          text: "Non Active",
        });
        break;
      case "ab":
        setStateInfo({
          color: "#231942",
          backgroundColor: "#23194220",
          text: "Absent(e)",
        });
        break;

      default:
        setStateInfo({
          color: "#414962",
          backgroundColor: "#41496220",
          text: "Non Définie",
        });
        break;
    }
  }, [statue]);
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
