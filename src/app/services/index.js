import axios from "axios";

import FuseUtils from "@fuse/FuseUtils";

class Service extends FuseUtils.EventEmitter {
  constructor(props) {
    this.API_URL = process.env.API_URL;
  }

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(`${this.API_URL}/utilisateurs/`, data).then((response) => {
        if (response.data) {
          this.setSession(response.data.token);
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      });
    });
  };
  signIn = (creadential) => {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.AUTH_USER_URL}/`, data).then((response) => {
        if (response.data) {
          this.setSession(response.data.token);
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      });
    });
  };
}

const instance = new Service();

export default instance;
