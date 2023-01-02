import React from "react";

export default function TaskLocationItemV2({ data, onDelete, onClick }) {
  const {
    origin_address,
    destination_address,
    humain_distance,
    humain_duration,
    user,
  } = data;

  const { name, statue } = user;
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#8d99ae01",
        borderColor: "#8d99ae20",
        borderWidth: 1,
        borderRadius: 15,
        padding: "10px",
        margin: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <img
            src="assets/images/maps/start.svg"
            style={{
              width: 14,
              height: 14,
              marginRight: 16,
              display: "block",
              marginBottom: 8,
            }}
          />
          <img
            src="assets/images/maps/end.svg"
            style={{ width: 14, height: 14, marginRight: 16, display: "block" }}
          />
        </div>

        <div>
          <Typography style={{ fontWeight: "500", fontSize: 12 }}>
            {origin_address}
          </Typography>
          <Typography style={{ fontWeight: "500", fontSize: 12 }}>
            {destination_address}
          </Typography>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <Typography
            style={{ fontWeight: "700", fontSize: 12, marginRight: 16 }}
          >
            {humain_distance}
          </Typography>
          <Typography
            style={{ fontWeight: "700", fontSize: 12, marginRight: 16 }}
          >
            {humain_duration}
          </Typography>
        </div>
        <IconButton
          style={{
            backgroundColor: "transparent",
            borderColor: "#da2c38",
            border: "#da2c38 solid 2px",
            color: "#da2c38",
            width: 48,
            height: 48,
          }}
          onClick={onDelete}
        >
          <Icon>delete</Icon>
        </IconButton>
      </div>
    </div>
  );
}
