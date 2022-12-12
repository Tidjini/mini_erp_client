import React from "react";
import firebaseConfig from "app/services/firebaseService/firebaseServiceConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";
import { showMessage, openDialog, closeDialog } from "app/store/actions/fuse";
import ReactHowler from "react-howler";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

export default function FirestoreWatcher(props) {
  const dispatch = useDispatch();
  const [constructorHasRun, setConstructorHasRun] = React.useState(false);
  const howlerRef = React.useRef(null);

  const constructor = () => {
    console.log("constructor reload");
    if (constructorHasRun) return;
    setConstructorHasRun(true);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    onSnapshot(collection(db, "tasks_done"), (data) => {
      //   if (howlerRef.current) {
      //   }
      //   howlerRef.current.stop();
      data.docChanges().forEach((change) => {
        if (change.type === "added") {
          if (howlerRef.current) {
            howlerRef.current.play();
          }
          console.log("New city: ", change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
        }
      });
      data.docs.map((doc) => {
        // dispatch(
        //   showMessage({
        //     message: `Le Devis N°${doc.id} a été modifier avec sucess`,
        //     variant: "success",
        //     anchorOrigin: {
        //       vertical: "center", //top bottom
        //       horizontal: "right", //left center right
        //     },
        //     autoHideDuration: 1200,
        //   })
        // );
      });
      dispatch(
        openDialog({
          children: (
            <React.Fragment>
              <DialogTitle id="alert-dialog-title">
                Use Google's location service?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => dispatch(closeDialog())} color="primary">
                  Disagree
                </Button>
                <Button
                  onClick={() => dispatch(closeDialog())}
                  color="primary"
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </React.Fragment>
          ),
        })
      );
    });
  };
  constructor();
  return (
    <ReactHowler src="assets/sounds/notification-03.mp3" ref={howlerRef} />
  );
}
