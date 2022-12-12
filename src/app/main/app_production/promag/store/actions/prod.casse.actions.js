import apiService from "app/services/infrabitumService/ApiService";

export const LOADING = "[PRODUCTION-PROCESS] LOADING";
export const ERROR = "[PRODUCTION-PROCESS] ERROR";
export const GET_CASSE = "[PRODUCTION-PROCESS] GET_CASSE";

const LINK = "production/casses";

const defaultItem = {
  id: "",
  produit: null,
  equipe: "",
  responsable: null,
  poste: "",
  type: "EXTERIEUR",
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

export function getCasse(id) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getItem(id);
      dispatch({
        type: GET_CASSE,
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

export function setNewCasse() {
  return {
    type: GET_CASSE,
    payload: defaultItem,
  };
}

export function saveCasse(item) {
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
        type: GET_CASSE,
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

export function deleteCasse(item) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.deleteItem(item);
      dispatch({
        type: GET_CASSE,
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
