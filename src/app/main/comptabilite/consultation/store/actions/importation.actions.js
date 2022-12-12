import { URL } from "app/main/helpers/endpoints";
import axios from "axios";

export function migrateEcriture(remove_data, file) {
  const link = `${URL}migrate_ecriture/`;

  var formData = new FormData();
  formData.append("fichier", file);
  formData.append("remove_data", remove_data);

  const request = axios.post(link, formData);

  return async (dispatch) => {
    request
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  };
}
