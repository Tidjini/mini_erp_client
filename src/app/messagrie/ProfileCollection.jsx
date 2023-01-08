import React from "react";
import useWindowSize from "app/hooks/useWindowSize";
import { useCollectionData } from "app/hooks/common/useCollectionData";
import UserAvatar from "app/fuse-layouts/shared-components/UserAvatar";

export default function ProfileCollection() {
  const { height } = useWindowSize();

  const {
    data: profiles,
    loading,
    metadata,
    handleGetData: onGet,
  } = useCollectionData("profiles");
  return (
    <div
      style={{
        height: height,
        width: 64,

        backgroundColor: "gray",
      }}
    >
      {profiles.map((item, index) => (
        <UserAvatar name={item.name} key={index} />
      ))}
    </div>
  );
}
