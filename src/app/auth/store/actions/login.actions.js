import { setUserData } from "./user.actions";
import authService from "app/services/AuthService";
import * as Actions from "app/store/actions";
import { showMessage } from "app/store/actions/fuse";
import * as AppActions from "app/store/actions";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export function submitLogin({ username, password }) {
  console.log("LOGIN", process.env.REACT_APP_PORT);
  return (dispatch) =>
    authService
      .signIn({ username, password })
      .then((user) => {
        dispatch(setUserData(user));
        return dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch(
          AppActions.showMessage({
            message: "empty_fields_error",
            variant: "error",
            anchorOrigin: {
              vertical: "center", //top bottom
              horizontal: "right", //left center right
            },
            autoHideDuration: 2000,
          })
        );

        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
}
