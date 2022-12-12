import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  DialogTitle,
  Slide,
} from "@material-ui/core";

import Uploader from "./Uploader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Attachements(props) {
  const {
    addNewAttachement,
    attachements,
    deleteAttachement,
    saveAttachement,
    buttonStyle,
  } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };
  const onSave = (e) => {
    e.stopPropagation();
    saveAttachement && saveAttachement();
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
          marginTop: 4,
          ...buttonStyle,
        }}
        onClick={handleClickOpen}
      >
        Attachements
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Attachements</DialogTitle>
        <DialogContent>
          <Grid
            container
            item
            style={{ display: "flex", justifycontent: "center" }}
          >
            {attachements.map((att, index) => {
              return (
                <Uploader
                  key={index}
                  attachement={att}
                  id={att.id}
                  deleteAttachement={deleteAttachement}
                />
              );
            })}

            <Uploader
              id="add_file"
              addNewAttachement={addNewAttachement}
              attachement={{
                type: "file",
                name: "Ajouter Fichier",
                empty: true,
              }}
              attachements={attachements}
            />
          </Grid>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={onSave} autoFocus>
            Sauvgarder
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
