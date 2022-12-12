import apiService from "app/services/infrabitumService/ApiService";

const defaultItem = {
  id: "",
  details: [],
  numero: "",
  navire: "",
  gros: "",
  qte_theorique: 0.0,
  qte_effective: 0.0,
  qte_difference: 0.0,
  debut: "",
  fin: "",
  cloture: false,
  chauffeurs: 0,
  durre: 0,
  log: [],
  loading: false,
};

export const GET_OPERATION = "[TRANSIT] GET_OPERATION";

export const LOADING = "[TRANSIT] LOADING";

export const ERROR = "[TRANSIT] ERROR";

export function dispatchLoading(dispatch, loading) {
  dispatch({
    type: LOADING,
    payload: loading,
  });
}

export function getOperation(id) {
  apiService.init("transit/operations");

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getItem(id);
      dispatch({
        type: GET_OPERATION,
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

export function setNewOperaiton() {
  return {
    type: GET_OPERATION,
    payload: defaultItem,
  };
}

export function setLoading(loading) {
  return {
    type: LOADING,
    payload: loading,
  };
}

export function saveOperation(item) {
  if (item.fin === "") {
    item = { ...item, fin: null };
  }
  if (item.debut === "") {
    item = { ...item, debut: null };
  }
  apiService.init("transit/operations");

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.saveItem(item);
      dispatch({
        type: GET_OPERATION,
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

export function deleteOperation(item) {
  apiService.init("transit/operations");

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.deleteItem(item);
      dispatch({
        type: GET_OPERATION,
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
