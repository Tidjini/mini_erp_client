import React from "react";

export default function PhaseOpration({ value }) {
  return (
    <div
      style={{
        fontWeight: "bold",
        fontSize: 12,
        borderRadius: 5,
        padding: "5px 15px",
        textAlign: "center",
        background:
          value === "ATTENTE"
            ? "#002C3D"
            : value === "EMPILEMENT"
            ? "#005F73"
            : value === "ENFOURNEMENT"
            ? "#CA6702"
            : value === "DEFOURNEMENT"
            ? "#BB3E03"
            : "#EE9B00",
        color: "white",
        textTransform: "uppercase",
        maxWidth: 150,
      }}
    >
      {value}
    </div>
  );
}
