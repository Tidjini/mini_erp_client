import axios from "axios";

// import { config } from "app/helpers/config";
import FuseUtils from "@fuse/FuseUtils";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

class InfrabitumService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();

  }

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${DATA_SERVICE_URL}utilisateurs/create`, data)
        .then((response) => {
          if (response.data.utilisateur) {
            this.setSession(response.data.token);
            resolve(response.data.utilisateur);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithUsernameAndPassword = (username, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${DATA_SERVICE_URL}utilisateurs/auth/username`, {
          username: username,
          password: password,
        })
        .then((response) => {
          if (response.data.utilisateur) {
            this.setSession(response.data.token);
            resolve(response.data.utilisateur);
          } else {
            reject(response.data.error);
          }
        });
    });
  };
  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("infrabitum_access_token", access_token);
      axios.defaults.headers.common["Authorization"] = "token " + access_token;
    } else {
      localStorage.removeItem("infrabitum_access_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  logout = () => {
    this.setSession(null);
  };

  getAccessToken = () => {
    return window.localStorage.getItem("infrabitum_access_token");
  };

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response &&
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);

            
          }
          
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    let access_token = this.getAccessToken();

    if (!access_token) {
      return;
    }

    

    if (access_token) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] =
        "token " + this.getAccessToken();

      axios
        .get(`${DATA_SERVICE_URL}utilisateurs/auth/token`, {})
        .then((response) => {
          if (response.data.utilisateur) {
            this.setSession(response.data.token);
            resolve(response.data.utilisateur);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  saveAttachements = (model, id, liste, deleted = []) => {
    let promises = [];
    liste.map(({ fichier_upload, type, name }) => {
      var formData = new FormData();
      formData.append("fichier", fichier_upload);
      formData.append("type", type);
      formData.append(model, id);
      formData.append("name", name);
      promises.push(
        axios.post(`${DATA_SERVICE_URL}attachements/?model=${model}`, formData)
      );
    });

    deleted.map(({ id }) => {
      if (id !== undefined && id !== null && id !== "")
        promises.push(
          axios.delete(`${DATA_SERVICE_URL}attachements/?model=${model}${id}/`)
        );
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
  };
}

const instance = new InfrabitumService();

export default instance;
