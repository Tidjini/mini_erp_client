import { Typography } from "@material-ui/core";
import Button from "app/composants.v2/Button";
import { margins } from "app/composants.v2/constants";
import React from "react";

export default function TaskLocationdata({ data, onDelete }) {
  return (
    <div
      style={{
        backgroundColor: "#8d99ae01",
        boxShadow: "1px 3px 3px 3px #9E9E9E20",
        borderRadius: 15,
        padding: 20,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ display: "flex", aligndatas: "center" }}>
          <img
            src="assets/images/maps/start.svg"
            style={{ width: 36, height: 36, marginLeft: 16 }}
          />
          <div>
            <Typography style={{ fontWeight: "600" }}>Depart</Typography>
            <Typography>{data.origin_address}</Typography>
          </div>
        </div>
        <div style={{ display: "flex", aligndatas: "center" }}>
          <img
            src="assets/images/maps/end.svg"
            style={{ width: 36, height: 36, marginLeft: 16 }}
          />
          <div>
            <Typography style={{ fontWeight: "600" }}>Destination</Typography>
            <Typography>{data.destination_address}</Typography>
          </div>
        </div>
      </div>
      <Button
        style={{
          marginRight: margins.default,
          backgroundColor: "#fffcf2",
          borderWidth: 1,
          borderColor: "#da2c38",
        }}
        onClick={onDelete}
        content="Supprimer"
      ></Button>
    </div>
  );
}
