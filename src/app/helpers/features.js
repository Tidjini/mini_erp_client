import axios from "axios";
import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export function saveAttachements(model, url, id, liste = [], deleted = []) {
  let promises = [];
  liste.map(({ fichier_upload, type, name }) => {
    var formData = new FormData();
    formData.append("fichier", fichier_upload);
    formData.append("type", type);
    formData.append(model, id);
    formData.append("name", name);
    promises.push(axios.post(`${DATA_SERVICE_URL}${url}/`, formData));
  });

  deleted.map(({ id }) => {
    if (id !== undefined && id !== null && id !== "")
      promises.push(axios.delete(`${DATA_SERVICE_URL}${url}/${id}/`));
  });

  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then(function (values) {
        resolve(values);
      })
      .catch((errs) => {
        reject(errs);
      });
  });
}

export function save(model, data) {
  const request = axios.post(`${DATA_SERVICE_URL}save/?model=${model}`, data);
  return new Promise((resolve, reject) => {
    request
      .then((response) => {
        resolve(response);
      })
      .catch((errs) => {
        reject(errs);
      });
  });
}
