import React from "react";
import { useCollectionData } from "app/hooks/common/useCollectionData";
import UserAvatar from "app/fuse-layouts/shared-components/UserAvatar";

export default function ProfileCollection() {
  const {
    data: profiles,
    loading,
    metadata,
    handleGetData: onGet,
  } = useCollectionData("profiles");
  return (
    <div>
      {profiles.map((item, index) => (
        <div style={{ width: 56, height: 56, padding: 6 }} key={index}>
          <UserAvatar name={item.name} />
        </div>
      ))}
    </div>
  );
}
