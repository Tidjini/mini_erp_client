import apiService from "app/services/infrabitumService/ApiService";

export const EMPLOYE_COLLECTION = "[PRODUCTION-PROCESS] EMPLOYE_COLLECTION";
export const LOADING = "[PRODUCTION-PROCESS] LOADING";

export const ERROR = "[PRODUCTION-PROCESS] ERROR";

const LINK = "gestion/employees";

export function dispatchLoading(dispatch, loading) {
  dispatch({
    type: LOADING,
    payload: loading,
  });
}

export function getEmployeCollection(page = 1, filters = {}) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getCollection(page, filters);
      dispatch({
        type: EMPLOYE_COLLECTION,
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
