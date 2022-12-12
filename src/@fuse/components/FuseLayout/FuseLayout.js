import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { matchRoutes } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "app/store/actions";
import { FuseLayouts } from "@fuse";
import _ from "@lodash";
import AppContext from "app/AppContext";
// import firebaseConfig from "app/services/firebaseService/firebaseServiceConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { showMessage, openDialog, closeDialog } from "app/store/actions/fuse";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    '& code:not([class*="language-"])': {
      color: theme.palette.secondary.dark,
      backgroundColor: "#F5F5F5",
      padding: "2px 3px",
      borderRadius: 2,
      lineHeight: 1.7,
    },
    "& table.simple tbody tr td": {
      borderColor: theme.palette.divider,
    },
    "& table.simple thead tr th": {
      borderColor: theme.palette.divider,
    },
    "& a:not([role=button])": {
      color: theme.palette.secondary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    '& [class^="border-"]': {
      borderColor: theme.palette.divider,
    },
    '& [class*="border-"]': {
      borderColor: theme.palette.divider,
    },
  },
}));

function FuseLayout(props) {
  const dispatch = useDispatch();
  const defaultSettings = useSelector(({ fuse }) => fuse.settings.defaults);
  const settings = useSelector(({ fuse }) => fuse.settings.current);

  const classes = useStyles(props);
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  useEffect(() => {
    function routeSettingsCheck() {
      const matched = matchRoutes(routes, props.location.pathname)[0];

      if (matched && matched.route.settings) {
        const routeSettings = _.merge(
          {},
          defaultSettings,
          matched.route.settings
        );
        if (!_.isEqual(settings, routeSettings)) {
          dispatch(Actions.setSettings(_.merge({}, routeSettings)));
        }
      } else {
        if (!_.isEqual(settings, defaultSettings)) {
          dispatch(Actions.resetSettings());
        }
      }
    }

    routeSettingsCheck();
  }, [defaultSettings, dispatch, props.location.pathname, routes, settings]);
  React.useLayoutEffect(() => {
    console.log("Occurs ONCE, but it still occurs AFTER the initial render.");
  }, []);
  //
  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const [firedb, setFiredb] = React.useState(null);

  const notify = (document) => {
    dispatch(
      openDialog({
        children: (
          <React.Fragment>
            <DialogTitle id="alert-dialog-title">
              Tâches Notification ({document.id})
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                La tâche identifier par: {document.id}, Intitulé:{" "}
                {document.label}, Description: {document.description}, Employe:{" "}
                {document.responsable}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())} color="primary">
                Retour
              </Button>
              <Button
                onClick={() => {
                  dispatch(closeDialog());
                }}
                color="primary"
                autoFocus
              >
                Gestion des tâches
              </Button>
            </DialogActions>
          </React.Fragment>
        ),
      })
    );
  };

  const constructor = () => {
    if (constructorHasRun) return;
    setConstructorHasRun(true);
    // const app = initializeApp(firebaseConfig);
    // const db = getFirestore(app);

    // setFiredb(db);
    // onSnapshot(collection(db, "tasks_done"), (data) => {
    //   data.docChanges().forEach(async (change) => {
    //     if (change.type === "added") {
    //       // console.log("New city: ", change.doc.data());
    //       // notify(change.doc.data());
    //     }
    //     if (change.type === "modified") {
    //       console.log("Modified city: ", change.doc.data());
    //     }
    //     if (change.type === "removed") {
    //       console.log("Removed city: ", change.doc.data());
    //     }
    //     // const id = change.doc.data().id;
    //     // const docRef = doc(db, "tasks_done", id);
    //     // deleteDoc(docRef)
    //     //   .then(() => {
    //     //     console.log("Entire Document has been deleted successfully.");
    //     //   })
    //     //   .catch((error) => {
    //     //     console.log(error);
    //     //   });
    //   });
    // });
  };
  constructor();

  const deleteOldDocuments = async (db) => {
    if (db === null) return;

    const res = await db.collection("tasks_done").delete();
    return res;
  };

  const Layout = FuseLayouts[settings.layout.style];

  return <Layout classes={{ root: classes.root }} {...props}></Layout>;
}

export default withRouter(React.memo(FuseLayout));
