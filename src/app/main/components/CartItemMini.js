import React, { useState } from "react";
import { FuseAnimate } from "@fuse";

export default function CartItemMini(props) {
  const { plat, ordered } = props;
  const [focused, setFocused] = useState(false);
  return (
    <FuseAnimate animation="transition.slideLeftIn" delay={200}>
      <div
        onMouseLeave={(event) => {
          setFocused(false);
        }}
        onMouseEnter={(event) => {
          setFocused(true);
        }}
        onClick={(event) => {}}
      >
        <div
          style={{
            cursor: "pointer",
            padding: "5px 20px",
          }}
        >
          <div style={{ display: "flex", marginBottom: 5 }}>
            <img
              src={plat.image}
              alt="student"
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                background: "#f1f1f1",
                padding: 3,
                zIndex: 1,
                position: "relative",
                cursor: "pointer",
              }}
            />
            <div style={{ height: "100%", flex: 1, margin: "auto 20px" }}>
              <h4
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                }}
              >
                {plat.label}
              </h4>
              <h4
                style={{
                  fontSize: 11,
                  fontWeight: "500",
                  color: "#EAEAEB",
                }}
              >
                {ordered + " dishes ordered"}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </FuseAnimate>
  );
}
