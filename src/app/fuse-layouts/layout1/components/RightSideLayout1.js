import React from "react";
import QuickPanel from "app/fuse-layouts/shared-components/quickPanel/QuickPanel";

import MessagesPanel from "app/messagrie/MessagesPanel";

function RightSideLayout1(props) {
  return (
    <React.Fragment>
      <QuickPanel />
      <MessagesPanel />
    </React.Fragment>
  );
}

export default RightSideLayout1;
