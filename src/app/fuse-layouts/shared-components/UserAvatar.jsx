import React from "react";
import Avatar from "@material-ui/core/Avatar";

export default function UserAvatar(props) {
  const { picture, name, onClick } = props;

  if (picture)
    return (
      <Avatar
        className=""
        alt={name ? name : "user"}
        src={picture}
        onClick={onClick}
      />
    );
  return (
    <Avatar className="" onClick={onClick}>
      {name[0].toUpperCase()}
    </Avatar>
  );
}
