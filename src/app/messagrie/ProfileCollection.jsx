import React from "react";
import useWindowSize from "app/hooks/useWindowSize";

export default function ProfileCollection() {
  const { height } = useWindowSize();
  return (
    <div
      style={{
        height: height,
        width: 64,

        backgroundColor: "gray",
      }}
    >
      ProfilesList
    </div>
  );
}
