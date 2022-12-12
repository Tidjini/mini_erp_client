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
import AppSelector from "app/composants/inputs/AppSelector";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StatueDialog(props) {
  const dispatch = useDispatch();

  const { open, setOpen, item, context } = props;
  const { form, handleChange, setForm } = useForm({ statue: "", active: true });

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) setForm({ statue: "", active: true });
    else {
      if (item === null) setForm({ statue: "", active: true });
      else setForm({ ...item });
    }
  }, [open, item]);

  const onSave = React.useCallback(() => {
    dispatch(save(context, "grh/api/statues", form, "statue")).then(
      (result) => {
        dispatch(list(context, "grh/api/statues", 1, {})).then((res) => {
          setOpen(false);
        });
      }
    );
  }, [form]);

  const onDelete = React.useCallback(() => {
    dispatch(destroy(context, "grh/api/statues", item, "statue")).then(
      (result) => {
        dispatch(list(context, "grh/api/statues", 1, {})).then((res) =>
          setOpen(false)
        );
      }
    );
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
          Statue: {form.statue}
        </Typography>
      </DialogTitle>
      <DialogContent
        style={{
          backgroundColor: form.statue
            ? `${form.statue.colour}10`
            : "#edede910",
        }}
      >
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Input
            grid={{ xs: 12, md: 6 }}
            name="statue"
            placeholder="statue"
            label="Statue"
            handleChange={handleChange}
            value={form.statue}
            style={{}}
          />
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <AppSelector
              name="active"
              value={form.active}
              options={[
                { display: "Active", value: 1 },
                { display: "Non Active", value: 0 },
              ]}
              handleChange={handleChange}
              height={28}
              horizontal={true}
              width={"auto"}
              style={{ width: "100%" }}
            />
          </Grid>
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
