import React from "react";
import { Typography } from "@material-ui/core";

export default function TasksProgress(props) {
  const { label, progress } = props;
  return (
    <div
      style={{
        height: 10,
        width: "100%",
        borderRadius: 15,
        backgroundColor: "#DFF6F4",
      }}
    >
      <div
        style={{
          height: 10,
          width: progress + "%",
          borderRadius: 15,
          backgroundColor:
            progress < 10
              ? "#e63946"
              : progress < 20
              ? "#bb3e03"
              : progress < 30
              ? "#e76f51"
              : progress < 40
              ? "#f4a261"
              : progress < 50
              ? "#fca311"
              : progress < 60
              ? "#70D7CE"
              : progress < 70
              ? "#50CEC3"
              : "#06d6a0",
        }}
      ></div>
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: 10,
          alignSelf: "center",
          color:
            progress < 10
              ? "#e63946"
              : progress < 20
              ? "#bb3e03"
              : progress < 30
              ? "#e76f51"
              : progress < 40
              ? "#f4a261"
              : progress < 50
              ? "#fca311"
              : progress < 60
              ? "#70D7CE"
              : progress < 70
              ? "#50CEC3"
              : "#06d6a0",
        }}
      >
        {label}
      </Typography>
    </div>
  );
}
