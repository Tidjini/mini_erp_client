import apiService from "app/services/infrabitumService/ApiService";

export const LOADING = "[PRODUCTION] LOADING";
export const ERROR = "[PRODUCTION] ERROR";
export const GET_WAGON = "[PRODUCTION] GET_WAGON";

const LINK = "production/wagons";

const defaultItem = {
  numero: "",
  nbr_piece_wagon_actuel: 0,
  plein: false,
  operation_actuel: null,
  produit: null,
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

export function getWagon(id) {
  apiService.init(LINK, "numero");

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getItem(id);
      dispatch({
        type: GET_WAGON,
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

export function setNewWagon() {
  return {
    type: GET_WAGON,
    payload: defaultItem,
  };
}

export function saveWagon(item) {
  if (item.fin === "") {
    item = { ...item, fin: null };
  }
  if (item.debut === "") {
    item = { ...item, debut: null };
  }
  apiService.init(LINK, "numero");

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.saveItem(item);
      dispatch({
        type: GET_WAGON,
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

export function deleteWagon(item) {
  apiService.init(LINK, "numero");

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.deleteItem(item);
      dispatch({
        type: GET_WAGON,
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
