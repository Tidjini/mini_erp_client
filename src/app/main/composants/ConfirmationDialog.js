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

export default function ConfirmationDialog(props) {
  const { button, buttonStyle, title, message, confirm, cancel } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (confirm) confirm();
    setOpen(false);
  };
  const handleCancel = () => {
    if (cancel) cancel();
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
          ...buttonStyle,
        }}
        onClick={handleClickOpen}
      >
        {button}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} autoFocus>
            Sauvgarder
          </Button>
          <Button onClick={handleCancel}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
