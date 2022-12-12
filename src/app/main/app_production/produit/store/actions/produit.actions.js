import apiService from "app/services/infrabitumService/ApiService";

export const LOADING = "[PRODUCTION] LOADING";
export const ERROR = "[PRODUCTION] ERROR";
export const GET_PRODUIT = "[PRODUCTION] GET_PRODUIT";

const LINK = "production/produits";

const defaultItem = {
  id: "",
  designation: "",
  symbole: "",
  qte_initial: 0.0,
  qte_stock: 0.0,
  poids: 0.0,
  nbr_piece_wagon: 1,
  nbr_piece_palette_production: 1,
  nbr_piece_palette_emballage: 1,
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

export function getProduit(id) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getItem(id);
      dispatch({
        type: GET_PRODUIT,
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

export function setNewProduit() {
  return {
    type: GET_PRODUIT,
    payload: defaultItem,
  };
}

export function saveProduit(item) {
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
        type: GET_PRODUIT,
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

export function deleteProduit(item) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.deleteItem(item);
      dispatch({
        type: GET_PRODUIT,
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
