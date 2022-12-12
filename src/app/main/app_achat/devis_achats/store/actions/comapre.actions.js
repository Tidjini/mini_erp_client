import axios from "axios";
import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const TABLE_COMPARE = "[DEVIS] TABLE_COMPARE";
export const SELECT_COMPARE_CELL = "[DEVIS] SELECT_COMPARE_CELL";

export function getTableComparatoire(demandeId) {
  const request = axios.get(
    DATA_SERVICE_URL + "devis_achat_table_compare/?id=" + demandeId
  );

  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: TABLE_COMPARE,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "[DEVIS] ERROR",
          payload: error,
        });
      });
  };
}

export function onSelectColumn(row, index) {
  return {
    type: SELECT_COMPARE_CELL,
    row: row,
    index: index,
  };
}
