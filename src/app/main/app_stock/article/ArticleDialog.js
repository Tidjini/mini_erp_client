import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
} from "@material-ui/core";

import { viewStyles as styles } from "app/main/hooks/ViewStyles";
import Input from "app/main/composants/inputs/Input";
import { defaultItem } from "./ArticleConfig";
import { useForm } from "@fuse/hooks";
import { useDispatch } from "react-redux";
import { list, save } from "app/services/infrabitumService/ActionService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ArticleDialog(props) {
  const dispatch = useDispatch();

  const { open, setOpen, item, context } = props;
  const { form, handleChange, setForm } = useForm(defaultItem);

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) setForm(defaultItem);
    else {
      if (item === null) setForm(defaultItem);
      else setForm(item);
    }
  }, [open, item]);

  const onSave = React.useCallback(() => {
    dispatch(save(context, "articles", form)).then((result) => {
      dispatch(list(context, "articles", 1, {})).then((res) => {
        setOpen(false);
      });
    });
  }, [form]);

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
      <DialogTitle id="alert-dialog-title">
        {`Article: ${form.designation} - ${form.dernier_achat}`}
      </DialogTitle>
      <DialogContent>
        <Grid container style={{ ...styles.box, padding: 0, margin: 0 }}>
          <Input
            grid={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            name="reference"
            placeholder="Reference"
            label="Référence"
            handleChange={handleChange}
            value={form.reference}
            style={{}}
          />
          <Input
            grid={{ xs: 12, sm: 6, md: 4 }}
            name="designation"
            placeholder="designation"
            label="Désignation"
            handleChange={handleChange}
            value={form.designation}
            style={{}}
          />
          <Input
            grid={{ sm: 4, md: 1 }}
            name="unite"
            placeholder="unite"
            label="Unite"
            handleChange={handleChange}
            value={form.unite}
            style={{}}
          />
          <Input
            grid={{ sm: 4, md: 2 }}
            name="achat_period"
            placeholder="Periode (Jour)"
            label="Per. Achat"
            handleChange={handleChange}
            value={form.achat_period}
            style={{}}
            type="number"
          />
          <Input
            grid={{ sm: 4, md: 2 }}
            name="tolere_achat"
            placeholder="tolere_achat"
            label="Tolé. Achat %"
            handleChange={handleChange}
            value={form.tolere_achat}
            style={{}}
            type="number"
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave} autoFocus>
          Sauvgarder
        </Button>
        <Button onClick={handleClose}> Annuler</Button>
      </DialogActions>
    </Dialog>
  );
}
