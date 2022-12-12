import React, { useState, useEffect, useCallback } from "react";
import AppInput from "app/composants/inputs/AppInput";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  Slide,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateFolder(props) {
  const { open, setOpen } = props;
  const dispatch = useDispatch();

  const dossier_actif = useSelector(({ dashboard }) => dashboard.dossier_actif);
  const [dossier, setDossier] = useState({
    entreprise: "",
    description: "",
    address: "",
    database_name: "",
    database_engine: "",
    database_user: "",
    database_password: "",
    database_host: "",
    database_port: "",
  });

  const handleChange = useCallback((event) => {
    event.persist();
    setDossier((dossier) => ({
      ...dossier,
      [event.target.name]: event.target.value,
    }));
  }, []);
  const onSave = useCallback((event) => {
    dispatch(Actions.createDossier(dossier));
  });

  const handleClose = useCallback((event) => {
    if (
      dossier_actif.entreprise === "" ||
      dossier_actif.entreprise == null ||
      dossier_actif.entreprise === undefined
    )
      return;
    setOpen(false);
  });
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">Creation dossier</DialogTitle>
      <DialogContent>
        <div>
          <AppInput
            name="entreprise"
            placeholder="Entreprise"
            type="text"
            handleChange={handleChange}
            value={dossier["entreprise"]}
            horizontal={true}
            height={36}
            onTab={(e) => {}}
            onEnter={(e) => {}}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <AppInput
            name="database_name"
            placeholder="Base de Données"
            type="text"
            handleChange={handleChange}
            value={dossier["database_name"]}
            horizontal={true}
            height={36}
            onTab={(e) => {}}
            onEnter={(e) => {}}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <AppInput
            name="description"
            placeholder="Description"
            type="text"
            handleChange={handleChange}
            value={dossier["description"]}
            horizontal={true}
            height={36}
            width={500}
            onTab={(e) => {}}
            onEnter={(e) => {}}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <AppInput
            name="address"
            placeholder="Address"
            type="text"
            handleChange={handleChange}
            value={dossier["address"]}
            horizontal={true}
            height={36}
            width={500}
            onTab={(e) => {}}
            onEnter={(e) => {}}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{
            margin: "0 16px",
            boxShadow: "none",
            backgroundColor: "#2a9d8f",
            color: "#EFF1FF",
            textTransform: "none",
          }}
          onClick={onSave}
        >
          {"Créer Dossier"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withReducer("dashboard", reducer)(CreateFolder);
