import React, { useEffect } from "react";
import { FuseAuthorization, FuseLayout, FuseTheme } from "@fuse";
import Provider from "react-redux/es/components/Provider";
import { Router } from "react-router-dom";
import jssExtend from "jss-extend";
import history from "@history";
import { Auth } from "./auth";
import store from "./store";
import AppContext from "./AppContext";
import routes from "./fuse-configs/routesConfig";
import { create } from "jss";
import {
  StylesProvider,
  jssPreset,
  createGenerateClassName,
} from "@material-ui/styles";
// import firebaseConfig from "app/services/firebaseService/firebaseServiceConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";

import ReactHowler from "react-howler";
const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const generateClassName = createGenerateClassName();

const App = () => {
  // const howlerRef = React.useRef(null);
  // React.useEffect(() => {
  //   const app = initializeApp(firebaseConfig);
  //   const db = getFirestore(app);
  //   onSnapshot(collection(db, "tasks_done"), (data) => {
  //     data.docChanges().forEach((change) => {
  //       if (howlerRef.current) {
  //         howlerRef.current.play();
  //       }
  //       if (change.type === "added") {
  //         console.log("New city: ", change.doc.data());
  //       }
  //       if (change.type === "modified") {
  //         console.log("Modified city: ", change.doc.data());
  //       }
  //       if (change.type === "removed") {
  //         console.log("Removed city: ", change.doc.data());
  //       }
  //     });
  //   });
  // });
  return (
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <Auth>
            <Router history={history}>
              <FuseAuthorization>
                <FuseTheme>
                  <FuseLayout />
                  {/* <ReactHowler
                    src="assets/sounds/notification-03.mp3"
                    ref={howlerRef}
                  /> */}
                </FuseTheme>
              </FuseAuthorization>
            </Router>
          </Auth>
        </Provider>
      </StylesProvider>
    </AppContext.Provider>
  );
};

export default App;
