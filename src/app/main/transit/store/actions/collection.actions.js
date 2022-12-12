import apiService from "app/services/infrabitumService/ApiService";

export const OPERATION_COLLECTION = "[TRANSIT] OPERATION_COLLECTION";
export const LOADING = "[TRANSIT] LOADING";

export const ERROR = "[TRANSIT] ERROR";

export function dispatchLoading(dispatch, loading) {
  dispatch({
    type: LOADING,
    payload: loading,
  });
}

export function getOperationCollection(page = 1, filters = {}) {
  apiService.init("transit/operations");

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getCollection(page, filters);
      dispatch({
        type: OPERATION_COLLECTION,
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
