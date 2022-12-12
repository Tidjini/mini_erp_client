import {
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import React, { useState } from "react";
import clsx from "clsx";

export default function AppTableHeaderMenu(props) {
  const { classes, numSelected } = props;
  const [selectedItemsMenu, setSelectedItemsMenu] = useState(null);

  function openSelectedItemsMenu(event) {
    setSelectedItemsMenu(event.currentTarget);
  }

  function closeSelectedItemsMenu() {
    setSelectedItemsMenu(null);
  }
  return (
    <div>
      {numSelected > 0 && (
        <div
          className={clsx(
            "flex items-center justify-center absolute w-64 top-0 left-0 ml-68 h-64 z-10",
            classes.actionsButtonWrapper
          )}
        >
          <IconButton
            aria-owns={selectedItemsMenu ? "selectedItemsMenu" : null}
            aria-haspopup="true"
            onClick={openSelectedItemsMenu}
          >
            <Icon>more_horiz</Icon>
          </IconButton>
          <Menu
            id="selectedItemsMenu"
            anchorEl={selectedItemsMenu}
            open={Boolean(selectedItemsMenu)}
            onClose={closeSelectedItemsMenu}
          >
            <MenuList>
              <MenuItem
                onClick={() => {
                  closeSelectedItemsMenu();
                }}
              >
                <ListItemIcon className="min-w-40">
                  <Icon>delete</Icon>
                </ListItemIcon>
                <ListItemText primary="Remove" />
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      )}
    </div>
  );
}
