import React, { useCallback, useEffect, useState } from "react";

import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm } from "@fuse/hooks";

import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import Input from "app/main/composants/inputs/Input";
import Header from "app/main/composants/view/Header";
import Transition from "app/main/helpers/Transition";
import AppSelector from "app/composants/inputs/AppSelector";

const Title = ({ style, date_debut }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Arret / </span>Maintenance
  </Typography>
);

const SubTitle = ({ cloture }) => <Typography></Typography>;

function ArretDialog(props) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { form, handleChange, setForm } = useForm({
    id: "",
    intervenant_object: null,
    description: "",
    zone: "",
    type_arret: "PRODUCTION",
    equipement: "",
    duree_minute: 0,
    poste: "",
    date: "",
    heure_debut: "08:00",
    heure_fin: "08:05",
    intervenant: null,
  });

  const employees = useSelector(
    ({ production_main }) => production_main.employees.results
  );
  const [employs, setEmploys] = useState([]);

  useEffect(() => {
    const emps = [];
    emps.push({
      display: `Non Définie`,
      value: null,
    });
    employees.map((employ) => {
      emps.push({
        display: `${employ.nom} ${employ.prenom}`,
        value: employ.id,
      });
    });
    setEmploys(emps);
  }, [employees]);

  useEffect(() => {
    setForm({
      id: "",
      intervenant_object: "",
      description: "",
      zone: "",
      type_arret: "PRODUCTION",
      equipement: "",
      duree_minute: 0,
      poste: props.poste,
      date: props.date,
      heure_debut: "08:00",
      heure_fin: "08:05",
      intervenant: "",
    });
  }, [open]);

  const saveArret = (event) => {
    const data = { ...form, date: form.date.substring(0, 10) };
    dispatch(Actions.saveArret(data)).then((response) => {
      setForm({
        id: "",
        intervenant_object: "",
        description: "",
        zone: "",
        type_arret: "PRODUCTION",
        equipement: "",
        duree_minute: 0,
        poste: props.poste,
        date: props.date,
        heure_debut: "08:00",
        heure_fin: "08:05",
        intervenant: "",
      });

      setOpen(false);
    });
  };

  const saveArretNew = (event) => {
    const data = { ...form, date: form.date.substring(0, 10) };
    dispatch(Actions.saveArret(data)).then((result) => {
      setForm({
        id: "",
        intervenant_object: "",
        description: "",
        zone: "",
        type_arret: "PRODUCTION",
        equipement: "",
        duree_minute: 0,
        poste: props.poste,
        date: props.date,
        heure_debut: "08:00",
        heure_fin: "08:05",
        intervenant: "",
      });

      setOpen(false);

      setTimeout(() => {
        setOpen(true);
      }, 200);
    });
  };
  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          margin: "0 20px 0 0",
          boxShadow: "none",
          backgroundColor: "#e63946",
          color: "#EFF1FF",
          height: 28,
          fontSize: 12,
          textTransform: "none",
        }}
        onClick={handleClickOpen}
      >
        Arrêts
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent>
          <Grid container>
            <Header
              style={styles}
              icon="assets/images/app_production/maintenance.png"
              onBackClicked={handleClose}
              title={<Title style={styles} date_debut={form.date_debut} />}
              hint={<SubTitle />}
              onSave={saveArret}
              onSaveAndNew={saveArretNew}
            />
            {/* header */}

            <Grid item container xs={12} sm={4} style={styles.boxContainer}>
              <Grid container style={styles.box}>
                <div style={{ width: "100%", marginBottom: 35 }}>
                  <AppSelector
                    name="intervenant"
                    label="Intervenant"
                    value={form.intervenant}
                    options={employs}
                    handleChange={handleChange}
                    height={28}
                    horizontal={false}
                    width={"auto"}
                    style={{ marginLeft: 5 }}
                  />
                </div>

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
            <Grid item container xs={12} sm={4} style={styles.boxContainer}>
              <Grid container style={styles.box}>
                <Input
                  grid={{ xs: 12 }}
                  name="equipement"
                  placeholder="equipement"
                  label="equipement"
                  handleChange={handleChange}
                  value={form.equipement}
                  style={{}}
                />

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
                  style={{ marginLeft: 5, marginBottom: 40 }}
                />
                <Input
                  grid={{ xs: 12 }}
                  name="zone"
                  placeholder="zone"
                  label="zone"
                  handleChange={handleChange}
                  value={form.zone}
                  style={{}}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={4} style={styles.boxContainer}>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withReducer("production_main", reducer)(ArretDialog);
