import React from "react";
import { useDispatch } from "react-redux";

import Typography from "@material-ui/core/Typography";

import ProfileAvatar from "./ProfileAvatar";
import { useCollectionData } from "app/hooks/common/useCollectionData";
import { selectProfile } from "./store/actions";

export default function ProfileCollection() {
  const dispatch = useDispatch();
  const { data: profiles, loading } = useCollectionData("profiles");

  return (
    <div>
      {loading && <Typography>Chargement ...</Typography>}
      {profiles.map((profile, index) => (
        <ProfileAvatar
          key={index}
          profile={profile}
          onClick={(e) => {
            dispatch(selectProfile(profile));
          }}
        />
      ))}
    </div>
  );
}
