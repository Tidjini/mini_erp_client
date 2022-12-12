import React, { useCallback, useEffect } from "react";
import { URL } from "app/main/helpers/endpoints";
// import withReducer from "app/store/withReducer";
// import reducer from "./store/reducer";
// import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

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
import { useForm } from "@fuse/hooks";

import { defaultItem } from "./Config";
import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import Input from "app/main/composants/inputs/Input";
import Header from "app/main/composants/view/Header.v2";
import {
  list,
  save,
  destroy,
  retrieve,
} from "app/services/application/ActionService";
import InputDate from "app/main/composants/inputs/InputDate";
import LookupCollection from "app/composants/LookupCollection";
import AutoCompleteCollection from "app/composants/AutoCompleteCollection";
import AppSelector from "app/composants/inputs/AppSelector";
import axios from "axios";
const Title = ({ style, nom }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Tache °</span> {nom}
  </Typography>
);

const SubTitle = ({ cloture }) => <Typography></Typography>;

export default function TacheView(props) {
  const { match, history } = props;
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(defaultItem);

  //   const tache = useSelector(({ collection }) => collection.tache.item);
  //   const [tache, setTache] = React.useState(defaultItem);

  useEffect(() => {
    const { tacheId } = match.params;

    if (tacheId === "nouveau") {
      setForm(null);
      setForm({ ...defaultItem });
    } else {
      axios
        .get(`${URL}/tache/api/taches/${tacheId}/`)
        .then((response) => {
          setForm(response.data);
        })
        .catch((error) => {
          setForm(defaultItem);
        });
    }
  }, [match]);

  //   useEffect(() => {
  //     console.log("item", tache);
  //     if (tache && tache.id !== 0) setForm(tache);
  //     else setForm({ ...defaultItem });
  //   }, [tache]);

  const onSave = useCallback(
    (event) => {
      dispatch(save("TACHE", "tache/api/taches", form)).then((result) => {
        history.push(`/tache-list/`);
      });
    },
    [form]
  );

  const onDelete = useCallback(
    (event) => {
      dispatch(destroy("TACHE", "tache/api/taches", form)).then((result) => {
        history.push(`/tache-list/`);
      });
    },
    [form]
  );

  React.useEffect(() => {
    dispatch(list("TACHE-CATEGORIE", "tache/api/tache_categories", 1));
  }, []);

  return (
    <div style={styles.container}>
      <Dialog
        open={true}
        keepMounted
        onClose={(e) => {
          e.stopPropagation();
          //   handleClose(e);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
        style={{
          backgroundColor: form.statue
            ? `${form.statue.colour}10`
            : "#edede910",
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
                {form.urgence && `${form.urgence.intitule}`}
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
            height: "auto",
            minHeight: 300,
          }}
        >
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              {/* <AppSelector
              name="for_employe"
              value={form.for_employe}
              options={employes}
              handleChange={handleChange}
              label="Responsable"
            /> */}

              <AutoCompleteCollection
                name="for_employe"
                handleChange={(name, item) => {
                  setForm({ ...form, for_employe: item.value });
                }}
                value={form.for_employe}
                selected={{ value: form.for_employe, display: "LR" }}
                label="Responsable"
                context="GESTION-EMPLOYE"
                link="grh/api/employes"
                collection={useSelector(
                  (state) => state.collection.gestion.employes.results
                )}
                display={["nom", "prenom"]}
                emptyValue="Non Définie"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <LookupCollection
                name="categorie"
                value={form.categorie}
                handleChange={handleChange}
                label="Tâche Catégorie"
                context="TACHE-CATEGORIE"
                link="api/app_tache/tache_categories"
                display={["intitule"]}
                collection={useSelector(
                  (state) => state.collection.tache.categories
                )}
                emptyValue="Non Définie"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={2}>
              <AppSelector
                name="urgence"
                label="Urgence"
                value={form.urgence}
                options={[
                  { display: "Normal", value: 1 },
                  { display: "Urgent", value: 2 },
                  { display: "Très urgent", value: 3 },
                ]}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginBottom: 30 }}
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

            <Grid item xs={12} sm={6} md={3} lg={2}>
              <AppSelector
                name="statue"
                label="Statue"
                value={form.statue}
                options={[
                  { display: "Pause", value: 1 },
                  { display: "En Cours", value: 2 },
                  { display: "Terminer", value: 3 },
                ]}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginBottom: 30 }}
              />
            </Grid>
            <Input
              grid={{ xs: 12 }}
              name="description"
              placeholder="description"
              label="description"
              handleChange={handleChange}
              value={form.description}
              style={{
                rows: 5,
                multiline: true,
              }}
            />
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
            onClick={() => {
              history.push(`/tache-list/`);
            }}
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
    </div>
  );
}

// export default withReducer("tache", reducer)(TacheView);
