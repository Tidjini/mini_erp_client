import { FuseScrollbars } from "@fuse";
import { Drawer, Typography } from "@material-ui/core";
import React from "react";

export default function MessagesPanel() {
  return (
    <Drawer
      open={true}
      style={{ width: 300 }}
      anchor="right"
      onClose={(event) => {
        console.log("on close Messages Drawer");
      }}
    >
      <FuseScrollbars>
        <Typography> Quick Pannel </Typography>
      </FuseScrollbars>
    </Drawer>
  );
}
