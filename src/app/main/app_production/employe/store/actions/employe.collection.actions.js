import apiService from "app/services/infrabitumService/ApiService";

export const EMPLOYE_COLLECTION = "[PRODUCTION] EMPLOYE_COLLECTION";
export const LOADING = "[PRODUCTION] LOADING";

export const ERROR = "[PRODUCTION] ERROR";

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
