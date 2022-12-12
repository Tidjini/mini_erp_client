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
import { defaultItem } from "./Config";
import { useForm } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import { list, save, destroy } from "app/services/application/ActionService";
import AppSelector from "app/composants/inputs/AppSelector";
import InputDate from "app/main/composants/inputs/InputDate";
import Lookup from "app/composants/Lookup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TacheDialog(props) {
  const dispatch = useDispatch();

  const { open, setOpen, item, context } = props;
  const { form, handleChange, setForm } = useForm(defaultItem);

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) setForm({ ...defaultItem });
    else {
      if (item === null) setForm({ ...defaultItem });
      else setForm(item);

      //just like the lookups.
      dispatch(list("TACHE-CATEGORIE", "api/app_tache/tache_categories", 1));
      dispatch(list("TACHE-STATUE", "api/app_tache/tache_statues", 1));
      dispatch(list("TACHE-URGENCE", "api/app_tache/tache_urgences", 1));
      dispatch(list("TACHE-EMPLOYE", "data_service/gestion/employees", 1));
    }
  }, [open, item]);

  const onSave = React.useCallback(() => {
    dispatch(save(context, "api/app_tache/taches", form)).then((result) => {
      dispatch(list(context, "api/app_tache/taches", 1, {})).then((res) => {
        setOpen(false);
      });
    });
  }, [form]);

  const onDelete = React.useCallback(
    (event) => {
      dispatch(
        destroy(context, "api/app_tache/taches", {
          id: form.id,
        })
      ).then((res) => {
        dispatch(list(context, "api/app_tache/taches", 1, {})).then((res) => {
          setOpen(false);
        });
      });
    },
    [form]
  );

  const categories = useSelector(({ tache }) => tache.tache.categories);
  const statues = useSelector(({ tache }) => tache.tache.statues);
  const urgences = useSelector(({ tache }) => tache.tache.urgences);
  const employes = useSelector(({ tache }) => tache.tache.employes);

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
        backgroundColor: form.statue ? `${form.statue.colour}10` : "#edede910",
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{
          backgroundColor: form.statue
            ? `${form.statue.colour}50`
            : "#edede950",
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={4}
          justify="flex-start"
        >
          <Grid item>
            {form.terminer && (
              <img
                src="assets/images/app_tache/done.png"
                style={{
                  width: 24,
                  height: 24,
                }}
              ></img>
            )}
            {!form.terminer && (
              <img
                src="assets/images/app_tache/in-progress.png"
                style={{
                  width: 24,
                  height: 24,
                }}
              ></img>
            )}
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#2b2d42",
                textDecoration: "underline",
              }}
            >
              Tâche: (id: {form.id})
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: form.urgence ? `${form.urgence.colour}` : "#2b2d42",
              }}
            >
              {form.urgence && `URGENCE: -- ${form.urgence.intitule}`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontWeight: 600,
                textTransform: "uppercase",
                backgroundColor: form.statue
                  ? `${form.statue.colour}`
                  : "#edede9",
                padding: "5px 15px",
                borderRadius: 4,
              }}
            >
              {form.statue ? `${form.statue.intitule}` : "-----"}
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent
        style={{
          backgroundColor: form.statue
            ? `${form.statue.colour}10`
            : "#edede910",
        }}
      >
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <AppSelector
              name="responsable"
              value={form.responsable}
              options={employes}
              handleChange={handleChange}
              label="Responsable"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <AppSelector
              name="tache_categorie"
              value={form.tache_categorie}
              options={categories}
              handleChange={handleChange}
              label="Tâche Catégorie"
            />
          </Grid>

          <Input
            grid={{ xs: 12, md: 6 }}
            name="description"
            placeholder="description"
            label="description"
            handleChange={handleChange}
            value={form.description}
            style={{}}
          />
          <Grid item sm={false} lg={2} />

          <Grid item xs={12} sm={6} md={3} lg={2}>
            <AppSelector
              name="tache_urgence"
              value={form.tache_urgence}
              options={urgences}
              handleChange={handleChange}
              label="Importance"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <Lookup
              name="tache_urgence"
              value={1}
              options={[
                { display: "Tache", value: 1 },
                { display: "Tache 2", value: 2 },
              ]}
              handleChange={(e) => {}}
              label="Importance 2"
            />
          </Grid>

          {/* <Grid item xs={0} sm={5} md={8} lg={9} /> */}

          <InputDate
            grid={{ xs: 12, sm: 6, md: 3 }}
            name="debut"
            placeholder="Date début"
            type="datetime-local"
            label="Début"
            handleChange={handleChange}
            value={form.debut}
          />
          <InputDate
            grid={{ xs: 12, sm: 6, md: 3 }}
            name="fin"
            placeholder="Date Fin"
            type="datetime-local"
            label="Fin"
            handleChange={handleChange}
            value={form.fin}
          />
          <Grid item sm={false} md={6} lg={4} />

          <Grid item xs={12} sm={6} md={3}>
            <AppSelector
              name="tache_statue"
              value={form.tache_statue}
              options={statues}
              handleChange={handleChange}
              label="Tâche Statue"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        style={{
          backgroundColor: form.statue
            ? `${form.statue.colour}10`
            : "#edede910",
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
            backgroundColor: "#e63946",
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
