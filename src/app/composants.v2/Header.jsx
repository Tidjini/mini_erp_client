import React from "react";

import { Typography } from "@material-ui/core";

import useBreakPoints from "app/hooks/useBreakPoints";
import { margins } from "./constants";

export default function Header(props) {
  const { icon, title } = props;
  const size = useBreakPoints();

  const [iconSize, setIconSize] = React.useState({
    width: 36,
    height: 36,
  });
  const [titleSize, setTitleSize] = React.useState(16);

  React.useEffect(() => {
    function changeDisplaySize() {
      switch (size) {
        case "xs":
        case "sm":
          setIconSize({ width: 36, height: 36 });
          setTitleSize(16);
          break;

        default:
          setIconSize({ width: 56, height: 56 });
          setTitleSize(21);
          break;
      }
    }
    changeDisplaySize();
  }, [size]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={icon || "assets/images/logos/logo.svg"}
        style={{ ...iconSize }}
      />

      <Typography
        style={{
          fontSize: titleSize,
          marginLeft: margins.default,
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>
    </div>
  );
}
