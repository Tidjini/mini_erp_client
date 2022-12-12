import axios from "axios";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const ETAT_PRODUCTION = "[PRODUCTION] ETAT PRODUCTION";
export const ETAT_PRODUCTION_ISSUE = "[PRODUCTION] ETAT PRODUCTION ISSUE";

export function etatGeneral(annee, mois) {
  const request = axios.post(
    `${DATA_SERVICE_URL}production/production_etat_general/`,
    {
      mois: mois,
      annee: annee,
    }
  );

  return async (dispatch) => {
    return request
      .then(function (res) {
        dispatch({
          type: ETAT_PRODUCTION,
        });
        return res.data;
      })
      .catch((exception) => {
        dispatch({
          type: ETAT_PRODUCTION_ISSUE,
          payload: exception,
        });
        return exception;
      });
  };
}

export function etatDetail(annee, mois, moisLabel) {
  const request = axios.post(
    `${DATA_SERVICE_URL}production/production_etat_detail/`,
    {
      mois: mois,
      annee: annee,
      moisLabel: moisLabel,
      a_ce_jour: false,
    }
  );

  return async (dispatch) => {
    return request
      .then(function (res) {
        dispatch({
          type: ETAT_PRODUCTION,
        });
        return res.data;
      })
      .catch((exception) => {
        dispatch({
          type: ETAT_PRODUCTION_ISSUE,
          payload: exception,
        });
        return exception;
      });
  };
}

export function etatGlobal(annee, mois, label) {
  const params = { annee: annee, mois: mois, label: label };
  let promises = [];
  promises.push(
    axios.post(`${DATA_SERVICE_URL}production/production_etat_detail/`, {
      annee: annee,
      mois: mois,
      label: label,
      a_ce_jour: false,
    })
  );
  promises.push(
    axios.post(`${DATA_SERVICE_URL}production/production_etat_general/`, {
      annee: annee,
      mois: mois,
    })
  );

  return (dispatch) => {
    Promise.all(promises)
      .then((response) => {
        try {
          window.open(`${URL}media/etat_production_general.pdf`, "_blank");
          window.open(`${URL}media/etat_production.pdf`, "_blank");
        } catch (error) {}
      })
      .catch((exception) => {});
  };
}

export const etatJournalier = (date) => {
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
  promises.push(
    axios.get(`${DATA_SERVICE_URL}production/production_anomalie_journalier/`, {
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
          window.open(
            `${URL}media/production_anomalie_journalier.pdf`,
            "_blank"
          );

          // .focus();
          // window.open(, "_blank");
          // .focus();
        } catch (error) {}
      })
      .catch((exception) => {});
  };
};
