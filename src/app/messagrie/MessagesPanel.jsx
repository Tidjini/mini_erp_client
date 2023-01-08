import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { FuseScrollbars } from "@fuse";
import { Drawer, Typography } from "@material-ui/core";

import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import withReducer from "app/store/withReducer";

function MessagesPanel() {
  const dispatch = useDispatch();
  const { open } = useSelector(({ messagesPanel }) => messagesPanel.open);

  return (
    <Drawer
      open={open}
      style={{ width: 300 }}
      anchor="right"
      onClose={(event) => {
        dispatch(Actions.toggleMessagesPanel());
      }}
    >
      <FuseScrollbars>
        <Typography> Messages Pannel </Typography>
      </FuseScrollbars>
    </Drawer>
  );
}

export default withReducer("messagesPanel", reducer)(MessagesPanel);
