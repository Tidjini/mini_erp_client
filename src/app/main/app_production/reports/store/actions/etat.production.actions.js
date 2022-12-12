import apiService from "app/services/infrabitumService/ApiService";

export const ETAT_PRODUCTION_COLLECTION =
  "[ETAT_PRODUCTION] ETAT_PRODUCTION_COLLECTION";
export const LOADING = "[ETAT_PRODUCTION] LOADING";

export const ERROR = "[ETAT_PRODUCTION] ERROR";

const LINK = "production/production_report";

export function dispatchLoading(dispatch, loading) {
  dispatch({
    type: LOADING,
    payload: loading,
  });
}

export function getEtatProductionCollection(filters = {}) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getCollection(1, filters);

      dispatch({
        type: ETAT_PRODUCTION_COLLECTION,
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
