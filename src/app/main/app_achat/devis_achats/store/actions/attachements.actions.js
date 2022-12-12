import axios from "axios";
import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";

import { showMessage } from "app/store/actions/fuse";

export const ADD_ATTACHEMENTS = "[DEVIS_ACHAT] ADD_ATTACHEMENTS";
export const DELETE_ATTACHEMENT = "[DEVIE_ACHAT] DELETE_ATTACHEMENT";
export const SAVE_ATTACHEMENTS = "[DEVIS_ACHAT] SAVE_ATTACHEMENTS";
export const GET_ATTACHEMENTS = "[DEVIS_ACHAT] GET_ATTACHEMENTS";

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

export function saveAttachements(demande_id, attachements, deletes = []) {
  let promises = [];
  attachements.map(({ fichier_upload, type, id, name }) => {
    var formData = new FormData();
    formData.append("fichier", fichier_upload);
    formData.append("type", type);
    formData.append("devis_achat", demande_id);
    formData.append("name", name);
    promises.push(axios.post(DATA_SERVICE_URL + "dva_attachements/", formData));
  });

  deletes.map(({ id }) => {
    if (id !== undefined && id !== null && id !== "")
      promises.push(axios.delete(`${DATA_SERVICE_URL}dva_attachements/${id}/`));
  });

  return (dispatch) =>
    Promise.all(promises)
      .then(function (values) {
        dispatch({ type: SAVE_ATTACHEMENTS, payload: true });
      })
      .catch((errs) => {
        dispatch({
          type: "ERROR",
          payload: "SAVE DETAILS GROUPE ERROR",
        });
      });
}

export function getAttachments(demande_id) {
  var request = axios.get(
    DATA_SERVICE_URL + "dva_attachements/?devis_achat__id=" + demande_id
  );

  return (dispatch) =>
    request
      .then((response) => {
        dispatch({ type: GET_ATTACHEMENTS, payload: response.data.results });
      })
      .catch((errs) => {
        dispatch({
          type: "ERROR",
          payload: "SAVE DETAILS GROUPE ERROR",
        });
      });
}
