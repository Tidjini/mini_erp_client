import axios from "axios";
import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const PRODUCTION_STATE = "[DASHBOARD] PRODUCTION_STATE";
export const LOADING = "[PRODUCTION] LOADING";

export function productionStatistics() {
  const req = axios.post(`${DATA_SERVICE_URL}production_statistics/`, {});

  return async (dispatch) => {
    return req
      .then((response) => {
        console.log(response);
        dispatch({
          type: PRODUCTION_STATE,
          payload: response.data,
        });
      })
      .catch((exception) => {
        dispatch({
          type: PRODUCTION_STATE,
          payload: exception,
        });
      });
  };
}
