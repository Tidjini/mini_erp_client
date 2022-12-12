import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DemandeToDevisDialog(props) {
  const { numero, transformerEnDevis } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    transformerEnDevis(false);
    setOpen(false);
  };
  const handleSaveWithOpen = () => {
    transformerEnDevis(true);
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          marginRight: 4,
          boxShadow: "none",
          backgroundColor: "#467D2B",
          color: "#EFF1FF",
          textTransform: "none",
          marginBottom: 4,
        }}
        onClick={handleClickOpen}
      >
        Transformer en devis
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Transformation en Devis"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez vous transformer cette demande N°{numero} en un Devis?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} autoFocus>
            Sauvgarder
          </Button>
          <Button onClick={handleSaveWithOpen}>Sauvgarder Et Ouvrir</Button>
          <Button onClick={handleClose}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
