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

export default function AppActionDialog(props) {
  const {
    buttonLabel,
    title,
    message,
    actionOne,
    actionTwo,
    actionThree,
    actionOneLabel,
    actionTwoLabel,
    actionThreeLabel,
    backgroundColor,
    onClose,
  } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    e.stopPropagation();

    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose && onClose();
    setOpen(false);
  };
  const handleActionOne = (e) => {
    e.stopPropagation();
    actionOne && actionOne();
    setOpen(false);
  };
  const handleActionTwo = (e) => {
    e.stopPropagation();
    actionTwo && actionTwo();
    setOpen(false);
  };
  const handleActionThree = (e) => {
    e.stopPropagation();
    actionThree && actionThree();
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          marginRight: 4,
          boxShadow: "none",
          backgroundColor:
            backgroundColor === undefined ? "#467D2B" : backgroundColor,
          color: "#EFF1FF",
          textTransform: "none",
          marginBottom: 4,
          marginTop: 4,
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleClickOpen(e);
        }}
      >
        {buttonLabel}
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
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleActionOne} autoFocus>
            {actionOneLabel}
          </Button>
          <Button onClick={handleActionTwo}> {actionTwoLabel}</Button>
          <Button onClick={handleActionThree}>{actionThreeLabel}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
