import React, { useCallback, useEffect } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { list } from "app/services/infrabitumService/ActionService";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { useForm } from "@fuse/hooks";

import { defaultItem } from "./EntreSortieConfig";
import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import Input from "app/main/composants/inputs/Input";
import Header from "app/main/composants/view/Header.v2";
import AppSelector from "app/composants/inputs/AppSelector";

const Title = ({ style }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Entrée Sortie</span>
  </Typography>
);

function EntreSortieView(props) {
  const { match, history } = props;
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(defaultItem);

  const produits = useSelector(
    ({ production_entre_sortie }) => production_entre_sortie.produits.results
  );
  const entreSortie = useSelector(
    ({ production_entre_sortie }) => production_entre_sortie.entresorties.item
  );

  useEffect(() => {
    if (entreSortie.id === "") {
      setForm(defaultItem);
    } else {
      setForm(entreSortie);
    }
  }, [entreSortie]);

  useEffect(() => {
    const { entre_sortie_id } = match.params;
    dispatch(list("PRODUIT", "production/produits", 1));

    if (entre_sortie_id === "nouveau") {
      dispatch(Actions.setNew());
    } else {
      dispatch(Actions.getEntreSortie(entre_sortie_id));
    }
  }, [match]);

  const saveEntreSortie = useCallback(
    (event) => {
      const { produit } = form;
      if (produit == null || produit === undefined || produit === "") {
        form.produit = produits[0].value;
      }
      const data = { ...form, date: form.date.substring(0, 10) };

      dispatch(Actions.save(data)).then((result) => {
        history.push(`/entres-sorties/`);
      });
    },
    [form]
  );

  const deleteEntreSortie = useCallback(
    (event) => {
      dispatch(Actions.onDelete(form)).then((result) => {
        history.push(`/entres-sorties/`);
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
            history.push(`/entres-sorties/`);
          }}
          title={<Title style={styles} date={form.date} />}
          onSave={saveEntreSortie}
          onDelete={deleteEntreSortie}
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
            <Grid xs={12} sm={6}>
              <AppSelector
                name="type"
                label="Type"
                value={form.type}
                options={[
                  { display: "Entrée", value: "ENTREE" },
                  { display: "Sortie", value: "SORTIE" },
                ]}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginLeft: 5, marginBottom: 36 }}
              />
            </Grid>
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
          </Grid>
          <Grid container style={{ ...styles.box, height: 176 }}>
            <Input
              grid={{ xs: 12 }}
              name="observation"
              placeholder="Observation sur cette entreé ou sortie ..."
              label="observation"
              handleChange={handleChange}
              value={form.observation}
              style={{
                rows: 5,
                multiline: true,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withReducer("production_entre_sortie", reducer)(EntreSortieView);
