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

import { defaultItem } from "./CasseConfig";
import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import Input from "app/main/composants/inputs/Input";
import Header from "app/main/composants/view/Header.v2";
import AppSelector from "app/composants/inputs/AppSelector";

const Title = ({ style }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Casse</span>
  </Typography>
);

function CasseView(props) {
  const { match, history } = props;
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(defaultItem);

  const produits = useSelector(
    ({ production_casse }) => production_casse.produits.results
  );
  const postes = useSelector(
    ({ production_casse }) => production_casse.poste.results
  );
  const equipes = useSelector(
    ({ production_casse }) => production_casse.equipe.results
  );
  const responsables = useSelector(
    ({ production_casse }) => production_casse.responsable.results
  );
  const casse = useSelector(({ production_casse }) => production_casse.casse);

  useEffect(() => {
    if (casse.id === "") {
      setForm(defaultItem);
    } else {
      setForm(casse);
    }
  }, [casse]);

  useEffect(() => {
    const { casse_id } = match.params;
    dispatch(list("CASSE-PRODUIT", "production/produits", 1));
    dispatch(
      list("CASSE-RESPONSABLE", "gestion/employees", 1, {
        service: "production",
      })
    );
    dispatch(list("CASSE-POSTE", "production/postes", 1));
    dispatch(list("CASSE-EQUIPE", "production/equipes", 1));

    //casse_id
    if (casse_id === "nouveau") {
      setForm(defaultItem);
    } else {
      dispatch(retrieve("CASSE", "production/casses", casse_id));
    }
  }, [match]);

  const saveCasse = useCallback(
    (event) => {
      const { produit } = form;
      if (produit == null || produit === undefined || produit === "") {
        form.produit = produits[0].value;
      }
      const data = { ...form, date: form.date.substring(0, 10) };

      dispatch(save("casse", "production/casses", data)).then((result) => {
        history.push(`/casses/`);
      });
    },
    [form]
  );

  const deleteCasse = useCallback(
    (event) => {
      dispatch(destroy("casse", "production/casses", form)).then((result) => {
        history.push(`/casses/`);
      });
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
            history.push(`/casses/`);
          }}
          title={<Title style={styles} date={form.date} />}
          onSave={saveCasse}
          onDelete={deleteCasse}
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
          <Grid container style={styles.box} spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <AppSelector
                name="type"
                label="Type"
                value={form.type}
                options={[
                  { display: "INTERIEUR", value: "INTERIEUR" },
                  { display: "EXTERIEUR", value: "EXTERIEUR" },
                ]}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginBottom: 30 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <AppSelector
                name="produit"
                label="Produit"
                value={form.produit}
                options={produits}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginBottom: 30 }}
              />
            </Grid>

            <Grid container>
              <Input
                grid={{ xs: 12, sm: 12, md: 6 }}
                name="nbr_palette"
                placeholder="nbr_palette"
                label="N° Palette"
                type="number"
                handleChange={handleChange}
                value={form.nbr_palette}
                style={{}}
              />
              <Input
                grid={{ xs: 12, sm: 12, md: 6 }}
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
          <Grid container style={styles.box} spacing={1}>
            <Input
              grid={{ xs: 12, sm: 12, md: 6 }}
              name="date"
              type="date"
              label="date"
              format="DD/MM/YYYY"
              handleChange={handleChange}
              value={form.date.substring(0, 10)}
              style={{}}
            />
            <Grid item xs={12} sm={12} md={6}>
              <AppSelector
                name="poste"
                label="Poste"
                value={form.poste}
                options={postes}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginBottom: 28 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withReducer("production_casse", reducer)(CasseView);
