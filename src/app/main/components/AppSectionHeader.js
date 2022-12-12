import { Button, Icon } from "@material-ui/core";
import React from "react";

export default function AppSectionHeader(props) {
  const { title, action, underline, style } = props;
  return (
    <div
      style={{
        ...style,
        display: "flex",
        marginLeft: 5,
        borderBottomWidth: underline ? 1 : 0,
        borderColor: "#A6B5BC50",
      }}
    >
      <h2
        style={{
          fontSize: 18,
          fontWeight: "600",
          padding: 20,
          flex: 1,
          paddingTop: 30,
        }}
      >
        {title}
      </h2>
      {action && (
        <Button
          style={{
            background: "transparent",
            height: 46,
            margin: 20,
            borderRadius: 5,
            textTransform: "none",
            border: "1px solid #A6B5BC50",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Icon
            style={{
              fontWeight: "normal",
              marginRight: 10,
            }}
          >
            {action.icon}
          </Icon>
          {action.label}
        </Button>
      )}
    </div>
  );
}
