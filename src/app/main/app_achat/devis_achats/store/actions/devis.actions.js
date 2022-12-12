import axios from "axios";
import { showMessage } from "app/store/actions/fuse";

import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";
import { saveAttachements } from "./attachements.actions";

export const DEVIS_COLLECTION = "[DEVIS] DEVIS_COLLECTION";
export const DEVIS = "[DEVIS] DEVIS";
export const SAVE_DEVIS = "[DEVIS] SAVE_DEVIS";
export const COPIE_DEVIS = "[DEVIS] COPIE_DEVIS";
export const INIT_DEVIS_ACHAT = "[DEVIS] INIT_DEVIS_ACHAT";
export const DELETE_DEVIS = "[DEVIS] DELETE_DEVIS";

export const ERROR = "[DEVIS] ERROR";

export function initDevisAchat() {
  return {
    type: INIT_DEVIS_ACHAT,
  };
}
export function getDevisAchatCollection(page) {
  const request = axios.get(DATA_SERVICE_URL + "devis_achats/?page=" + page);

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: DEVIS_COLLECTION,
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

export function searchDevisCollection(search) {
  const request = axios.get(
    DATA_SERVICE_URL + "devis_achats/?search=" + search
  );

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: DEVIS_COLLECTION,
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

export function getDevisAchatCopies(devisId) {
  const request = axios.get(
    DATA_SERVICE_URL + "devis_achat_service/?id=" + devisId
  );

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: DEVIS,
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

export function getDevisAchat(devisId) {
  const request = axios.get(
    DATA_SERVICE_URL + "devis_achat_service/?id=" + devisId
  );

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: DEVIS,
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

export function saveDevisAchat(
  devis_data,
  attachments,
  attachmentsDeleted = []
) {
  let request = null;
  if (devis_data.id === "")
    request = axios.post(DATA_SERVICE_URL + "devis_achat_service/", devis_data);
  else
    request = axios.put(
      DATA_SERVICE_URL + "devis_achat_service/?id=" + devis_data.id,
      devis_data
    );

  if (request === null)
    return {
      type: ERROR,
      payload: "Error initialize request of this demande",
    };
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(
          showMessage({
            message: `Le Devis N°${devis_data.numero} a été sauvgarder avec sucess`,
            variant: "success",
            anchorOrigin: {
              vertical: "center", //top bottom
              horizontal: "right", //left center right
            },
            autoHideDuration: 1200,
          })
        );
        dispatch({
          type: SAVE_DEVIS,
          payload: response.data,
        });

        dispatch(
          saveAttachements(response.data.id, attachments, attachmentsDeleted)
        );
      })
      .catch((error) => {
        dispatch({
          type: ERROR,
          payload: error,
        });
      });
  };
}

export function copierDevis(form, open) {
  if (form.id === null || form.id === undefined || form.id === "") {
    return {
      type: ERROR,
      payload:
        "Cette demande n'est pas sauvgarder encore et ne peut etre transformé en devis",
    };
  }
  const request = axios.get(DATA_SERVICE_URL + "copie_devis/?id=" + form.id);

  if (request === null)
    return {
      type: ERROR,
      payload: "Error initialize request of this demande",
    };
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: COPIE_DEVIS,
          payload: response.data,
          open: open,
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

export function deleteDevis(id) {
  const request = axios.delete(
    DATA_SERVICE_URL + `devis_achat/delete/?id=${id}`
  );

  return (dispatch) => {
    request
      .then((response) => {
        dispatch(
          showMessage({
            message: "la demande a été supprimé avec success",
            variant: "warning",
            anchorOrigin: {
              vertical: "center", //top bottom
              horizontal: "right", //left center right
            },
            autoHideDuration: 1200,
          })
        );
        dispatch({
          type: DELETE_DEVIS,
          payload: response.data.id,
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
