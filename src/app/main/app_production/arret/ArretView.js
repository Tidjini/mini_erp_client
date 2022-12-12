import React, { useCallback, useEffect } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { useForm } from "@fuse/hooks";

import { defaultItem } from "./ArretConfig";
import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import Input from "app/main/composants/inputs/Input";
import Header from "app/main/composants/view/Header.v2";
import AppSelector from "app/composants/inputs/AppSelector";

const Title = ({ style }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Arret / </span>Maintenance
  </Typography>
);

function ArretView(props) {
  const { match, history } = props;
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(defaultItem);
  const arret = useSelector(({ production_arret }) => production_arret.arret);
  const employees = useSelector(
    ({ production_arret }) => production_arret.employees.results
  );
  const postes = useSelector(
    ({ production_arret }) => production_arret.postes.results
  );

  useEffect(() => {
    if (arret.id !== "") setForm(arret);
    else setForm(defaultItem);
  }, [arret]);

  useEffect(() => {
    const { arretId } = match.params;

    if (arretId === "nouveau") {
      dispatch(Actions.setNewArret());
    } else {
      dispatch(Actions.getArret(arretId));
    }
    dispatch(
      Actions.getEmployeCollection(1, { service__service: "Production" })
    );
    dispatch(Actions.getPosteCollection());
  }, [match]);

  const completeChecker = (value) =>
    !(value === null || value === undefined || value === "");

  const validation = () => {
    if (!completeChecker(form.intervenant)) {
      form.intervenant = employees[1].value;
    }
    if (!completeChecker(form.poste)) {
      form.poste = postes[1].value;
    }
    form.date = form.date.substring(0, 10);

    return form;
  };
  const saveArret = useCallback(
    (event) => {
      let data = validation();
      data = { ...data, date: form.date.substring(0, 10) };

      dispatch(Actions.saveArret(data)).then((result) => {
        history.push(`/production-arrets/`);
        dispatch(Actions.initArret());
      });
    },
    [form]
  );

  const deleteArret = useCallback(
    (event) => {
      dispatch(Actions.deleteArret(form)).then((result) => {
        history.push(`/production-arrets/`);
        dispatch(Actions.initArret());
      });
    },
    [form]
  );

  return (
    <div style={styles.container}>
      <Grid container>
        {/* header */}
        <Header
          style={styles}
          icon="assets/images/app_production/maintenance.png"
          onBackClicked={(e) => {
            history.push(`/production-arrets/`);
          }}
          title={<Title style={styles} />}
          onSave={saveArret}
          onDelete={deleteArret}
          backgroundColor={"#023047"}
        />
        {/* header */}

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
                name="intervenant"
                label="Intervenant"
                value={form.intervenant}
                options={employees}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginLeft: 5 }}
              />
            </div>
            <div style={{ width: "100%", marginBottom: 35 }}>
              <AppSelector
                name="poste"
                label="Poste"
                value={form.poste}
                options={postes}
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
                name="heure_debut"
                placeholder="heure_debut"
                label="debut"
                handleChange={handleChange}
                value={form.heure_debut}
                style={{}}
              />
              <Input
                grid={{ xs: 6 }}
                name="heure_fin"
                placeholder="heure_fin"
                label="fin"
                handleChange={handleChange}
                value={form.heure_fin}
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
            <Grid item xs={12}>
              <AppSelector
                name="type_arret"
                label="Phase"
                value={form.type_arret}
                options={[
                  { display: "PRODUCTION", value: "PRODUCTION" },
                  { display: "EMBALLAGE", value: "EMBALLAGE" },
                ]}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginLeft: 5, marginBottom: 30 }}
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
            <Input
              grid={{ xs: 12, sm: 6 }}
              name="type_intervention"
              placeholder="type_intervention"
              label="Type"
              handleChange={handleChange}
              value={form.type_intervention}
              style={{}}
            />
            <Input
              grid={{ xs: 12 }}
              name="equipement"
              placeholder="equipement"
              label="equipement"
              handleChange={handleChange}
              value={form.equipement}
              style={{}}
            />
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
          <Grid container style={{ ...styles.box, height: 176 }}>
            <Input
              grid={{ xs: 12 }}
              name="description"
              placeholder="Arrét Cause ou Explication ou Intervention(Plus Information) ..."
              label="description"
              handleChange={handleChange}
              value={form.description}
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

export default withReducer("production_arret", reducer)(ArretView);
