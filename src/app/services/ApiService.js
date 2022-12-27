import axios from "axios";
import FuseUtils from "@fuse/FuseUtils";

export class ApiService extends FuseUtils.EventEmitter {
  API_URL = process.env.REACT_APP_API_URL;

  constructor(collection, pk = "id") {
    super();
    this.initialize(collection, pk);
  }

  initialize(collection, pk = "id") {
    this.loading = false;
    this.collection = collection;
    this.pk = pk;
  }

  setLoading(loading) {
    this.loading = loading;
    this.emit("loading", this.loading);
  }

  getGeneric = (params) => {
    this.setLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.API_URL}/${this.collection}/`, { params })
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

  getCollection = (page = 1, filters = {}, ordering = {}) => {
    const params = { page: page, ...filters, ...ordering };
    this.setLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.API_URL}/${this.collection}/`, { params })
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
  getCollectionWithParams = (params) => {
    this.setLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.API_URL}/${this.collection}/`, { params })
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
        .get(`${this.API_URL}/${this.collection}/${id}/`)
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

  buildSaveRequest = (item) => {
    let request = undefined;
    if (item[this.pk]) {
      request = axios.put(
        `${this.API_URL}/${this.collection}/${item[this.pk]}/`,
        item
      );
    } else {
      request = axios.post(`${this.API_URL}/${this.collection}/`, item);
    }
    return request;
  };

  saveItem = (item) => {
    const request = this.buildSaveRequest(item);

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
      `${this.API_URL}/${this.collection}/${item[this.pk]}/`
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
}

const instance = new ApiService();

export default instance;
