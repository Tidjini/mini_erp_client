import axios from "axios";

import FuseUtils from "@fuse/FuseUtils";

class Service extends FuseUtils.EventEmitter {
  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${process.env.API_URL}/utilisateurs/`, data)
        .then((response) => {
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

  signInToken = () => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] =
        "token " + this.getAccessToken();

      axios.get(`${process.env.AUTH_TOKEN_URL}/`, {}).then((response) => {
        if (response.data.utilisateur) {
          this.setSession(response.data.token);
          resolve(response.data.utilisateur);
        } else {
          reject(response.data.error);
        }
      });
    });
  };
}

const instance = new Service();

export default instance;
