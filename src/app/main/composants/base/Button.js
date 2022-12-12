import React from "react";
import { default as BaseButton } from "@material-ui/core/Button";

export default function Button({ onClick, style, children }) {
  return (
    <BaseButton
      variant="contained"
      style={{
        width: "100%",
        backgroundColor: "#2a9d8f",
        boxShadow: "none",
        color: "#edf2f4",
        fontSize: 12,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}
