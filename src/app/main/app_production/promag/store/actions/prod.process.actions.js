import axios from "axios";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";
import { getWagonCollection } from "./prod.wagon.actions";

export const NEXT_OPERATION_SUCCESS =
  "[PRODUCTION-PROCESS] NEXT_OPERATION_SUCCESS";
export const PRODU_REPORT = "[PRODUCTION-PROCESS] PRODU_REPORT";
export const ERROR = "[PRODUCTION-PROCESS] ERROR";
export const LOADING = "[PRODUCTION-PROCESS] LOADING";

const EMPILEMENT = "EMPILEMENT";
const ENFOURNEMENT = "ENFOURNEMENT";
const DEFOURNEMENT = "DEFOURNEMENT";
const EMBALLAGE = "EMBALLAGE";
const ATTENTE = "ATTENTE";

export function dispatchLoading(dispatch, loading) {
  dispatch({
    type: LOADING,
    payload: loading,
  });
}
export function setLoading(loading) {
  return {
    type: LOADING,
    payload: loading,
  };
}

export const reporting = (date) => {
  setLoading(true);
  const params = { date: date };
  let promises = [];
  promises.push(
    axios.get(`${DATA_SERVICE_URL}production/production_journalier/`, {
      params,
    })
  );
  promises.push(
    axios.get(`${DATA_SERVICE_URL}production/production_arret_journalier/`, {
      params,
    })
  );

  return (dispatch) => {
    Promise.all(promises)
      .then((response) => {
        // dispatch({
        //   type: PRODU_REPORT,
        //   payload: true,
        // });
        try {
          window.open(`${URL}media/production_journalier.pdf`, "_blank");
          window.open(`${URL}media/production_arret_journalier.pdf`, "_blank");
          // .focus();
          // window.open(, "_blank");
          // .focus();
        } catch (error) {}
      })
      .catch((exception) => {
        setLoading(false);
      });
  };
};

export const goNextOperation = (
  produit,
  list,
  equipe,
  responsable,
  poste,
  operation,
  date
) => {
  setLoading(true);
  const data = {
    wagons: list,
    produit: produit,
    equipe: equipe,
    responsable: responsable,
    poste: poste,
    phase: operation,
    date: date,
  };

  const request = axios.post(`${DATA_SERVICE_URL}production/process/`, data);

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: NEXT_OPERATION_SUCCESS,
          payload: true,
        });
        dispatch(getWagonCollection());
      })
      .catch((exception) => {
        setLoading(false);
      });
  };
};

export const stockage = (list, equipe, responsable, poste, date) => {
  setLoading(true);
  const data = {
    wagons: list,
    equipe: equipe,
    responsable: responsable,
    poste: poste,
    date: date,
  };

  const request = axios.post(`${DATA_SERVICE_URL}production/stockage/`, data);

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: NEXT_OPERATION_SUCCESS,
          payload: true,
        });
        dispatch(getWagonCollection());
      })
      .catch((exception) => {
        setLoading(false);
      });
  };
};
