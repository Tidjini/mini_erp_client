import axios from "axios";
import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const DEMANDE_STATE = "[DASHBOARD] DEMANDE_STATE";
export const LOADING = "[PRODUCTION] LOADING";

export function demandeStatistics() {
  const req = axios.post(`${DATA_SERVICE_URL}demande_achat_statistics/`, {});

  return async (dispatch) => {
    return req
      .then((response) => {
        console.log(response);
        dispatch({
          type: DEMANDE_STATE,
          payload: response.data,
        });
      })
      .catch((exception) => {
        dispatch({
          type: DEMANDE_STATE,
          payload: exception,
        });
      });
  };
}
