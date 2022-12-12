import apiService from "app/services/infrabitumService/ApiService";
import axios from "axios";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const GET_DETAIL = "[TRANSIT] GET_DETAIL";
export const SAVE_DETAIL = "[TRANSIT] SAVE_DETAIL";
export const DELETE_DETAIL = "[TRANSIT] DELETE_DETAIL";
export const ERROR = "[TRANSIT] ERROR";

export const defaultDetail = {
  id: "",
  debut: null,
  chauffeur: "",
  camion: "",
  tare_initial: 0.0,
  sortie_depot: null,
  arrive_port: null,
  diff_depot_port: 0,
  tare_port: 0.0,
  tare_diff: 0.0,
  brut_port: 0.0,
  net_port: 0.0,
  sortie_port: null,
  arrive_depot: null,
  diff_port_depot: 0,
  brut_depot: 0.0,
  brut_diff: 0.0,
  tare_final: 0.0,
  net_depot: 0.0,
  net_diff: 0.0,
  cloture: false,
  statue: 0,
  fin: null,
  durre: 0,
  log: [],
  transit_operation: "",
  numero: "",
};

export function getDetail(id) {
  apiService.init("transit/details-operations");

  return async (dispatch) => {
    try {
      var data = await apiService.getItem(id);
      dispatch({
        type: GET_DETAIL,
        payload: data,
      });
    } catch (exception) {
      dispatch({
        type: ERROR,
        payload: exception,
      });
    }
  };
}

export function setNewDetail() {
  return {
    type: GET_DETAIL,
    payload: defaultDetail,
  };
}
export function saveDetail(item) {
  apiService.init("transit/details-operations");

  return async (dispatch) => {
    try {
      var data = await apiService.saveItem(item);
      dispatch({
        type: SAVE_DETAIL,
        payload: data,
      });
    } catch (exception) {
      dispatch({
        type: ERROR,
        payload: exception,
      });
    }
  };
}

export function onAction(form) {
  let action = form.statue + 1;
  if (action < 1) action = 1;
  if (action > 12) action = 12;
  apiService.init("transit/update_action/");
  const data = { id: form.id, action: action };
  return (dispatch) => {
    axios
      .put(`${DATA_SERVICE_URL}transit/update_action/`, data)
      .then((response) => {
        dispatch({
          type: SAVE_DETAIL,
          payload: response.data,
        });
      })
      .catch((exception) => {
        dispatch({
          type: ERROR,
          payload: exception,
        });
      });
  };
}

export function deleteDetail(item) {
  apiService.init("transit/details-operations");

  return async (dispatch) => {
    try {
      var data = await apiService.deleteItem(item);
      dispatch({
        type: DELETE_DETAIL,
        payload: data,
      });
    } catch (exception) {
      dispatch({
        type: ERROR,
        payload: exception,
      });
    }
  };
}
