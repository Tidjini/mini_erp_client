import React from "react";
import Avatar from "@material-ui/core/Avatar";

export default function UserAvatar(props) {
  const { picture, name } = props;

  if (picture)
    return <Avatar className="" alt={name ? name : "user"} src={picture} />;
  return <Avatar className="">{name[0].toUpperCase()}</Avatar>;
}
