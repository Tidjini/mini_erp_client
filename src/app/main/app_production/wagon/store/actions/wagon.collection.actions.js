import apiService from "app/services/infrabitumService/ApiService";

export const WAGON_COLLECTION = "[PRODUCTION] WAGON_COLLECTION";
export const LOADING = "[PRODUCTION] LOADING";

export const ERROR = "[PRODUCTION] ERROR";

const LINK = "production/wagons";

export function dispatchLoading(dispatch, loading) {
  dispatch({
    type: LOADING,
    payload: loading,
  });
}

export function getWagonCollection(page = 1, filters = {}) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getCollection(page, filters);
      dispatch({
        type: WAGON_COLLECTION,
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
