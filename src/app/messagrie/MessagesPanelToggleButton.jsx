import React from "react";
import { useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import * as Actions from "./store/actions";

export default function MessagesPanelToggleButton() {
  const dispatch = useDispatch();

  return (
    <IconButton
      className="w-64 h-64"
      onClick={(e) => {
        dispatch(Actions.toggleMessagesPanel());
      }}
    >
      <Icon>message</Icon>
    </IconButton>
  );
}
