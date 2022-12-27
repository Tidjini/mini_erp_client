// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging/";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

export const requestForToken = (setTokenFound) => {
  // return getToken(messaging, {
  //   vapidKey: process.env.REACT_APP_FIREBASE_CERTIF_WEB_PUSH,
  // })
  //   .then((currentToken) => {
  //     if (currentToken) {
  //       console.log("current token for client: ", currentToken);
  //       setTokenFound(true);
  //       // Track the token -> client mapping, by sending to backend server
  //       // show on the UI that permission is secured
  //     } else {
  //       console.log(
  //         "No registration token available. Request permission to generate one."
  //       );
  //       setTokenFound(false);
  //       // shows on the UI that permission is required
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("An error occurred while retrieving token. ", err);
  //     // catch error while creating client token
  //   });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    // onMessage(messaging, (payload) => {
    //   console.log("notification", payload);
    //   resolve(payload);
    // });
  });
export default app;
