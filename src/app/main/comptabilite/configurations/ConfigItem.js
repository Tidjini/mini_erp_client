import React, { useState } from "react";
import { Grid, Typography, Divider, Button } from "@material-ui/core";

const styles = {
  item: {
    margin: "32px 15px 0 15px",
    padding: 20,
    alignItems: "center",
    boxShadow: "1px 3px 3px #9E9E9E20",
    borderRadius: 20,
  },
  item_title: {
    fontSize: 24,
    fontWeight: "600",
  },
  item_description: { fontSize: 16, color: "#8D8F9D", fontWeight: "600" },
  item_icon: {
    width: 48,
    height: 48,
  },
  item_main: {
    margin: "15px 0",
    fontSize: 32,
    fontWeight: "600",
  },
  item_second: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8D8F9D",
  },
  item_button: {
    boxShadow: "none",
    color: "#EFF1FF",
    textTransform: "none",
    margin: "20px 0 10px 0",
    height: 32,
    width: "100%",
  },
};

export default function ConfigItem(props) {
  const [itemBorderColor, setItemBorderColor] = useState("#a8dadc50");
  const [itemButtonStyle, setItemButtonStyle] = useState({
    border: "1px solid #0a9396",
    background: "white",
    color: "#0a9396",
  });

  const { title, description, main, icon, second, third, onEdition } = props;

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      onMouseEnter={(e) => setItemBorderColor("#a8dadc80")}
      onMouseLeave={(e) => setItemBorderColor("#a8dadc20")}
    >
      <div style={{ ...styles.item, border: "1px solid " + itemBorderColor }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Typography style={styles.item_title}>{title}</Typography>
            <Typography style={styles.item_description}>
              {description}
            </Typography>
          </div>
          <img
            alt="state"
            src={"assets/images/compta/" + icon}
            style={styles.item_icon}
          />
        </div>

        <Button
          variant="contained"
          style={{ ...styles.item_button, ...itemButtonStyle }}
          onMouseEnter={(e) =>
            setItemButtonStyle({
              border: "1px solid #0a9396",
              background: "#0a9396",
              color: "white",
            })
          }
          onMouseLeave={(e) =>
            setItemButtonStyle({
              border: "1px solid #0a9396",
              background: "white",
              color: "#0a9396",
            })
          }
          onClick={onEdition}
        >
          Voir la liste
        </Button>
      </div>
    </Grid>
  );
}
