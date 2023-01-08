import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { FuseScrollbars } from "@fuse";
import { Drawer, Typography } from "@material-ui/core";

import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import withReducer from "app/store/withReducer";
import { makeStyles } from "@material-ui/styles";
import MessagesHeader from "./MessagesHeader";
import MessagesBody from "./MessagesBody";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 340,
  },
}));

function MessagesPanel() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const open = useSelector(({ chat }) => chat.panel.open);
  return (
    <Drawer
      open={open}
      classes={{ paper: classes.root }}
      anchor="right"
      onClose={(event) => {
        dispatch(Actions.toggleMessagesPanel());
      }}
    >
      <FuseScrollbars>
        <MessagesHeader />
        <MessagesBody />
      </FuseScrollbars>
    </Drawer>
  );
}

export default withReducer("chat", reducer)(MessagesPanel);
