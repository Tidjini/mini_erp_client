import React, { useEffect, useState } from "react";

import withReducer from "app/store/withReducer";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Grid,
  Icon,
  Input,
  Paper,
  Dialog,
  Slide,
} from "@material-ui/core";
import AppExerciceActif from "../components/AppExerciceActif";
import AppDossierActif from "../components/AppDossierActif";
import AppExercice from "../components/AppExercice";
import AppDossier from "../components/AppDossier";
import AppStaticCard from "app/main/components/AppStaticCard";
import AppRecapCompte from "../components/AppRecapCompte";
import AppResult from "../components/AppResult";
import CompteTable from "./CompteTable";
import CreateFolder from "./CreateFolder";
import { SAISIE_STATUES_TOUS, JOURNAUX_TOUS } from "app/helpers/statics";
import AppAutoComplete from "app/composants/inputs/AppAutoComplete";
import AppJournalInput from "../components/AppJournalInput";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Dashboard() {
  const dispatch = useDispatch();
  const exercices = useSelector(({ dashboard }) => dashboard.exercices);
  const dossiers = useSelector(({ dashboard }) => dashboard.dossiers);
  const exercice_actif = useSelector(
    ({ dashboard }) => dashboard.exercice_actif
  );
  const dossier_actif = useSelector(({ dashboard }) => dashboard.dossier_actif);
  const comptes = useSelector(({ dashboard }) => dashboard.comptes);

  const bilan = useSelector(({ dashboard }) => dashboard.bilan);
  const balance = useSelector(({ dashboard }) => dashboard.balance);
  const result = useSelector(({ dashboard }) => dashboard.result);

  const [openCompteTable, setOpenCompteTable] = useState(false);
  const [journal, setJournal] = useState("");
  const [journalInput, setJournalInput] = useState("");
  const [selectedCompte, setSelectedCompte] = useState(null);
  const [openCreationfolder, setOpenCreationfolder] = useState(false);

  useEffect(() => {
    dispatch(Actions.getActiveDossier());
  }, []);

  useEffect(() => {
    dispatch(Actions.getDossiers());

    if (dossier_actif.entreprise === "") {
      setOpenCreationfolder(true);
    } else {
      setOpenCreationfolder(false);
      dispatch(Actions.getExercices());
      dispatch(Actions.getActiveExercice());
    }
  }, [dossier_actif]);

  useEffect(() => {
    dispatch(Actions.getExercices());
    if (exercice_actif.id !== "") {
      dispatch(Actions.getDashboards());
      dispatch(Actions.getBalance());
    } else {
      dispatch(Actions.emptyDashboard());
    }
  }, [exercice_actif]);

  const openExercice = (exerciceId) => {
    dispatch(Actions.switchToExercice(exerciceId));
  };
  const openFolder = (database) => {
    dispatch(Actions.switchToFolder(database));
  };

  const onCompteClick = (compte) => {
    setSelectedCompte(compte);

    console.log("compte.compte", compte);

    if (compte !== null && compte !== undefined && compte !== "") {
      setOpenCompteTable(true);
    }
  };

  const onBalanceClick = () => {
    try {
      window.open(URL + "media/balance.pdf", "_blank").focus();
    } catch (error) {}
  };

  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: 10,
          marginBottom: 20,
        }}
      >
        <img
          alt="state"
          src={"assets/images/compta/folders.png"}
          style={{
            width: 72,
            height: 72,
            padding: 15,
            borderRadius: 56,
            background: "#EE9B00",
          }}
        />
        <h4
          style={{
            fontSize: 36,
            marginLeft: 20,
            color: "#264653",
          }}
        >
          Comptabilité Générale
        </h4>
        <div className="flex flex-1 items-center justify-end px-12">
          <Paper
            className="flex items-center w-full max-w-512 px-8 py-8 rounded-8"
            elevation={1}
          >
            <Icon className="mr-8" color="action">
              search
            </Icon>

            <Input
              placeholder="Recherche dossier ou autre"
              className="flex flex-1"
              disableUnderline
              fullWidth
              inputProps={{
                "aria-label": "Recherche",
              }}
            />
          </Paper>
        </div>
      </div>

      <Grid container>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <AppDossierActif dossier_actif={dossier_actif} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={6}
          lg={8}
          xl={9}
          style={{ alignItems: "end" }}
        >
          {dossiers.map((d, index) => (
            <Grid item xs={12} md={4} lg={3} key={index}>
              <AppDossier dossier={d} openFolder={openFolder} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          {exercice_actif.id !== "" && (
            <AppExercice
              exercice={exercice_actif}
              openExercice={openExercice}
              isActive={true}
            />
          )}
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={6}
          lg={8}
          xl={9}
          style={{ alignItems: "end" }}
        >
          {exercices.map((e) => (
            <Grid item xs={12} md={4} lg={3}>
              <AppExercice exercice={e} openExercice={openExercice} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <AppRecapCompte compte={balance} onCompteClick={onBalanceClick} />
        </Grid>
        {comptes.results.map((c, index) => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={index}>
            <AppRecapCompte compte={c} onCompteClick={onCompteClick} />
          </Grid>
        ))}
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={6}>
          <AppResult result={bilan} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppResult result={result} />
        </Grid>
      </Grid>

      <Dialog
        open={openCompteTable}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenCompteTable(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <CompteTable compte={selectedCompte} />
      </Dialog>

      <CreateFolder open={openCreationfolder} setOpen={setOpenCreationfolder} />
    </div>
  );
}

export default withReducer("dashboard", reducer)(Dashboard);
