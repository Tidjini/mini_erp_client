import apiService from "app/services/infrabitumService/ApiService";

export const LOADING = "[PRODUCTION] LOADING";
export const ERROR = "[PRODUCTION] ERROR";
export const GET_POSTE = "[PRODUCTION] GET_POSTE";

const LINK = "production/postes";

const defaultItem = {
  intitule: "",
  periode: "JOUR",
  nbr_heure: 12,
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

export function getPoste(id) {
  apiService.init(LINK, "intitule");

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getItem(id);
      dispatch({
        type: GET_POSTE,
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

export function setNewPoste() {
  return {
    type: GET_POSTE,
    payload: defaultItem,
  };
}

export function savePoste(item) {
  if (item.fin === "") {
    item = { ...item, fin: null };
  }
  if (item.debut === "") {
    item = { ...item, debut: null };
  }
  apiService.init(LINK, "intitule");

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.saveItem(item);
      dispatch({
        type: GET_POSTE,
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

export function deletePoste(item) {
  apiService.init(LINK, "intitule");

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.deleteItem(item);
      dispatch({
        type: GET_POSTE,
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
