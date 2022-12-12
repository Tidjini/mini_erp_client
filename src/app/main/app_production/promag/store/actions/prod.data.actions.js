import axios from "axios";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";
import { getWagonCollection } from "./prod.wagon.actions";

export const BACKUP = "[PRODUCTION] BACKUP";
export const ERROR = "[PRODUCTION-PROCESS] ERROR";
export const LOADING = "[PRODUCTION-PROCESS] LOADING";

export const backup = () => {
  const req = axios.post(`${DATA_SERVICE_URL}production/backup`);
  return (dispatch) => {
    req
      .then((response) => {
        dispatch({
          type: BACKUP,
          payload: true,
        });
      })
      .catch((error) => {});
  };
};

export const restore = () => {
  const req = axios.post(`${DATA_SERVICE_URL}production/restore`);
  return (dispatch) => {
    req
      .then((response) => {
        dispatch(getWagonCollection());
      })
      .catch((error) => {});
  };
};
