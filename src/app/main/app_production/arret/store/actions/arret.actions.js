import apiService from "app/services/infrabitumService/ApiService";

export const LOADING = "[PRODUCTION] LOADING";
export const ERROR = "[PRODUCTION] ERROR";
export const GET_ARRET = "[PRODUCTION] GET_ARRET";

const LINK = "production/arrets";

const defaultItem = {
  id: "",
  intervenant_object: null,
  date: "",
  zone: "",
  type_arret: "PRODUCTION",
  equipement: "",
  duree_minute: 0,
  heure_debut: "08:00",
  heure_fin: "08:05",
  poste: null,
  intervenant: null,
  type_intervention: "Nettoyage",
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

export function getArret(id) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getItem(id);
      dispatch({
        type: GET_ARRET,
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

export function setNewArret() {
  return {
    type: GET_ARRET,
    payload: defaultItem,
  };
}

export function initArret() {
  return (dispatch) => {
    dispatch({
      type: GET_ARRET,
      payload: defaultItem,
    });
  };
}
export function saveArret(item) {
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
        type: GET_ARRET,
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

export function deleteArret(item) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.deleteItem(item);
      dispatch({
        type: GET_ARRET,
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
