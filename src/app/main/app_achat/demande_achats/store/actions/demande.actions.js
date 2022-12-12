import axios from "axios";
import { showMessage } from "app/store/actions/fuse";
import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";
import { saveAttachements } from "./attachements.actions";
import { saveArticles, deleteDetails } from "./articles.actions";

export const NEW_DEMANDE = "[DEMANDE] NEW DEMANDE";
export const DEMANDE = "[DEMANDE] DEMANDE";
export const DEMANDE_COLLECTION = "[DEMANDE] DEMANDE_COLLECTION";
export const SAVE_DEMANDE = "[DEMANDE] SAVE_DEMANDE";
export const EMPLOYES_LIST = "[DEMANDE] EMPLOYES_LIST";
export const DEMANDE_TO_DEVIS = "[DEMANDE] DEMANDE_TO_DEVIS";
export const DELETE_DEMANDE = "[DEMANDE] DELETE_DEMANDE";
export const ERROR = "[DEMANDE] ERROR";

export function openNewDemandeAchat() {
  const request = axios.get(DATA_SERVICE_URL + "init_demande_achats/");

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: NEW_DEMANDE,
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

export function getDemandeAchat(demande_id) {
  const request = axios.get(
    DATA_SERVICE_URL + "demande_achat_service/?id=" + demande_id
  );

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: DEMANDE,
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

export function getDemandeAchatCollection(page) {
  const request = axios.get(DATA_SERVICE_URL + "demande_achats/?page=" + page);

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: DEMANDE_COLLECTION,
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
export function searchDemandeCollection(search) {
  const request = axios.get(
    DATA_SERVICE_URL + "demande_achats/?search=" + search
  );

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: DEMANDE_COLLECTION,
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

export function saveDemandeAchat(
  demande_data,
  attachments,
  attachmentsDeleted = []
) {
  let request = null;
  if (demande_data.id === "")
    request = axios.post(
      DATA_SERVICE_URL + "demande_achat_service/",
      demande_data
    );
  else
    request = axios.put(
      DATA_SERVICE_URL + "demande_achat_service/?id=" + demande_data.id,
      demande_data
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
            message: "cette demande a été sauvgarder avec success",
            variant: "success",
            anchorOrigin: {
              vertical: "center", //top bottom
              horizontal: "right", //left center right
            },
            autoHideDuration: 1200,
          })
        );
        dispatch({
          type: SAVE_DEMANDE,
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

export function searchEmployees(search) {
  const params = { search: search };
  const request = axios.get(DATA_SERVICE_URL + "employees/", params);

  if (request === null)
    return {
      type: ERROR,
      payload: "Error initialize request of this demande",
    };
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: EMPLOYES_LIST,
          payload: response.data.results,
          count: response.data.count,
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

export function demandeToDevis(form, open) {
  if (form.id === null || form.id === undefined || form.id === "") {
    return {
      type: ERROR,
      payload:
        "Cette demande n'est pas sauvgarder encore et ne peut etre transformé en devis",
    };
  }
  const request = axios.get(
    DATA_SERVICE_URL + "demande_achat_to_devis/?id=" + form.id
  );

  if (request === null)
    return {
      type: ERROR,
      payload: "Error initialize request of this demande",
    };
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: DEMANDE_TO_DEVIS,
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

export function annulerDemande(form) {
  if (form.id === null || form.id === undefined || form.id === "") {
    return {
      type: ERROR,
      payload:
        "Cette demande n'est pas sauvgarder encore et ne peut etre transformé en devis",
    };
  }
  form.statue = 6;
  let request = axios.put(
    DATA_SERVICE_URL + "demande_achat_service/?id=" + form.id,
    form
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
            message: "cette demande a été annulée",
            variant: "success",
            anchorOrigin: {
              vertical: "center", //top bottom
              horizontal: "right", //left center right
            },
            autoHideDuration: 1200,
          })
        );
        dispatch({
          type: SAVE_DEMANDE,
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

export function deleteDemande(id) {
  const request = axios.delete(
    DATA_SERVICE_URL + `demande_achat/delete/?id=${id}`
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
          type: DELETE_DEMANDE,
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
