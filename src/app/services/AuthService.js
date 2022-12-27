import axios from "axios";

import FuseUtils from "@fuse/FuseUtils";

class AuthService extends FuseUtils.EventEmitter {
  API_URL = process.env.REACT_APP_API_URL;
  AUTH_TOKEN_URL = process.env.REACT_APP_AUTH_TOKEN_URL;
  AUTH_USER_URL = process.env.REACT_APP_AUTH_USER_URL;

  initialize() {
    this.setInterceptors();
    this.checkAuth();
  }
  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response &&
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

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("access_token", access_token);
      //to continue serve with this token
      axios.defaults.headers.common["Authorization"] = "token " + access_token;
    } else {
      localStorage.removeItem("access_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  getAccessToken = () => {
    return window.localStorage.getItem("access_token");
  };

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
  signIn = (credentials) => {
    return new Promise((resolve, reject) => {
      axios.post(`${this.AUTH_USER_URL}/`, credentials).then((response) => {
        if (response.data) {
          this.setSession(response.data.token);
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      });
    });
  };
  logout = () => {
    this.setSession(null);
  };

  signInToken = () => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] =
        "token " + this.getAccessToken();

      axios.get(`${this.AUTH_TOKEN_URL}/`).then((response) => {
        if (response.data) {
          this.setSession(response.data.token);
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  checkAuth = () => {
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
}

const instance = new AuthService();

export default instance;

// saveAttachements = (model, id, liste, deleted = []) => {
//   let promises = [];
//   liste.map(({ fichier_upload, type, name }) => {
//     var formData = new FormData();
//     formData.append("fichier", fichier_upload);
//     formData.append("type", type);
//     formData.append(model, id);
//     formData.append("name", name);
//     promises.push(
//       axios.post(`${DATA_SERVICE_URL}attachements/?model=${model}`, formData)
//     );
//   });

//   deleted.map(({ id }) => {
//     if (id !== undefined && id !== null && id !== "")
//       promises.push(
//         axios.delete(`${DATA_SERVICE_URL}attachements/?model=${model}${id}/`)
//       );
//   });

//   return new Promise((resolve, reject) => {
//     Promise.all(promises)
//       .then(function (values) {
//         resolve(values);
//       })
//       .catch((errs) => {
//         reject(errs);
//       });
//   });
// };
