import { Icon } from "@material-ui/core";
import React from "react";
import { Colors } from "../Config";

export default function AppStaticCard(props) {
  const { title, nombre, icon, iconColor, progress } = props;
  return (
    <div
      style={{
        minHeight: 100,
        width: "90%",
        background: Colors.secondary,
        borderRadius: 5,
        padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Icon
          style={{
            background: "#f1f1f110",
            borderRadius: 6,
            textAlign: "center",
            width: 42,
            height: 42,
            fontSize: 28,
            display: "flex",
            justifycontent: "center",
            alignItems: "center",
            color: iconColor,
          }}
        >
          {icon}
        </Icon>

        <h4
          style={{
            fontSize: 14,
            marginLeft: 5,
            fontWeight: "400",
            color:
              progress > 0 ? Colors.static_positive : Colors.static_negative,
          }}
        >
          {progress > 0 ? "+" + progress + "%" : progress + "%"}
        </h4>
        <Icon
          style={{
            background: "#f1f1f110",
            borderRadius: 12,
            textAlign: "center",
            width: 24,
            height: 24,
            fontSize: 16,
            display: "flex",
            justifycontent: "center",
            alignItems: "center",
            color:
              progress > 0 ? Colors.static_positive : Colors.static_negative,
            marginLeft: 5,
            fontWeight: "800",
          }}
        >
          {progress > 0 ? "arrow_upward" : "arrow_downward"}
        </Icon>
      </div>

      <h1 style={{ margin: "10px 5px", fontSize: 28 }}>{nombre}</h1>
      <h6
        style={{
          margin: "8px 5px",
          fontSize: 16,
          fontWeight: "normal",
          color: Colors.subtitle,
        }}
      >
        {title}
      </h6>
    </div>
  );
}
