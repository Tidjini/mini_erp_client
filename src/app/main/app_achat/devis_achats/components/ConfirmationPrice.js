import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from "@material-ui/core";

import { viewStyles as styles } from "app/main/hooks/ViewStyles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationPrice(props) {
  const { open, setOpen, onConfirme, message } = props;

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
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
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title">Confirmation Prix Achat</DialogTitle>
      <DialogContent>
        <Grid container style={{ ...styles.box, padding: 0, margin: 0 }}>
          <Typography>{message}</Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirme} autoFocus>
          Sauvgarder
        </Button>
        <Button onClick={handleClose}> Annuler</Button>
      </DialogActions>
    </Dialog>
  );
}
