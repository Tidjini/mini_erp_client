import React from "react";
import useBreakPoints from "app/hooks/useBreakPoints";
import Button from "../Button";
import {
  Icon,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
} from "@material-ui/core";
import { margins } from "../constants";

export default function CollectionActions(props) {
  const { actions } = props;
  const size = useBreakPoints();
  const [display, setDisplay] = React.useState("flex");
  const [actionMenu, setActionMenu] = React.useState(null);

  React.useEffect(() => {
    function changeDisplay() {
      switch (size) {
        case "xs":
          if (actions && actions.length > 1) setDisplay("none");
          break;

        default:
          setDisplay("flex");
          setActionMenu(null);
          break;
      }
    }
    changeDisplay();
  }, [size]);

  const onActionsClicked = (event) => {
    setActionMenu(event.currentTarget);
  };
  const onCloseMenu = (event) => {
    setActionMenu(null);
  };

  return (
    <React.Fragment>
      <div style={{ display: display, alignItems: "center" }}>
        {actions &&
          actions.map((item, id) => (
            <Button
              key={id}
              style={{ ...item.style, marginRight: margins.default }}
              onClick={item.callback}
              content={item.label}
            >
              {item.label}
            </Button>
          ))}
      </div>
      <div
        style={{
          display: display === "none" ? "flex" : "none",
          alignItems: "center",
        }}
      >
        <Button
          style={{ backgroundColor: "#4a4e69" }}
          onClick={onActionsClicked}
        >
          Edition
        </Button>
        <Popover
          open={Boolean(actionMenu)}
          anchorEl={actionMenu}
          onClose={onCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          style={{ marginTop: 4 }}
        >
          <React.Fragment>
            {actions &&
              actions.map((item, id) => (
                <MenuItem
                  key={id}
                  style={{ ...item.style, color: "white" }}
                  onClick={item.callback}
                >
                  <ListItemIcon>
                    <Icon style={{ color: "white" }}>{item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText>{item.label}</ListItemText>
                </MenuItem>
              ))}
          </React.Fragment>
        </Popover>
      </div>
    </React.Fragment>
  );
}
