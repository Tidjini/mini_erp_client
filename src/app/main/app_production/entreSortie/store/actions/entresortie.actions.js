import apiService from "app/services/infrabitumService/ApiService";

export const LOADING = "[PRODUCTION] LOADING";
export const ERROR = "[PRODUCTION] ERROR";
export const GET_ENTRE_SORTIE = "[PRODUCTION] GET_ENTRE_SORTIE";
export const ENTRE_SORTIE_COLLECTION = "[PRODUCTION] ENTRE_SORTIE_COLLECTION";

const LINK = "production/entres_sorties";

const defaultItem = {
  id: "",
  produit_object: null,
  nbr_piece: 0.0,
  nbr_palette: 0.0,
  date: "",
  type: "SORTIE",
  auto: false,
  observation: "SORTIE : causée par....",
  produit: "",
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

export function getEntreSortie(id) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getItem(id);
      dispatch({
        type: GET_ENTRE_SORTIE,
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

export function setNew() {
  return {
    type: GET_ENTRE_SORTIE,
    payload: defaultItem,
  };
}

export function save(item) {
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
        type: GET_ENTRE_SORTIE,
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

export function onDelete(item) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.deleteItem(item);
      dispatch({
        type: GET_ENTRE_SORTIE,
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

export function getEntreSortieCollection(page = 1, filters = {}) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getCollection(page, filters);
      dispatch({
        type: ENTRE_SORTIE_COLLECTION,
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
