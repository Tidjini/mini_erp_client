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
import TaskNofitication from "./composants.v2/notification/TaskNofitication";
import { useGeoLocation } from "./hooks/useGeoLocation";

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const generateClassName = createGenerateClassName();

const Application = ({ children }) => {
  useGeoLocation();

  return (
    <React.Fragment>
      <TaskNofitication />
      {children}
    </React.Fragment>
  );
};

const App = () => {
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
                  <Application>
                    <FuseLayout />
                  </Application>
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
