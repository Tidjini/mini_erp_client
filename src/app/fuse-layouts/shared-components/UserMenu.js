import React, { useState } from "react";
import {
  Avatar,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  Popover,
  MenuItem,
  Typography,
  Divider,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "app/auth/store/actions";
import { Link } from "react-router-dom";

import { generic } from "app/services/ApiService";

function UserMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const userData = useSelector(({ auth }) => auth.user.data);

  const [userMenu, setUserMenu] = useState(null);
  const [saveData, setSaveData] = useState(false);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = React.useCallback(() => {
    setUserMenu(null);
    if (saveData) {
      setSaveData(false);

      const { statue, id: pk } = userData;
      generic
        .patch("profile/update-state/", {
          statue,
          pk,
        })
        .then((res) => {})
        .catch((err) => {});
    }
  }, [saveData, userData]);

  const switchUserState = React.useCallback(
    (statue) => {
      dispatch(
        authActions.setUserData({
          ...userData,
          statue,
        })
      );
    },
    [dispatch, userData]
  );

  return (
    <React.Fragment>
      <Button className="h-64" onClick={userMenuClick} style={{}}>
        {user.data.picture_url ? (
          <Avatar className="" alt="user photo" src={user.data.picture_url} />
        ) : (
          <Avatar className="">{user.data.username[0]}</Avatar>
        )}

        <div className="hidden md:flex flex-col ml-12 items-start">
          <Typography component="span" className="normal-case font-600 flex">
            {user.data.username.toUpperCase()}
          </Typography>
          <Typography className="text-11 capitalize">
            {user.data.nom &&
              user.data.prenom &&
              user.data.nom.toUpperCase() + " " + user.data.prenom}
          </Typography>
        </div>

        <Icon className="text-16 ml-12 hidden sm:flex" variant="action">
          keyboard_arrow_down
        </Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-0",
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <React.Fragment>
            <MenuItem component={Link} to="/login">
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Login" />
            </MenuItem>
            <MenuItem component={Link} to="/register">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Register" />
            </MenuItem>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <MenuItem component={Link} to="/profiles/" onClick={userMenuClose}>
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Profiles" />
            </MenuItem>
            <MenuItem component={Link} to="/tasks/" onClick={userMenuClose}>
              <ListItemIcon className="min-w-40">
                <Icon>list_alt</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Tâches" />
            </MenuItem>
            {(userData.is_admin || userData.is_staff) && (
              <MenuItem
                component={Link}
                to="/tasks-map-view/"
                onClick={userMenuClose}
              >
                <ListItemIcon className="min-w-40">
                  <Icon>map</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Map View" />
              </MenuItem>
            )}

            <MenuItem
              onClick={(e) => {
                const state = userData.statue === "a" ? "n" : "a";
                switchUserState(state);
                setSaveData(true);
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon
                  style={{
                    color: userData.statue === "a" ? "#2a9d8f" : "#fb8500",
                  }}
                >
                  {userData.statue === "a" ? "check_circle" : "highlight_off"}
                </Icon>
              </ListItemIcon>
              <ListItemText
                style={{
                  color: userData.statue === "a" ? "#2a9d8f" : "#fb8500",
                  fontWeight: "700",
                }}
                className="pl-0"
                primary={
                  userData.statue === "a" ? "Disponible" : "Non Disponible"
                }
              />
            </MenuItem>

            <Divider />
            <MenuItem
              style={{
                backgroundColor: "#e63946",
              }}
              onClick={() => {
                dispatch(authActions.logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Déconnexion" />
            </MenuItem>
          </React.Fragment>
        )}
      </Popover>
    </React.Fragment>
  );
}

export default UserMenu;
