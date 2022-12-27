import history from "@history";
import { setInitialSettings } from "app/store/actions/fuse";
import _ from "@lodash";

import authService from "app/services/AuthService";

export const SET_USER_DATA = "[USER] SET DATA";
export const REMOVE_USER_DATA = "[USER] REMOVE DATA";
export const USER_LOGGED_OUT = "[USER] LOGGED OUT";

/**
 * Set User Data
 */
export function setUserData(user) {
  return (dispatch) => {
    //dispatch(setDefaultSettings(user.data.settings));
    //push roles
    const role = [];
    role.push("user");

    if (user.is_admin) {
      role.push("admin");
    }
    if (user.is_staff) {
      role.push("staff");
    }
    const data = {
      role: role,
      user: user,
    };
    dispatch({
      type: SET_USER_DATA,
      payload: data,
    });
  };
}

/**
 * Update User Settings
 */
export function updateUserSettings(settings) {
  return (dispatch, getState) => {
    const oldUser = getState().auth.user;
    const user = _.merge({}, oldUser, { data: { settings } });

    updateUserData(user);

    return dispatch(setUserData(user));
  };
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts) {
  return (dispatch, getState) => {
    const user = getState().auth.user;
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };

    updateUserData(newUser);

    return dispatch(setUserData(newUser));
  };
}

/**
 * Remove User Data
 */
export function removeUserData() {
  return {
    type: REMOVE_USER_DATA,
  };
}

/**
 * Logout
 */
export function logoutUser() {
  return (dispatch, getState) => {
    const user = getState().auth.user;
    if (!user.role || user.role.length === 0) {
      // is guest
      return null;
    }

    history.push({
      pathname: "/",
    });
    authService.logout();

    dispatch(setInitialSettings());

    dispatch({
      type: USER_LOGGED_OUT,
    });
  };
}

/**
 * Update User Data
 */
function updateUserData(user) {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }

  switch (user.from) {
    // case "firebase": {
    //   firebaseService
    //     .updateUserData(user)
    //     .then(() => {
    //       store.dispatch(
    //         Actions.showMessage({ message: "User data saved to firebase" })
    //       );
    //     })
    //     .catch((error) => {
    //       store.dispatch(Actions.showMessage({ message: error.message }));
    //     });
    //   break;
    // }
    // case "auth0": {
    //   auth0Service
    //     .updateUserData({
    //       settings: user.data.settings,
    //       shortcuts: user.data.shortcuts,
    //     })
    //     .then(() => {
    //       store.dispatch(
    //         Actions.showMessage({ message: "User data saved to auth0" })
    //       );
    //     })
    //     .catch((error) => {
    //       store.dispatch(Actions.showMessage({ message: error.message }));
    //     });
    //   break;
    // }
    default: {
      // jwtService
      //   .updateUserData(user)
      //   .then(() => {
      //     store.dispatch(
      //       Actions.showMessage({ message: "User data saved with api" })
      //     );
      //   })
      //   .catch((error) => {
      //     store.dispatch(Actions.showMessage({ message: error.message }));
      //   });
      break;
    }
  }
}
