import config from "./firebaseServiceConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// import { auth } from "firebase/auth";
// import { database } from "firebase/database";
import { AUTH_CONFIG } from "../auth0Service/auth0ServiceConfig";

class firebaseService {
  init() {
    this.app = initializeApp(config);
    this.db = getFirestore(this.app);
    // if (
    //   Object.entries(AUTH_CONFIG).length === 0 &&
    //   AUTH_CONFIG.constructor === Object
    // ) {
    //   if (process.env.NODE_ENV === "development") {
    //     console.warn(
    //       "Missing Firebase Configuration at src/app/services/firebaseService/firebaseServiceConfig.js"
    //     );
    //   }
    //   return;
    // }
    // if (apps.length) {
    //   return;
    // }
    // this.db = database();
    // this.auth = auth();
  }

  getDb = () => this.db;
  getUserData = (userId) => {
    // if (!apps.length) {
    //   return;
    // }
    // return new Promise((resolve, reject) => {
    //   this.db
    //     .ref(`users/${userId}`)
    //     .once("value")
    //     .then((snapshot) => {
    //       const user = snapshot.val();
    //       resolve(user);
    //     });
    // });
  };

  updateUserData = (user) => {
    // if (!apps.length) {
    //   return;
    // }
    // return this.db.ref(`users/${user.uid}`).set(user);
  };

  onAuthStateChanged = (callback) => {
    if (!this.auth) {
      return;
    }
    this.auth.onAuthStateChanged(callback);
  };

  signOut = () => {
    if (!this.auth) {
      return;
    }
    this.auth.signOut();
  };
}

const instance = new firebaseService();

export default instance;
