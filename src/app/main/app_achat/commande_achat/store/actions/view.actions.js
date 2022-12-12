import axios from "axios";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

import { saveAttachements } from "app/helpers/features";
import { showMessage } from "app/store/actions/fuse";

export const COMMANDE_VIEW = "[COMMANDE_ACHAT] COMMANDE_VIEW";
export const SAVE_ATTACHEMENTS = "[COMMANDE_ACHAT] SAVE_ATTACHEMENTS";
export const DELETE_COMMANDE = "[COMMANDE_ACHAT] DELETE_COMMANDE";

export const GET_ATTACHEMENTS = "[COMMANDE_ACHAT] GET_ATTACHEMENTS";
export const ADD_ATTACHEMENTS = "[COMMANDE_ACHAT] ADD_ATTACHEMENTS";
export const DELETE_ATTACHEMENT = "[COMMANDE_ACHAT] DELETE_ATTACHEMENT";
export const LOADING = "[COMMANDE_ACHAT] LOADING";
export const ERROR = "[COMMANDE_ACHAT] ERROR";

export function saveCommandeAttachements(
  model,
  url,
  id,
  liste = [],
  deleted = []
) {
  return (dispatch) =>
    saveAttachements(model, url, id, liste, deleted)
      .then((values) => {
        dispatch({ type: SAVE_ATTACHEMENTS, payload: true });
      })
      .catch((errs) => {
        dispatch({
          type: "ERROR",
          payload: "SAVE COMMANDE attachements ERROR",
        });
      });
}

export function saveCommande(commande, attachements, attachements_deleted) {
  const link = `${DATA_SERVICE_URL}commande_achat/item/save/`;
  const request = axios.post(link, commande);

  return (dispatch) => {
    request
      .then((response) => {
        dispatch(
          showMessage({
            message: "la commande a été sauvgarder avec success",
            variant: "success",
            anchorOrigin: {
              vertical: "center", //top bottom
              horizontal: "right", //left center right
            },
            autoHideDuration: 1200,
          })
        );
        dispatch(
          saveAttachements(
            "commande_achat",
            "cmd_attachements",
            response.data.id,
            attachements,
            attachements_deleted
          )
        );
        dispatch({
          type: COMMANDE_VIEW,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error("error", error);
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

export function getCommandeItem(id) {
  const link = `${DATA_SERVICE_URL}commande_achat/item/?id=${id}`;
  const request = axios.get(link);

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: COMMANDE_VIEW,
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

export function getAttachements(commande_id) {
  const link = `${DATA_SERVICE_URL}cmd_attachements/?commande_achat__id=${commande_id}`;
  const request = axios.get(link);

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_ATTACHEMENTS,
          payload: response.data.results,
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

export function addNewAttachement(attachement) {
  return {
    type: ADD_ATTACHEMENTS,
    payload: attachement,
  };
}

export function deleteAttachement(attachement, attachements) {
  const index = attachements.findIndex((e) => e.name === attachement.name);

  if (index != -1) {
    attachements.splice(index, 1);
  }

  return {
    type: DELETE_ATTACHEMENT,
    payload: attachement,
    attachements: attachements,
  };
}

export function deleteCommande(id) {
  const link = `${DATA_SERVICE_URL}commande_achat/delete/?id=${id}`;
  const request = axios.delete(link, {});

  return (dispatch) =>
    request
      .then((response) => {
        dispatch({
          type: COMMANDE_VIEW,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error("error", error);
        dispatch({
          type: ERROR,
          payload: error,
        });
      });
}
