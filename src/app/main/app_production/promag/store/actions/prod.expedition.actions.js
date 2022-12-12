import apiService from "app/services/infrabitumService/ApiService";

export const LOADING = "[PRODUCTION-PROCESS] LOADING";
export const ERROR = "[PRODUCTION-PROCESS] ERROR";
export const GET_EXPEDITION = "[PRODUCTION-PROCESS] GET_EXPEDITION";

const LINK = "production/expeditions";

const defaultItem = {
  id: "",
  produit: null,
  equipe: "",
  responsable: null,
  poste: "",
  date: "",
  nbr_piece: 0.0,
  nbr_palette: 0.0,
  produit_object: null,
  responsable_object: null,
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

export function getExpedition(id) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getItem(id);
      dispatch({
        type: GET_EXPEDITION,
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

export function setNewExpedition() {
  return {
    type: GET_EXPEDITION,
    payload: defaultItem,
  };
}

export function saveExpedition(item) {
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
        type: GET_EXPEDITION,
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

export function deleteExpedition(item) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.deleteItem(item);
      dispatch({
        type: GET_EXPEDITION,
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
