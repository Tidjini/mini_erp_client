import React from "react";
import history from "@history";
import { Grid, Icon, IconButton, Typography } from "@material-ui/core";

export default function TaskLocationItemV2({ data, onDelete, onClick }) {
  const {
    origin_address,
    destination_address,
    humain_distance,
    humain_duration,
    receiver,
    task_label,
    task,
  } = data;

  return (
    <Grid
      container
      spacing={2}
      style={{
        width: "100%",
        backgroundColor: "#8d99ae01",
        borderColor: "#8d99ae20",
        borderWidth: 1,
        borderRadius: 15,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Grid item style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            padding: 5,
            display: "flex",
            alignItems: "center",
          }}
        >
          {receiver && (
            <img
              src="assets/images/man.png"
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                marginRight: 14,
              }}
            />
          )}
          <div>
            <Typography
              style={{
                padding: "5px 5px",
                fontWeight: "700",
                fontSize: 12,
              }}
            >
              {receiver}
            </Typography>
            <Typography
              style={{
                padding: "5px 5px",
                fontWeight: "300",
              }}
            >
              {"Tache : " + task_label}
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid item>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="assets/images/maps/start.svg"
            style={{
              width: 14,
              height: 14,
              marginRight: 16,
              display: "block",
            }}
          />
          <Typography style={{ fontWeight: "500", fontSize: 12 }}>
            {origin_address}
          </Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <img
            src="assets/images/maps/end.svg"
            style={{ width: 14, height: 14, marginRight: 16, display: "block" }}
          />
          <Typography style={{ fontWeight: "500", fontSize: 12 }}>
            {destination_address}
          </Typography>
        </div>
      </Grid>

      <Grid item style={{ display: "flex", alignItems: "center" }}>
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
            border: "2px solid #2a9d8f",
            color: "#2a9d8f",
            width: 48,
            height: 48,
          }}
          onClick={(event) => {
            event.stopPropagation();
            history.replace(`/task/${task}/`);
          }}
        >
          <Icon>edit</Icon>
        </IconButton>
      </Grid>
    </Grid>
  );
}
