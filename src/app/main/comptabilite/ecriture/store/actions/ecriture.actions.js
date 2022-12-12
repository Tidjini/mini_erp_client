import axios from "axios";
import { showMessage } from "app/store/actions/fuse";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";
import _ from "@lodash";

export const ECRITURE_COLLECTION = "[ECRITURE] ECRITURE_COLLECTION";
export const ECRITURE_SAVE = "[ECRITURE] ECRITURE_SAVE";
export const ECRITURE_SUMMARY = "[ECRITURE] SUMMARY";

export const ERROR = "[ECRITURE] ERROR";
export const GET_ACTIVE_EXERCICE = "[ECRITURE] GET_ACTIVE_EXERCICE";
export const ADD_ECRITURE = "[ECRITURE] ADD_ECRITURE";
export const EDIT_ECRITURE = "[ECRITURE] EDIT_ECRITURE";
export const DELETE_ECRITURE = "[ECRITURE] DELETE_ECRITURE";
export const GET_DEFAULT_JOURNAL = "[ECRITURE] GET_DEFAULT_JOURNAL";
export const SAVE_ECRITURE_SERVER = "[ECRITURE] SAVE_ECRITURE_SERVER";
export const GET_ECRITURE_SERVER = "[ECRITURE] GET_ECRITURE_SERVER";
export const CLEAR_ECRITURE = "[ECRITURE] CLEAR_ECRITURE";

const ECRITURES_PATH = "ecritures/";

function buildLinkAction(collection) {
  let link = DATA_SERVICE_URL;
  let path = "";
  switch (collection) {
    case "ecritures":
      path = "save/?collection=ecritures";
      break;

    default:
      return undefined;
  }

  return link + path;
}

export function initCollection() {
  return {
    type: ECRITURE_COLLECTION,
    payload: { results: [], count: 0, next: null, previous: null },
  };
}
//get with search
export function getEcritureCollection(
  journal = "",
  periode = "",
  dossier = "",
  annee = "",
  page = 1,
  search = ""
) {
  const link = `${DATA_SERVICE_URL}ecritures/?journal=${journal}&periode=${periode}&page=${page}&search=${search}`;

  if (link === undefined) {
    return {
      type: ERROR,
      payload: "votre lien de collection est éroné",
    };
  }

  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: ECRITURE_COLLECTION,
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

export function getEcritureSummary(
  journal = "",
  periode = "",
  dossier = "",
  annee = ""
) {
  const link = `${URL}ecriture_summary/?journal=${journal}&periode=${periode}`;

  if (link === undefined) {
    return {
      type: ERROR,
      payload: "votre lien de collection est éroné",
    };
  }

  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: ECRITURE_SUMMARY,
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

export function save(collection, item) {
  let request = null;
  let link = buildLinkAction(collection);
  if (link === undefined)
    return {
      type: ERROR,
      payload: "votre lien de collection est éroné",
    };
  else {
    //post or put create this function in server to just save new data if exist or not
    request = axios.post(link, item);
  }

  let action = "add";
  if (item.id !== "" && item.id !== undefined && item.id !== null) {
    action = "edit";
  }

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: ECRITURE_SAVE,
          payload: response.data,
          action: action,
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

export function saveEcriture(item) {
  if (item.num_ligne == 0) {
    return (dispatch) =>
      dispatch({
        type: ADD_ECRITURE,
        payload: item,
      });
  } else {
    return (dispatch) =>
      dispatch({
        type: EDIT_ECRITURE,
        payload: item,
      });
  }
}

export function deleteEcriture(item) {
  return (dispatch) =>
    dispatch({
      type: DELETE_ECRITURE,
      payload: item,
    });
}

// export function setEditItem(item) {
//   return {
//     type: CONFIG_EDIT_ITEM,
//     payload: item,
//   };
// }

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

export function getDefaultJournal() {
  const link = `${DATA_SERVICE_URL}journal/default`;

  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_DEFAULT_JOURNAL,
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

export function saveEcrituresToServer(ecritures, ecritures_to_delete) {
  const deleteLink = `${DATA_SERVICE_URL}ecritures/delete_group`;
  const saveLink = `${DATA_SERVICE_URL}save_ecritures`;

  return (dispatch) => {
    const to_delete = _.remove(ecritures_to_delete, (obj) => obj.id !== "");

    const promises = [];

    promises.push(axios.delete(deleteLink, { data: to_delete }));

    promises.push(axios.post(saveLink, ecritures));

    Promise.all(promises)
      .then((responses) => {
        if (responses.length === 2) {
          dispatch({
            type: SAVE_ECRITURE_SERVER,
            payload: responses[1].data.ecritures,
            entete: responses[1].data.entete,
          });
        }
      })
      .catch((error) => {
        // dispatch({
        //   type: ERROR,
        //   payload: error,
        // });
      });
  };
}

export function getEcrituresFromServer(num_mouvement) {
  const link = `${DATA_SERVICE_URL}ecritures/mouvement?numero=${num_mouvement}`;
  const request = axios.get(link);

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_ECRITURE_SERVER,
          payload: response.data.ecritures,
          entete: response.data.entete,
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

export function clearEcritureList() {
  return {
    type: CLEAR_ECRITURE,
  };
}
