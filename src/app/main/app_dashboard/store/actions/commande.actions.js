import axios from "axios";
import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const COMMANDE_STATE = "[DASHBOARD] COMMANDE_STATE";
export const LOADING = "[PRODUCTION] LOADING";

export function commandeStatistics() {
  const req = axios.post(`${DATA_SERVICE_URL}commande_achat_statistics/`, {});

  return async (dispatch) => {
    return req
      .then((response) => {
        console.log(response);
        dispatch({
          type: COMMANDE_STATE,
          payload: response.data,
        });
      })
      .catch((exception) => {
        dispatch({
          type: COMMANDE_STATE,
          payload: exception,
        });
      });
  };
}
