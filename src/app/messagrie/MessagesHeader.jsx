import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import { toggleMessagesPanel } from "./store/actions";
import reducer from "./store/reducers";
import withReducer from "app/store/withReducer";

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
        {selected && (
          <ProfileAvatar
            key={index}
            profile={profile}
            onClick={(e) => {
              dispatch(selectProfile(profile));
            }}
          />
        )}
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
