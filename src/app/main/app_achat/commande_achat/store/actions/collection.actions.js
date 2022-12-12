import axios from "axios";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const COMMANDE_COLLECTION = "[COMMANDE_ACHAT] COMMANDE_COLLECTION";
export const DELETE_COMMANDE = "[COMMANDE_ACHAT] DELETE_COMMANDE";
export const LOADING = "[COMMANDE_ACHAT] LOADING";

export const ERROR = "[COMMANDE_ACHAT] ERROR";

export function getCommandeCollection(filters, page = 1) {
  const link = `${DATA_SERVICE_URL}commande_achat/list?search=${filters["search"]}&page=${page}`;
  const request = axios.get(link, filters);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: COMMANDE_COLLECTION,
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

export function deleteCommande(id) {
  const link = `${DATA_SERVICE_URL}commande_achat/delete/?id=${id}`;
  const request = axios.delete(link, {});

  return (dispatch) =>
    request
      .then((response) => {
        dispatch({
          type: DELETE_COMMANDE,
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
