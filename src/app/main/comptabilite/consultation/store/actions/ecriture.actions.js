import axios from "axios";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const GET_MOUVEMENT_LIST = "[COMPTA_CONSULTATION] GET_MOUVEMENT_LIST";
export const GET_ECRITURE_LIST = "[COMPTA_CONSULTATION] GET_ECRITURE_LIST";
export const GET_ACTIVE_EXERCICE = "[COMPTA_CONSULTATION] GET_ACTIVE_EXERCICE";

export const ERROR = "[COMPTA_CONSULTATION] ERROR";
export const LOADING = "[COMPTA_CONSULTATION] LOADING";

export function getMouvementFromServer(filters) {
  const link = `${DATA_SERVICE_URL}ecritures/mouvement/list?search=${filters.search}`;
  const request = axios.post(link, filters);

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_MOUVEMENT_LIST,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR,
          payload: error,
        });
      });
  };
}

export function getEcritureFromServer(filters, page = 1) {
  const link = `${DATA_SERVICE_URL}ecritures/list?search=${filters.search}&page=${page}`;
  const request = axios.post(link, filters);

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_ECRITURE_LIST,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR,
          payload: error,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
      });
  };
}

export function setLoading(loading) {
  return {
    type: LOADING,
    payload: loading,
  };
}

export function getActiveExercice() {
  const link = `${URL}get_active_exercice/`;

  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_ACTIVE_EXERCICE,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ACTIVE_EXERCICE,
          payload: false,
        });
      });
  };
}
