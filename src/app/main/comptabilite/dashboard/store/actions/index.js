import axios from "axios";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const GET_EXERCICES = "[COMPTA_DASH] GET_EXERCICES";
export const GET_DOSSIERS = "[COMPTA_DASH] GET_DOSSIERS";
export const GET_ACTIVE_EXERCICE = "[COMPTA_DASH] GET_ACTIVE_EXERCICE";
export const GET_ACTIVE_DOSSIER = "[COMPTA_DASH] GET_ACTIVE_DOSSIER";
export const GET_BALANCE = "[COMPTA_DASH] GET_BALANCE";
export const GET_DASHBOARD = "[COMPTA_DASH] GET_DASHBOARD";
export const GET_COMPTE_TABLE = "[COMPTA_DASH] GET_COMPTE_TABLE";
export const ERROR = "[COMPTA_DASH] ERROR";
const EXERCICES_PATH = "exercices/";
const DASHBOARD_PATH = "dashboard/";
const COMPTE_TABLE_PATH = "ecriture_compte/";

export function getExercices() {
  const link = `${URL}latest_exercices/`;
  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        const { data } = response;
        dispatch({
          type: GET_EXERCICES,
          payload: data,
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

export function getDossiers() {
  const link = `${URL}latest_dossiers/`;
  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        const { data } = response;

        dispatch({
          type: GET_DOSSIERS,
          payload: data,
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

export function getActiveDossier() {
  const link = `${URL}get_active_dossier/`;

  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_ACTIVE_DOSSIER,
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

export function createDossier(dossier) {
  const link = `${DATA_SERVICE_URL}dossiers/create`;

  const request = axios.post(link, { ...dossier, activate: 1 });
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_ACTIVE_DOSSIER,
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

export function getBalance() {
  const link = `${URL}balance/`;

  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        const summary = response.data[response.data.length() - 1];
        const { credit, debit } = summary;
        const value = { solde_debit: 0.0, solde_credit: 0.0 };
        if (credit > debit) {
          value.solde_credit = credit - debit;
        }
        if (debit > credit) {
          value.solde_debit = debit - credit;
        }
        dispatch({
          type: GET_BALANCE,
          payload: value,
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

export function switchToExercice(exerciceId) {
  const link = `${URL}switch_to_exercice/?exercice_id=${exerciceId}`;

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
export function switchToFolder(databaseName) {
  const link = `${URL}switch_to_database/?database=${databaseName}`;

  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_ACTIVE_DOSSIER,
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

export function getDashboards() {
  const link = `${URL}dashbord_items/`;
  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_DASHBOARD,
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

export function emptyDashboard() {
  return {
    type: GET_DASHBOARD,
    payload: [],
  };
}

export function getComptesTable(compte, journal, page, search) {
  if (journal === undefined) journal = "";
  const link = `${URL}ecriture_compte/?num_compte=${compte}&journal=${journal}&page=${page}&search=${search}`;
  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_COMPTE_TABLE,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_COMPTE_TABLE,
          payload: {
            results: [],
            count: 0,
            previous: null,
            next: null,
            page_size: 10,
            summary: {
              debit: 0.0,
              credit: 0.0,
              solde: 0.0,
            },
          },
        });
      });
  };
}
