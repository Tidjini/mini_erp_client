import axios from "axios";
import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";

class ApiService {
  init(collectionLink, primary = "id") {
    this.loading = false;
    this.collection = collectionLink;
    this.primary = primary;
  }

  setLoading(loading) {
    this.loading = loading;
  }

  getCollection = (page = 1, filters = {}) => {
    const params = { page: page, ...filters };
    this.setLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${DATA_SERVICE_URL}${this.collection}/`, { params })
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
          this.setLoading(false);
        })
        .catch((exception) => {
          this.setLoading(false);
          reject(exception);
        });
    });
  };

  getItem = (id) => {
    this.setLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${DATA_SERVICE_URL}${this.collection}/${id}/`)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
          this.setLoading(false);
        })
        .catch((exception) => {
          this.setLoading(false);
          reject(exception);
        });
    });
  };

  getSaveRequest = (item) => {
    let request = undefined;
    if (
      item[this.primary] !== undefined &&
      item[this.primary] !== null &&
      item[this.primary] !== "" &&
      item[this.primary] !== 0
    ) {
      request = axios.put(
        `${DATA_SERVICE_URL}${this.collection}/${item[this.primary]}/`,
        item
      );
    } else {
      request = axios.post(`${DATA_SERVICE_URL}${this.collection}/`, item);
    }
    return request;
  };

  saveItem = (item) => {
    const request = this.getSaveRequest(item, this.primary);

    this.setLoading(true);
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
          this.setLoading(false);
        })
        .catch((exception) => {
          this.setLoading(false);
          reject(exception);
        });
    });
  };

  deleteItem = (item) => {
    const request = axios.delete(
      `${DATA_SERVICE_URL}${this.collection}/${item[this.primary]}/`
    );

    this.setLoading(true);
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
          this.setLoading(false);
        })
        .catch((exception) => {
          this.setLoading(false);
          reject(exception);
        });
    });
  };

  saveList = (items) => {
    let promises = [];
    items.map((item) => {
      promises.push(this.getSaveRequest(item, this.primary));
      return item;
    });

    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then(function (values) {
          if (values.data) {
            resolve(values.data);
          } else {
            reject(values.data.error);
          }
          this.setLoading(false);
        })
        .catch((exception) => {
          this.setLoading(false);
          reject(exception);
        });
    });
  };
  deleteCollection = () => {};

  saveDetails = (details, deletes, primary = "id") => {
    let promises = [];
    details.map((item) => {
      const request = this.getSaveRequest(this.collection, item, primary);
      promises.push(request);
      return item;
    });

    deletes.map((item) => {
      promises.push(
        axios.delete(`${DATA_SERVICE_URL}${this.collection}/${item[primary]}/`)
      );
      return item;
    });

    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then((values) => {
          resolve(values);
          this.setLoading(false);
        })
        .catch((exception) => {
          reject(exception);
          this.setLoading(false);
        });
    });
  };

  saveItemWithDetails = (
    item,
    details,
    deletes,
    detailsCollection,
    detailsPrimary = "id"
  ) => {
    let request = undefined;
    if (
      item[this.primary] !== undefined &&
      item[this.primary] !== null &&
      item[this.primary] !== ""
    ) {
      request = axios.put(
        `${DATA_SERVICE_URL}${this.collection}/${item[this.primary]}/`,
        item
      );
    } else {
      request = axios.post(`${DATA_SERVICE_URL}${this.collection}/`, item);
    }

    this.setLoading(true);
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          if (response.data) {
            resolve(response.data);
            this.saveDetails(
              detailsCollection,
              details,
              deletes,
              detailsPrimary
            );
          } else {
            reject(response.data.error);
            this.setLoading(false);
          }
        })
        .catch((exception) => {
          this.setLoading(false);
          reject(exception);
        });
    });
  };
}

const instance = new ApiService();

export default instance;
