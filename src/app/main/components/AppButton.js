import { Button, Icon } from "@material-ui/core";
import React from "react";
import { Colors } from "../Config";

export default function AppButton(props) {
  const { outline, width, label, icon } = props;
  return (
    <Button
      style={{
        background: outline ? "transparent" : Colors.setting_section_active,
        height: 46,
        width: width,
        textTransform: "none",
        borderRadius: 5,
        border: outline ? "1px solid #EA7C69" : "",
        color: "#EA7C69",
        margin: 20,
      }}
    >
      {icon && (
        <Icon
          style={{
            fontWeight: "normal",
            marginRight: 10,
            color: "#EA7C69",
          }}
        >
          {icon}
        </Icon>
      )}
      {label}
    </Button>
  );
}
