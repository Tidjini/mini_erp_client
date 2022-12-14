import React from "react";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import UserAvatar from "app/fuse-layouts/shared-components/UserAvatar";
import { useUserStateColor } from "app/hooks/useUserStateInfo";

export default function ProfileAvatar({ profile, onClick }) {
  const { stateInfo } = useUserStateColor(profile.statue);

  return (
    <div style={{ width: 56, height: 56, padding: 6, cursor: "pointer" }}>
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
