import axios from "axios";
import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const DEVIS_STATE = "[DASHBOARD] DEVIS_STATE";
export const LOADING = "[PRODUCTION] LOADING";

export function devisStatistics() {
  const req = axios.post(`${DATA_SERVICE_URL}devis_achat_statistics/`, {});

  return async (dispatch) => {
    return req
      .then((response) => {
        dispatch({
          type: DEVIS_STATE,
          payload: response.data,
        });
      })
      .catch((exception) => {
        dispatch({
          type: DEVIS_STATE,
          payload: exception,
        });
      });
  };
}
