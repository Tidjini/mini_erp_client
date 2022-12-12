import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";

import Input from "app/main/composants/inputs/Input";
import { useForm } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import { list, save, destroy } from "app/services/application/ActionService";
import { UpTransition } from "app/composants/animations/Transition";

export default function TacheCategorie(props) {
  const { open, setOpen } = props;
  const { form, handleChange, setForm } = useForm({});

  return (
    <Dialog
      open={open}
      TransitionComponent={UpTransition}
      keepMounted
      onClose={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
      fullWidth
      maxWidth="md"
      style={{
        backgroundColor: "#edede910",
      }}
    >
      <DialogTitle
        id="title"
        style={{
          backgroundColor: "#edede950",
        }}
      >
        <div
          container
          direction="row"
          alignItems="center"
          spacing={4}
          justify="flex-start"
        >
          <img
            src="assets/images/app_tache/categories.png"
            style={{
              width: 24,
              height: 24,
            }}
          ></img>
          <Typography
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#2b2d42",
              textDecoration: "underline",
            }}
          >
            Categorie Tâche:
          </Typography>
        </div>
      </DialogTitle>
    </Dialog>
  );
}
