import React from "react";
import { useCollectionData } from "app/hooks/common/useCollectionData";
import UserAvatar from "app/fuse-layouts/shared-components/UserAvatar";
import { Badge } from "@material-ui/core";

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
          <div style={{ position: "relative" }}>
            <UserAvatar name={item.name} />
            <Badge
              style={{
                position: "absolute",
                bottom: "2px",
                right: "5px",
                backgroundColor: "red",
                width: 12,
                height: 12,
                borderRadius: 8,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
