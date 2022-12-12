import axios from "axios";
import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const PRODUCTION_COLLECTION = "[PRODUCTION] COLLECTION";
export const LOADING = "[PRODUCTION] LOADING";
export const ERROR = "[PRODUCTION] COLLECTION ERROR";
export const RETRIEVE = "[PRODUCTION] RETRIEVE";
export const RETRIEVE_ERROR = "[PRODUCTION] RETRIEVE ERROR";
export const SAVE = "[PRODUCTION] SAVE";
export const SAVE_ERROR = "[PRODUCTION] SAVE ERROR";
export const DELETE = "[PRODUCTION] DELETE";
export const DELETE_ERROR = "[PRODUCTION] DELETE ERROR";
export const CANCEL_OPERATION = "[PRODUCTION] CANCEL_OPERATION";

export function previousOperation(wagons) {
  let promises = [];
  wagons.map((wagon) => {
    promises.push(
      axios.post(`${DATA_SERVICE_URL}production/production_operation_cancel/`, {
        wagon: wagon.numero,
      })
    );
  });

  return (dispatch) => {
    return Promise.all(promises)
      .then(function (values) {
        dispatch({
          type: CANCEL_OPERATION,
          payload: values,
        });
      })
      .catch((exception) => {
        dispatch({
          type: RETRIEVE_ERROR,
          payload: exception,
        });
      });
  };
}
