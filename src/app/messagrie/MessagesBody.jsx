import React from "react";

import ProfileCollection from "./ProfileCollection";
import useWindowSize from "app/hooks/useWindowSize";

export default function MessagesBody() {
  const { height } = useWindowSize();

  return (
    <div
      style={{
        height: height ? height - 64 : 10,
        width: 64,
      }}
    >
      <ProfileCollection />
    </div>
  );
}
