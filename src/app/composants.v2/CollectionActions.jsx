import React from "react";
import useBreakPoints from "app/hooks/useBreakPoints";
import Button from "./Button";
import {
  Icon,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
} from "@material-ui/core";

export default function CollectionActions(props) {
  const size = useBreakPoints();
  const [display, setDisplay] = React.useState("flex");
  const [actionMenu, setActionMenu] = React.useState(null);
  const actions = [
    {
      label: "Add",
      style: {
        backgroundColor: "#2a9d8f",
      },
      callback: function (event) {
        console.log(event.target);
      },
      icon: "add",
    },
    {
      label: "Edit",
      style: {
        backgroundColor: "#219ebc",
      },
      callback: function (event) {
        console.log(event.target);
      },
      icon: "edit",
    },
    {
      label: "Delete",
      style: {
        backgroundColor: "#ef233c",
      },
      callback: function (event) {
        console.log(event.target);
      },
      icon: "delete",
    },
  ];
  React.useEffect(() => {
    function changeDisplay() {
      switch (size) {
        case "xs":
          if (actions.length > 1) setDisplay("none");
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
        {actions.map((item, id) => (
          <Button
            key={id}
            style={{ ...item.style }}
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
          content="Edition"
          style={{ backgroundColor: "#4a4e69" }}
          onClick={onActionsClicked}
        ></Button>
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
            {actions.map((item, id) => (
              <MenuItem style={{ ...item.style, color: "white" }}>
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
