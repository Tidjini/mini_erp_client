import axios from "axios";
import { getIdFromUrl } from "app/helpers/utils";
import { showMessage } from "app/store/actions/fuse";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const OPEN_NEW_DIALOG = "OPEN_NEW_DIALOG";
export const CLOSE_NEW_DIALOG = "CLOSE_NEW_DIALOG";
export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";
export const SEARCH_TEXT = "SEARCH_TEXT";
export const GET_COLLECTION_PAGE = "GET_COLLECTION_PAGE";
export const GET_COLLECTION_ALL = "GET_COLLECTION_ALL";
export const SAVE_ITEM = "SAVE_ITEM";
export const GET_ITEM = "GET_ITEM";
export const GET_MAGASIN_COLLECTION = "GET_MAGASIN_COLLECTION";
export const SET_LOADING = "SET_LOADING";
export const GET_CURRENT_PAGE = "GET_CURRENT_PAGE";
export const DELETE_ITEM = "DELETE_ITEM";
export const INIT_SELECTED_ITEM = "INIT_SELECTED_ITEM";
export const CART_ITEMS = "CART_ITEMS";
export const DELETE_CART_ITEM = "DELETE_CART_ITEM";
export const ADD_CART_ITEM = "ADD_CART_ITEM";
export const SELECT_CART_ITEM = "SELECT_CART_ITEM";
export const CONFIRME_CART = "CONFIRME_CART";
export const EDIT_CART_ITEM = "EDIT_CART_ITEM";
export const OPEN_PAIEMENT = "OPEN_PAIEMENT";

//Set to true when loading data
export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading: loading,
  };
}
export function openNewDialog() {
  return {
    type: OPEN_NEW_DIALOG,
  };
}

export function closeNewDialog() {
  return {
    type: CLOSE_NEW_DIALOG,
  };
}

export function openDialog(data) {
  return {
    type: OPEN_DIALOG,
    data,
  };
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  };
}

export function setSearchText(collectionName, value) {
  return {
    type: SEARCH_TEXT,
    searchText: value,
  };
}

export function getAllCollection(collectionName, params, results = []) {
  //let params = { ...parameters, page: 1 };

  const request = axios.get(DATA_SERVICE_URL + collectionName + "/", {
    params,
  });

  return request.then((response) => {
    results = [...results, ...response.data.results];
    if (response.data.next != null || response.data.next != undefined) {
      let { page } = params;
      const nextPage = page + 1;
      params = { ...params, page: nextPage };
      return getAllCollection(collectionName, params, results);
    }
    if (response.data.next == null) {
      return results;
    }
  });
}

export function getAllPagedCollection(collectionName, parameters) {
  //Params with page

  if (
    collectionName == null ||
    collectionName == undefined ||
    collectionName == ""
  )
    return;
  setLoading(true);
  let responseData = [];

  let params = { ...parameters, page: 1 };
  return (dispatch) =>
    getAllCollection(collectionName, params, responseData).then((results) => {
      //responseData
      const returnResponse = {
        results: results,
        count: results === undefined ? 0 : results.length,
        next: null,
        previous: null,
      };
      setLoading(false);

      dispatch({
        type: GET_COLLECTION_ALL,
        payload: returnResponse,
      });
    });
}

export function getCollectionPerPage(collectionName, params) {
  //Params with page

  if (
    collectionName == null ||
    collectionName == undefined ||
    collectionName == ""
  )
    return;
  const request = axios.get(DATA_SERVICE_URL + collectionName + "/", {
    params,
  });
  setLoading(true);

  return (dispatch) =>
    request.then((response) => {
      setLoading(false);
      dispatch({
        type: GET_COLLECTION_PAGE,
        payload: response.data,
      });
    });
}

export function deleteItem(collectionName, url) {
  if (
    collectionName == null ||
    collectionName == undefined ||
    collectionName == ""
  )
    return;
  let request = undefined;
  const id = getIdFromUrl(url);
  if (id !== undefined || id !== "") {
    // request = axios.post(DEFAULT_URL_PATH + "data_service/clients/", data);
    request = axios.delete(DATA_SERVICE_URL + collectionName + "/" + id, {});
    return (dispatch) =>
      request.then((response) => {
        dispatch(showMessage({ message: "Entity Deleted" }));
        return dispatch({
          type: DELETE_ITEM,
          selectedItem: response.data,
          url: url,
        });
      });
  }
}
export function saveItem(collectionName, data) {
  if (
    collectionName == null ||
    collectionName == undefined ||
    collectionName == ""
  )
    return;
  let request = undefined;
  if (data.url === undefined || data.url === "") {
    // request = axios.post(DEFAULT_URL_PATH + "data_service/clients/", data);
    request = axios.post(DATA_SERVICE_URL + collectionName + "/", data);
  } else {
    const id = getIdFromUrl(data.url);
    request = axios.put(
      // DEFAULT_URL_PATH + "data_service/clients/" + id + "/",
      DATA_SERVICE_URL + collectionName + "/" + id + "/",
      data
    );
  }
  return (dispatch) =>
    request
      .then((response) => {
        dispatch(
          showMessage({ message: "Entity Sauvgardé", variant: "success" })
        );
        return dispatch({
          type: SAVE_ITEM,
          selectedItem: response.data,
        });
      })
      .catch((err) => {
        if (data.transporter) {
          dispatch(
            showMessage({
              message:
                "Le Transporter Que Vous avez selectionner est occuper, Veilliez choisir un autre",
              variant: "warning",
            })
          );
        } else {
          dispatch(
            showMessage({
              message: "Erreur de sauvgarde, vérifier votre entity",
              variant: "error",
            })
          );
        }
      });
}

export function getItem(collection, params) {
  //const { id } = params;
  const { id } = params;

  const request = axios.get(DATA_SERVICE_URL + collection + "/" + id + "/", {
    params,
  });
  return (dispatch) =>
    request.then((response) => {
      return dispatch({
        type: GET_ITEM,
        selectedItem: response.data,
      });
    });
}

export function newItem(data) {
  return {
    type: GET_ITEM,
    selectedItem: data,
  };
}
export function getCurrentPage(page) {
  return {
    type: GET_CURRENT_PAGE,
    currentPage: page,
  };
}

export function initSelectedItem() {
  return {
    type: INIT_SELECTED_ITEM,
    selectedItem: {},
  };
}

export function deleteCartItem(item) {
  return {
    type: DELETE_CART_ITEM,
    item: item,
  };
}

export function addCartItem(item) {
  return {
    type: ADD_CART_ITEM,
    item: item,
  };
}

export function selectCartItem(item) {
  return {
    type: SELECT_CART_ITEM,
    item: item,
  };
}

export function editCartItem(item, qte, prix, remise, note) {
  item.qte = qte;
  item.prix = prix;
  item.remise = remise;
  item.montant = qte * prix - qte * prix * remise;
  item.note = note;
  return {
    type: EDIT_CART_ITEM,
    item: item,
  };
}

export function confirmeCart() {
  return (dispatch) => {
    dispatch(
      showMessage({
        message: "Bon de commande sauvgarder avec success",
        variant: "success",
        anchorOrigin: {
          vertical: "top", //top bottom
          horizontal: "right", //left center right
        },
        autoHideDuration: 3600,
      })
    );
    dispatch({
      type: CONFIRME_CART,
    });
  };
}
export function openPaiement(open, paiment) {
  return {
    type: OPEN_PAIEMENT,
    open: open,
    paiment: paiment,
  };
}
