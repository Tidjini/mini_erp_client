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

import Input from "app/main/composants/inputs/Input";
import { useForm } from "@fuse/hooks";
import { useDispatch } from "react-redux";
import { list, save, destroy } from "app/services/application/ActionService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ServiceDialog(props) {
  const dispatch = useDispatch();

  const { open, setOpen, item, context } = props;
  const { form, handleChange, setForm } = useForm({
    service: "",
    active: true,
  });

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) setForm({ id: "", service: "" });
    else {
      if (item === null) setForm({ id: "", service: "" });
      else setForm({ ...item });
    }
  }, [open, item]);

  const onSave = React.useCallback(() => {
    dispatch(save(context, "grh/api/services", form)).then((result) => {
      dispatch(list(context, "grh/api/services", 1, {})).then((res) => {
        setOpen(false);
      });
    });
  }, [form]);

  const onDelete = React.useCallback(() => {
    dispatch(destroy(context, "grh/api/services", item)).then((result) => {
      dispatch(list(context, "grh/api/services", 1, {})).then((res) =>
        setOpen(false)
      );
    });
  });

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
      maxWidth="md"
      style={{
        backgroundColor: "#edede910",
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{
          backgroundColor: "#edede950",
        }}
      >
        <Typography
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#2b2d42",
            textDecoration: "underline",
          }}
        >
          Service: {form.service}
        </Typography>
      </DialogTitle>
      <DialogContent
        style={{
          backgroundColor: form.service
            ? `${form.service.colour}10`
            : "#edede910",
        }}
      >
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Input
            grid={{ xs: 12, md: 6 }}
            name="service"
            placeholder="service"
            label="Service"
            handleChange={handleChange}
            value={form.service}
            style={{}}
          />
        </Grid>
      </DialogContent>
      <DialogActions
        style={{
          backgroundColor: "#edede910",
        }}
      >
        <Button
          onClick={onSave}
          autoFocus
          style={{
            backgroundColor: "#2a9d8f",
            color: "#f1faee",
            textTransform: "none",
          }}
        >
          Sauvgarder
        </Button>
        <Button
          onClick={onDelete}
          autoFocus
          style={{
            backgroundColor: "red",
            color: "#f1faee",
            textTransform: "none",
          }}
        >
          Supprimer
        </Button>

        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "#ffc300",
            color: "#2b2d42",
            textTransform: "none",
          }}
        >
          Retour
        </Button>
      </DialogActions>
    </Dialog>
  );
}
