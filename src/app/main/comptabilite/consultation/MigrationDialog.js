import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import React from "react";
import { migrateEcriture, getEcritureFromServer } from "./store/actions";
import AppUpload from "app/main/components/AppUpload";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MigrationDialog(props) {
  const dispatch = useDispatch();

  const { onClose } = props;
  const [open, setOpen] = React.useState(false);
  const [attachement, setAttachement] = React.useState({
    id: "add_file",
    fichier: "",
    fichier_upload: null,
    type: "file",
    name: "Ajouter Fichier",
    empty: true,
    remove_data: true,
  });

  const handleClickOpen = (e) => {
    e.stopPropagation();

    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose && onClose();
    setOpen(false);
  };
  const onMigrate = React.useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(
        migrateEcriture(attachement.remove_data, attachement.fichier_upload)
      ).then(() => {
        dispatch(getEcritureFromServer({ search: "" }, 1));
        setAttachement({
          id: "add_file",
          fichier: "",
          fichier_upload: null,
          type: "file",
          name: "Ajouter Fichier",
          empty: true,
          remove_data: true,
        });
        setOpen(false);
      });
    },
    [attachement]
  );
  const handleActionTwo = (e) => {
    e.stopPropagation();
    setAttachement({
      id: "add_file",
      fichier: "",
      fichier_upload: null,
      type: "file",
      name: "Ajouter Fichier",
      empty: true,
      remove_data: true,
    });
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          marginRight: 4,
          boxShadow: "none",
          backgroundColor: "#e9c46a",
          color: "#283618",
          textTransform: "none",
          height: 32,
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleClickOpen(e);
        }}
      >
        Importer Écritures
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={(e) => {
          e.stopPropagation();
          handleClose(e);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Importation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{ marginLeft: 15 }}>
              <AppUpload
                id={attachement.id}
                input_accept="*"
                addNewAttachement={setAttachement}
                attachement={attachement}
                deleteAttachement={() => {
                  setAttachement({
                    id: "add_file",
                    fichier: "",
                    fichier_upload: null,
                    type: "file",
                    name: "Ajouter Fichier",
                    empty: true,
                  });
                }}
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  type="checkbox"
                  name="remove_data"
                  checked={attachement.remove_data}
                  value={attachement.remove_data}
                  onChange={(e) => {
                    setAttachement({
                      ...attachement,
                      remove_data: !attachement.remove_data,
                    });
                  }}
                />
              }
              label={"Supprimer les données Actuels ?"}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onMigrate} autoFocus>
            Importer
          </Button>
          <Button onClick={handleActionTwo}> Annuler</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
