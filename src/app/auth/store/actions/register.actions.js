import * as UserActions from "./user.actions";
import authService from "app/services/AuthService";

export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export function submitRegister({ username, nom, prenom, password, password2 }) {
  return (dispatch) =>
    authService
      .createUser({ username, nom, prenom, password, password2 })
      .then((user) => {
        dispatch(UserActions.setUserData(user));
        return dispatch({
          type: REGISTER_SUCCESS,
        });
      })
      .catch((error) => {
        return dispatch({
          type: REGISTER_ERROR,
          payload: error,
        });
      });
}
