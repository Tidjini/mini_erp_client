import apiService from "app/services/infrabitumService/ApiService";

export const PRODUIT_COLLECTION = "[PRODUCTION-PROCESS] PRODUIT_COLLECTION";
export const LOADING = "[PRODUCTION-PROCESS] LOADING";

export const ERROR = "[PRODUCTION-PROCESS] ERROR";

const LINK = "production/produits";

export function dispatchLoading(dispatch, loading) {
  dispatch({
    type: LOADING,
    payload: loading,
  });
}

export function getProduitCollection(page = 1, filters = {}) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getCollection(page, filters);
      dispatch({
        type: PRODUIT_COLLECTION,
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

export function setLoading(loading) {
  return {
    type: LOADING,
    payload: loading,
  };
}
