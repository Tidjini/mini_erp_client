import React from "react";

export default function UtilisateurInfoWindow({ information }) {
  const { display, user, position, onCloseClick } = displayInfo;
  const { name } = user;

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
                backgroundColor: "#2a9d8f20",
                color: "#2a9d8f",
                fontSize: 11,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              ACTIVE
            </Typography>
          </div>
        </div>
      </InfoWindow>
    )
  );
}
