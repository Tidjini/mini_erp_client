import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import { toggleMessagesPanel } from "./store/actions";
import reducer from "./store/reducers";
import withReducer from "app/store/withReducer";
import ProfileAvatar from "./ProfileAvatar";

function MessagesHeader() {
  const dispatch = useDispatch();
  const selected = useSelector(({ messagerie }) => messagerie.profile.selected);

  return (
    <div
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#003049",
        color: "white",
        position: "fixed",
        top: 0,
        width: 340,
        zIndex: 5,
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
        {!Boolean(selected) && <Icon>message</Icon>}
        {selected && <ProfileAvatar profile={selected} onClick={(e) => {}} />}
      </div>

      {!Boolean(selected) && (
        <Typography
          style={{
            width: "100%",
            fontSize: 18,
          }}
        >
          Messagerie
        </Typography>
      )}
      {selected && (
        <Typography
          style={{
            width: "100%",
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          {selected.name}
        </Typography>
      )}
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

export default withReducer("messagerie", reducer)(MessagesHeader);
