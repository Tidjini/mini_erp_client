import React, { useCallback, useEffect } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import {
  list,
  retrieve,
  save,
  destroy,
} from "app/services/infrabitumService/ActionService";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { useForm } from "@fuse/hooks";

import { defaultItem } from "./ExpeditionConfig";
import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import Input from "app/main/composants/inputs/Input";
import Header from "app/main/composants/view/Header.v2";
import AppSelector from "app/composants/inputs/AppSelector";

const Title = ({ style }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Expedition</span>
  </Typography>
);

function ExpeditionView(props) {
  const { match, history } = props;
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(defaultItem);

  const produits = useSelector(
    ({ production_expedition }) => production_expedition.produits.results
  );
  const postes = useSelector(
    ({ production_expedition }) => production_expedition.poste.results
  );
  const equipes = useSelector(
    ({ production_expedition }) => production_expedition.equipe.results
  );
  const responsables = useSelector(
    ({ production_expedition }) => production_expedition.responsable.results
  );
  const expedition = useSelector(
    ({ production_expedition }) => production_expedition.expedition
  );

  useEffect(() => {
    if (expedition.id === "") {
      setForm(defaultItem);
    } else {
      setForm(expedition);
    }
  }, [expedition]);

  useEffect(() => {
    const { expedition_id } = match.params;
    dispatch(list("EXPEDITION-PRODUIT", "production/produits", 1));
    dispatch(
      list("EXPEDITION-RESPONSABLE", "gestion/employees", 1, {
        service: "production",
      })
    );
    dispatch(list("EXPEDITION-POSTE", "production/postes", 1));
    dispatch(list("EXPEDITION-EQUIPE", "production/equipes", 1));

    //expedition_id
    if (expedition_id === "nouveau") {
      setForm(defaultItem);
    } else {
      dispatch(retrieve("EXPEDITION", "production/expeditions", expedition_id));
    }
  }, [match]);

  const saveExpedition = useCallback(
    (event) => {
      const { produit } = form;
      if (produit == null || produit === undefined || produit === "") {
        form.produit = produits[0].value;
      }
      const data = { ...form, date: form.date.substring(0, 10) };

      dispatch(save("expedition", "production/expeditions", data)).then(
        (result) => {
          history.push(`/expeditions/`);
        }
      );
    },
    [form]
  );

  const deleteExpedition = useCallback(
    (event) => {
      dispatch(destroy("expedition", "production/expeditions", form)).then(
        (result) => {
          history.push(`/expeditions/`);
        }
      );
    },
    [form]
  );

  return (
    <div style={styles.container}>
      <Grid container>
        <Header
          style={styles}
          icon="assets/images/app_production/maintenance.png"
          onBackClicked={(e) => {
            history.push(`/expeditions/`);
          }}
          title={<Title style={styles} date={form.date} />}
          onSave={saveExpedition}
          onDelete={deleteExpedition}
        />

        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={styles.boxContainer}
        >
          <Grid container style={styles.box}>
            <div style={{ width: "100%", marginBottom: 35 }}>
              <AppSelector
                name="produit"
                label="Produit"
                value={form.produit}
                options={produits}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginLeft: 5 }}
              />
            </div>

            <Grid container>
              <Input
                grid={{ xs: 6 }}
                name="nbr_palette"
                placeholder="nbr_palette"
                label="N° Palette"
                type="number"
                handleChange={handleChange}
                value={form.nbr_palette}
                style={{}}
              />
              <Input
                grid={{ xs: 6 }}
                name="nbr_piece"
                placeholder="nbr piece"
                label="N° Pieces"
                type="number"
                handleChange={handleChange}
                value={form.nbr_piece}
                style={{}}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={styles.boxContainer}
        >
          <Grid container style={styles.box}>
            <Input
              grid={{ xs: 12, sm: 6 }}
              name="date"
              type="date"
              label="date"
              format="DD/MM/YYYY"
              handleChange={handleChange}
              value={form.date.substring(0, 10)}
              style={{}}
            />
            <Grid item xs={12} sm={6}>
              <AppSelector
                name="poste"
                label="Poste"
                value={form.poste}
                options={postes}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginLeft: 5, marginBottom: 36 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withReducer("production_expedition", reducer)(ExpeditionView);
