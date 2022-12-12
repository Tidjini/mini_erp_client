import React, { useCallback, useEffect } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { useForm } from "@fuse/hooks";

import { defaultItem } from "./EmployeConfig";
import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import Input from "app/main/composants/inputs/Input";
import Header from "app/main/composants/view/Header.v2";
import { list } from "app/services/infrabitumService/ActionService";
import AppSelector from "app/composants/inputs/AppSelector";

const Title = ({ style, nom }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Employe °</span> {nom}
  </Typography>
);

const SubTitle = ({ cloture }) => <Typography></Typography>;

function EmployeView(props) {
  const { match, history } = props;
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(defaultItem);

  const employe = useSelector(
    ({ production_employe }) => production_employe.employe
  );

  useEffect(() => {
    dispatch(list("EMPLOYE-SERVICE", "gestion/services", 1));

    const { employeId } = match.params;

    if (employeId === "nouveau") {
      dispatch(Actions.setNewEmploye());
    } else {
      dispatch(Actions.getEmploye(employeId));
    }
  }, [match]);

  useEffect(() => {
    if (employe.id !== "") setForm(employe);
    else setForm(defaultItem);
  }, [employe]);

  const saveEmploye = useCallback(
    (event) => {
      dispatch(Actions.saveEmploye(form)).then((result) => {
        history.push(`/gestion-employees/`);
      });
    },
    [form]
  );

  const deleteEmploye = useCallback(
    (event) => {
      dispatch(Actions.deleteEmploye(form)).then((result) => {
        history.push(`/gestion-employees/`);
      });
    },
    [form]
  );

  const services = useSelector(
    ({ production_employe }) => production_employe.service.results
  );

  return (
    <div style={styles.container}>
      <Grid container>
        {/* header */}
        <Header
          style={styles}
          icon="assets/images/man.png"
          onBackClicked={(e) => {
            history.push(`/gestion-employees/`);
          }}
          title={<Title style={styles} nom={form.nom} />}
          hint={<SubTitle />}
          onSave={saveEmploye}
          onDelete={deleteEmploye}
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
            <Grid item xs={12}>
              <AppSelector
                name="service"
                label="Service"
                value={form.service}
                options={services}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginBottom: 36 }}
              />
            </Grid>
            <Input
              grid={{ xs: 12 }}
              name="nom"
              placeholder="Nom"
              label="Nom"
              handleChange={handleChange}
              value={form.nom}
              style={{}}
            />

            <Input
              grid={{ xs: 12 }}
              name="prenom"
              placeholder="prenom"
              label="prénom"
              handleChange={handleChange}
              value={form.prenom}
              style={{}}
            />
            <Input
              grid={{ xs: 12 }}
              name="poste"
              placeholder="poste"
              label="poste"
              handleChange={handleChange}
              value={form.poste}
              style={{}}
            />
            <Input
              grid={{ xs: 12 }}
              name="telephone"
              placeholder="telephone"
              label="telephone"
              handleChange={handleChange}
              value={form.telephone}
              style={{}}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withReducer("production_employe", reducer)(EmployeView);
