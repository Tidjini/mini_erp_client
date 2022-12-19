import React from "react";

import { Typography } from "@material-ui/core";

import useBreakPoints from "app/hooks/useBreakPoints";

export default function Header(props) {
  const { icon, title } = props;

  const size = useBreakPoints();

  return (
    <div style={{ display: "flex", alignItems: "center", margin: 16 }}>
      <img
        src={icon || "assets/images/logos/logo.svg"}
        style={{ height: 36, width: 36 }}
      />

      <Typography style={{ fontSize: 16, marginLeft: 14, fontWeight: "600" }}>
        {title}
      </Typography>
      <Typography>{"w:" + size + ", h:" + size}</Typography>
    </div>
  );
}
