import apiService from "app/services/infrabitumService/ApiService";

export const LOADING = "[PRODUCTION] LOADING";
export const ERROR = "[PRODUCTION] ERROR";
export const GET_EMPLOYE = "[PRODUCTION] GET_EMPLOYE";

const LINK = "gestion/employees";

const defaultItem = {
  id: "",
  service_object: {},
  nom: "",
  prenom: "",
  poste: "",
  service: null,
  superviseur: null,
};
export function dispatchLoading(dispatch, loading) {
  dispatch({
    type: LOADING,
    payload: loading,
  });
}

export function setLoading(loading) {
  return {
    type: LOADING,
    payload: loading,
  };
}

export function getEmploye(id) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getItem(id);
      dispatch({
        type: GET_EMPLOYE,
        payload: data,
      });
    } catch (exception) {
      dispatch({
        type: ERROR,
        payload: exception,
      });
    }
    dispatchLoading(dispatch, false);
  };
}

export function setNewEmploye() {
  return {
    type: GET_EMPLOYE,
    payload: defaultItem,
  };
}

export function saveEmploye(item) {
  if (item.fin === "") {
    item = { ...item, fin: null };
  }
  if (item.debut === "") {
    item = { ...item, debut: null };
  }
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.saveItem(item);
      dispatch({
        type: GET_EMPLOYE,
        payload: data,
      });
    } catch (exception) {
      dispatch({
        type: ERROR,
        payload: exception,
      });
    }
    dispatchLoading(dispatch, false);
  };
}

export function deleteEmploye(item) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.deleteItem(item);
      dispatch({
        type: GET_EMPLOYE,
        payload: data,
      });
    } catch (exception) {
      dispatch({
        type: ERROR,
        payload: exception,
      });
    }
    dispatchLoading(dispatch, false);
  };
}
