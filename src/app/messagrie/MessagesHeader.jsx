import React from "react";
import { useDispatch } from "react-redux";

import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import { toggleMessagesPanel } from "./store/actions";

export default function MessagesHeader() {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#003049",
        color: "white",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px 20px",
        }}
      >
        <Icon>message</Icon>
      </div>

      {/* <img src="assets/images/man.png" /> */}

      <Typography
        style={{
          width: "100%",
          fontSize: 18,
        }}
      >
        Messagerie
      </Typography>
      <IconButton
        style={{
          width: 48,
          height: 48,
          color: "white",
        }}
        onClick={(event) => {
          dispatch(toggleMessagesPanel());
        }}
      >
        <Icon>close</Icon>
      </IconButton>
    </div>
  );
}