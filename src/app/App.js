import React from "react";
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
import { requestForToken, onMessageListener } from "./services/Firebase";
import { default as Notification } from "app/composants.v2/notification/Generic";

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const generateClassName = createGenerateClassName();

const App = () => {
  const [isTokenFound, setTokenFound] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  requestForToken(setTokenFound);

  onMessageListener()
    .then((payload) => {
      // setNotification({
      //   title: payload.notification.title,
      //   body: payload.notification.body,
      // });
      console.log("notificaitoin", payload);
    })
    .catch((err) => console.log("failed: ", err));

  // inside the jsx being returned:

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
                  <Notification
                    data={{ title: "t", message: "m" }}
                    open={open}
                    setOpen={setOpen}
                  />
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
