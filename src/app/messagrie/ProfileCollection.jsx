import React from "react";
import { useCollectionData } from "app/hooks/common/useCollectionData";
import UserAvatar from "app/fuse-layouts/shared-components/UserAvatar";
import { Badge, Tooltip, Typography } from "@material-ui/core";
import { useUserStateColor } from "app/hooks/useUserStateInfo";

function ProfileAvatar({ profile, onClick }) {
  const { stateInfo } = useUserStateColor(profile.statue);

  return (
    <div style={{ width: 56, height: 56, padding: 6 }}>
      <Tooltip title={profile.name}>
        <div style={{ position: "relative" }}>
          <UserAvatar name={profile.name} onClick={onClick} />
          <Badge
            style={{
              position: "absolute",
              bottom: "2px",
              right: "5px",
              backgroundColor: "#e76f51",
              width: 11,
              height: 11,
              border: "2px solid #FFF",
              borderRadius: 8,
              ...stateInfo,
            }}
          />
        </div>
      </Tooltip>
    </div>
  );
}

export default function ProfileCollection() {
  const { data: profiles, loading, metadata } = useCollectionData("profiles");

  return (
    <div>
      {loading && <Typography>Chargement ...</Typography>}
      {profiles.map((item, index) => (
        <ProfileAvatar key={index} profile={item} />
      ))}
    </div>
  );
}
