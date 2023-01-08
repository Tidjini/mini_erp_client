import React from "react";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

export default function MessagesHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
        }}
      >
        <Icon>message</Icon>
        {/* <img src="assets/images/man.png" /> */}
      </div>
      <Typography
        style={{
          width: "100%",
          fontSize: 18,
        }}
      >
        Team Chats
      </Typography>
      <IconButton
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
        }}
      >
        <Icon>close</Icon>
      </IconButton>
    </div>
  );
}
