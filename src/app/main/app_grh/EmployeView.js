import React, { useCallback, useEffect } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { useForm } from "@fuse/hooks";

import { defaultEmploye } from "./Config";
import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import Input from "app/main/composants/inputs/Input";
import Header from "app/main/composants/view/Header.v2";
import {
  list,
  save,
  destroy,
  retrieve,
} from "app/services/application/ActionService";
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
  const { form, handleChange, setForm } = useForm(defaultEmploye);

  const employe = useSelector(({ grh_employe }) => grh_employe.employe.item);

  useEffect(() => {
    const { employeId } = match.params;

    if (employeId === "nouveau") {
      setForm({ ...defaultEmploye });
    } else {
      dispatch(retrieve("EMPLOYE-GRH", "grh/api/employes", employeId));
    }
  }, [match]);

  useEffect(() => {
    if (employe.id !== "") setForm(employe);
    else setForm({ ...defaultEmploye });
  }, [employe]);

  const saveEmploye = useCallback(
    (event) => {
      dispatch(save("EMPLOYE-GRH", "grh/api/employes", form)).then((result) => {
        history.push(`/employe-list/`);
      });
    },
    [form]
  );

  const deleteEmploye = useCallback(
    (event) => {
      dispatch(destroy("EMPLOYE-GRH", "grh/api/employes", form)).then(
        (result) => {
          history.push(`/employe-list/`);
        }
      );
    },
    [form]
  );

  React.useEffect(() => {
    dispatch(list("SERVICE-GRH", "grh/api/services", 1));
    dispatch(list("POSTE-GRH", "grh/api/postes", 1));
    dispatch(list("STATUE-GRH", "grh/api/statues", 1));
  }, []);
  const services = useSelector(
    ({ grh_employe }) => grh_employe.service.collection
  );

  const postes = useSelector(({ grh_employe }) => grh_employe.poste.collection);
  const statues = useSelector(
    ({ grh_employe }) => grh_employe.statue.collection
  );

  return (
    <div style={styles.container}>
      <Grid container>
        {/* header */}
        <Header
          style={styles}
          icon="assets/images/man.png"
          onBackClicked={(e) => {
            history.push(`/employe-list/`);
          }}
          title={<Title style={styles} nom={form.nom} />}
          hint={<SubTitle />}
          onSave={saveEmploye}
          onDelete={deleteEmploye}
        />

        {/* header */}

        <Grid item container xs={12} style={styles.boxContainer}>
          <Grid container sm={6} md={4} lg={3} style={styles.box}>
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
              name="telephone"
              placeholder="telephone"
              label="telephone"
              handleChange={handleChange}
              value={form.telephone}
              style={{}}
            />
          </Grid>
          <Grid
            container
            sm={6}
            md={4}
            lg={3}
            style={{ ...styles.box, marginLeft: 10 }}
          >
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
            <Grid item xs={12}>
              <AppSelector
                name="poste"
                label="poste"
                value={form.poste}
                options={postes}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginBottom: 36 }}
              />
            </Grid>
            <Grid item xs={12}>
              <AppSelector
                name="statue"
                label="statue"
                value={form.statue}
                options={statues}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginBottom: 36 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withReducer("grh_employe", reducer)(EmployeView);
