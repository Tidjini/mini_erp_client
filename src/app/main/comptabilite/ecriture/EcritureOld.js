import React, { useEffect, useState, useCallback } from "react";
import { showMessage } from "app/store/actions/fuse";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Table,
  TableBody,
  Typography,
  IconButton,
  Icon,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  TableRow,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Slide,
} from "@material-ui/core";
import { FuseScrollbars } from "@fuse";

import { JournalInput, PeriodeInput } from "app/composants/inputs";
import EcritureHeader from "./components/EcritureHeader";
import EcritureRow from "./components/EcritureRow";
import EcritureSummary from "./components/EcritureSummary";

import AppRowEditable from "app/composants/table/AppRowEditable";
import { ecriture_default } from "./EcritureConfig";
import { FusePageCarded } from "@fuse";
import EcritureInputTable from "./components/EcritureInputTable";
import { AppInputSearch } from "app/composants/inputs";
import AppInput from "app/composants/inputs/AppInput";
import AppSelector from "app/composants/inputs/AppSelector";
import { SAISIE_STATUES } from "app/helpers/statics";
import * as Controller from "./controllers/Ecriture";
import AppJournalInput from "../components/AppJournalInput";

const drawerWidth = 240;
const headerHeight = 200;
const toolbarHeight = 64;
const headerContentHeight = headerHeight - toolbarHeight;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// const defaultEntete = ;

function Ecriture(props) {
  const dispatch = useDispatch();
  const { match, history } = props;

  const [selected, setSelected] = useState(0);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  const [enteteState, setEntete] = useState({
    journal: "",
    date: "",
    num_piece: "",
    num_mouvement: 0,
    label: "",
    statut: "BROUILLARD",
  });
  const [date, setDate] = useState("");

  const [journal, setJournal] = useState(null);
  const [editing, setEditing] = useState(false);

  // const [periode, setPeriode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // const [rowsData, setRowsData] = useState([]);
  const [defaultEcriture, setDefaultEcriture] = useState(ecriture_default);
  const [searchDirty, setSearchDirty] = useState(false);

  const entete = useSelector(({ ecriture }) => ecriture.entete);
  const saved = useSelector(({ ecriture }) => ecriture.saved);
  const ecritures = useSelector(({ ecriture }) => ecriture.ecritures);
  const edit_cell = useSelector(({ ecriture }) => ecriture.edit_cell);
  const edit_line = useSelector(({ ecriture }) => ecriture.edit_line);
  const default_journal = useSelector(
    ({ ecriture }) => ecriture.default_journal
  );

  const exercice_actif = useSelector(({ ecriture }) => ecriture.exercice_actif);
  const summary = useSelector(({ ecriture }) => ecriture.summary);

  useEffect(() => {
    dispatch(Actions.clearEcritureList());
    dispatch(Actions.getActiveExercice());
    dispatch(Actions.getDefaultJournal());
    const today = new Date();
    setDate(today.toISOString().substring(0, 10));
  }, []);

  useEffect(() => {
    setOpenSaveDialog(saved);
  }, [saved]);

  // useEffect(() => {
  //   setEntete({ ...entete });
  // }, [entete]);

  useEffect(() => {
    getEcrituresFromServer();
  }, [exercice_actif]);

  function initialize(ecritures, default_journal, entete) {
    if (ecritures.length > 0) {
      setEntete({ ...entete, journal: ecritures[0].journal });
      setJournal({ ...ecritures[0].daily });
      setDefaultEcriture({
        ...ecriture_default,
        libelle: enteteState.label,
        account: { ...ecriture_default.account },
        third: { ...ecriture_default.third },
        daily: { ...ecritures[0].daily },
      });
    } else {
      setEntete({ ...entete, journal: default_journal.code });
      setJournal({ ...default_journal });
      setDefaultEcriture({
        ...ecriture_default,
        libelle: enteteState.label,
        account: { ...ecriture_default.account },
        third: { ...ecriture_default.third },
        daily: { ...default_journal },
      });
    }
  }
  useEffect(() => {
    initialize(ecritures, default_journal, entete);
    if (searchDirty) {
      dispatch(Actions.setEditLine(-1));
    } else {
      dispatch(Actions.setEditLine(ecritures.length + 1));
    }
  }, [ecritures, default_journal, entete]);

  function duplicate() {
    if (selected === 0) return;
    dispatch(Actions.saveEcriture({ ...selected, id: "", num_ligne: 0 }));
  }

  function supprimer() {
    if (selected === 0) return;
    dispatch(Actions.deleteEcriture(selected));
  }
  function solde() {
    const sum = Controller.sum_ecriture(ecritures);
    let debit = 0.0;
    let credit = 0.0;
    if (sum.solde_debit > 0.0) credit = sum.solde_debit;
    if (sum.solde_credit > 0.0) debit = sum.solde_credit;
    setDefaultEcriture({
      ...ecriture_default,
      libelle: enteteState.label,
      debit: debit,
      credit: credit,
      id: "",
      num_ligne: 0,
      account: { ...defaultEcriture.account },
      third: { ...defaultEcriture.third },
      daily: { ...journal },
    });
  }

  function contrePartie() {
    if (
      journal.compte !== "" &&
      journal.compte !== undefined &&
      journal.compte !== null
    ) {
      const sum = Controller.sum_ecriture(ecritures);
      let debit = 0.0;
      let credit = 0.0;
      if (sum.solde_debit > 0.0) credit = sum.solde_debit;
      if (sum.solde_credit > 0.0) debit = sum.solde_credit;

      if (credit == 0.0 && debit == 0.0) return;
      else {
        const ecriture = {
          ...ecriture_default,
          libelle: enteteState.label,
          debit: debit,
          credit: credit,
          compte: journal.compte,
          journal: journal.code,
          id: "",
          num_ligne: 0,
          account: { ...journal.account },
          third: { ...defaultEcriture.third },
          daily: { ...journal },
        };
        save(ecriture);
      }
    }
  }

  function save(ecriture) {
    if (date === "" || date === undefined || date === null) {
      const today = new Date();
      ecriture.date = today.toISOString().substring(0, 10);
    } else {
      ecriture.date = date;
    }
    ecriture.statut = enteteState.statut;
    ecriture.num_piece = enteteState.num_piece;
    ecriture.num_mouvement = enteteState.num_mouvement;
    ecriture.journal = enteteState.journal;
    ecriture.daily = journal;

    dispatch(Actions.saveEcriture(ecriture));
  }

  function saveServer() {
    dispatch(Actions.saveEcrituresToServer(ecritures));
  }

  const onContainerFocused = useCallback(
    (event) => {
      event.persist();
      // dispatch(Actions.setEditLine(edit_line));
      // dispatch(Actions.setEditCell(edit_cell));
    },
    [edit_cell, edit_line]
  );

  function onSearchEnter(event) {
    const query = event.target.value;
    //todo serch localy getEcrituresFromServer(query);
    setSearchQuery(query);
  }

  function getEcrituresFromServer() {
    const { num_mouvement } = match.params;
    if (
      num_mouvement === "_" ||
      num_mouvement === undefined ||
      num_mouvement === null ||
      num_mouvement === ""
    ) {
      setEditing(true);
    } else {
      setEditing(false);
    }
    dispatch(Actions.getEcrituresFromServer(num_mouvement));
  }

  const handleChange = useCallback((event) => {
    event.persist();
    let dateNow = undefined;
    switch (event.target.name) {
      case "label":
        setDefaultEcriture({
          ...ecriture_default,
          libelle: event.target.value,
          account: { ...ecriture_default.account },
          third: { ...ecriture_default.third },
          daily: { ...ecriture_default.daily },
        });
        setEntete((entete) => ({
          ...entete,
          [event.target.name]: event.target.value,
        }));
        break;
      case "date":
        try {
          dateNow = new Date(event.target.value);
        } catch (error) {
          dateNow = undefined;
        }

        if (dateNow === undefined || dateNow.toString() === "Invalid Date")
          break;
        else {
          setEntete((form) => ({
            ...form,
            date: dateNow.toISOString(),
          }));
          setDate(dateNow.toISOString().substring(0, 10));
          break;
        }

      default:
        setEntete((entete) => ({
          ...entete,
          [event.target.name]: event.target.value,
        }));
        break;
    }
  }, []);

  const onCloseSaveDialog = () => {
    setOpenSaveDialog(false);
    history.push("/saisie_ecriture/_");
    dispatch(Actions.clearEcritureList());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100%",
        position: "relative",
        flex: "1 1 auto",
        height: "100%",
      }}
      onFocus={onContainerFocused}
    >
      <div className="flex container w-full">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 3.2rem",
            flex: "1 1 100%",
            zIndex: 2,
            maxWidth: "100%",
            minWidth: 0,
            minHeight: 0,
          }}
        >
          <Grid
            container
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px 0 10px 0",
            }}
          >
            <IconButton
              aria-haspopup="true"
              onClick={(e) => {
                history.push(`/consultation/mouvement`);
              }}
              style={{ marginLeft: -20 }}
            >
              <Icon color="action" className="text-24">
                arrow_back
              </Icon>
            </IconButton>
            <div
              style={{
                borderRadius: 5,
                textAlign: "center",
                textTransform: "uppercase",
                margin: "0 30px 0 5px",
                fontWeight: "600",
                fontSize: 13,
              }}
            >
              Consultation
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifycontent: "end",
              }}
            >
              {editing ? (
                <AppJournalInput
                  journal={journal}
                  setJournal={(item) => {
                    setEntete((entete) => ({
                      ...entete,
                      journal: item.code,
                    }));
                    setJournal(item);
                  }}
                  name="journal"
                  width={280}
                  height={36}
                  direction="row"
                  tous={false}
                />
              ) : (
                <Typography
                  style={{
                    padding: "7px 20px",
                    height: 36,
                    background: "#e5e5e5",
                    borderRadius: 5,
                    textAlign: "center",
                    fontWeight: "bold",
                    display: journal !== 0 ? "block" : "none",
                    marginRight: 5,
                  }}
                >
                  {journal &&
                    ` Journal : [${journal.code}] ${journal.intitule}`}
                </Typography>
              )}

              <AppInput
                name="date"
                type="date"
                format="DD/MM/YYYY"
                handleChange={handleChange}
                value={date}
                horizontal={true}
                height={36}
                width={138}
                onTab={(e) => {}}
                onEnter={(e) => {}}
                style={{ marginLeft: 10 }}
              />
              {/* <AppSelector
                name="statut"
                label="statut"
                value={enteteState.statut}
                options={SAISIE_STATUES}
                handleChange={handleChange}
                height={36}
                horizontal={true}
                width={"auto"}
                style={{ marginLeft: 20 }}
              /> */}
              <AppInput
                name="num_piece"
                placeholder="N° Piece"
                type="text"
                label=""
                height={36}
                horizontal={true}
                handleChange={handleChange}
                value={enteteState.num_piece}
                width={156}
                onTab={(e) => {}}
                onEnter={(e) => {}}
                maxLength={255}
                style={{ marginRight: 10, marginLeft: 10 }}
              />
              <AppInput
                name="label"
                placeholder="Label"
                type="text"
                label=""
                height={36}
                horizontal={true}
                handleChange={handleChange}
                value={enteteState.label}
                width={356}
                onTab={(e) => {}}
                onEnter={(e) => {}}
                maxLength={255}
                style={{ marginRight: 10 }}
              />

              {/* <AppInputSearch
                name="Search"
                placeholder="Recherche (Piece, Compte, Tier, Banque, Référence, Label)"
                type="text"
                handleChange={undefined}
                height={36}
                width={400}
                horizontal={true}
                onFocus={(event) => {
                  setSearchDirty(true);
                }}
                onBlur={(event) => {
                  setSearchDirty(false);
                }}
                onEnter={onSearchEnter}
                onTab={(event) => {}}
              /> */}
            </div>
          </Grid>
          <Grid
            container
            style={{
              display: "flex",
              marginBottom: 10,
            }}
          >
            <Button
              variant="contained"
              style={{
                marginRight: 4,
                boxShadow: "none",
                backgroundColor: "#264653",
                color: "#EFF1FF",
                textTransform: "none",
                height: 36,
              }}
              onClick={(e) => contrePartie()}
            >
              Contre Partie
            </Button>
            <Button
              variant="contained"
              style={{
                marginRight: 4,
                boxShadow: "none",
                backgroundColor: "#219ebc",
                color: "#EFF1FF",
                textTransform: "none",
                height: 36,
              }}
              onClick={(e) => duplicate()}
            >
              Dupliquée
            </Button>
            <Button
              variant="contained"
              style={{
                marginRight: 4,
                boxShadow: "none",
                backgroundColor: "#f4a261",
                color: "#EFF1FF",
                textTransform: "none",
                height: 36,
              }}
              onClick={(e) => solde()}
            >
              Soldé
            </Button>

            <div
              style={{
                padding: "7px 20px",
                height: 36,
                background: "#e5383b",
                borderRadius: 5,
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                textTransform: "uppercase",
                display: exercice_actif["id"] === 0 ? "block" : "none",
              }}
            >
              aucun dossier est selectionné ...
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifycontent: "end",
              }}
            >
              <Typography
                style={{
                  padding: "10px 20px",
                  height: 36,
                  background: "#e5e5e5",
                  borderRadius: 5,
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  display: enteteState.num_mouvement !== 0 ? "block" : "none",
                  marginRight: 5,
                  color: "#14213d",
                }}
              >
                {` Mouvement N° : ${enteteState.num_mouvement}`}
              </Typography>
              <Button
                variant="contained"
                style={{
                  marginRight: 4,
                  boxShadow: "none",
                  backgroundColor: "#2a9d8f",
                  color: "#EFF1FF",
                  textTransform: "none",
                  height: 36,
                }}
                onClick={(e) => saveServer()}
              >
                Sauvgarder
              </Button>
              <Button
                variant="contained"
                style={{
                  marginRight: 4,
                  boxShadow: "none",
                  backgroundColor: "#e63946",
                  color: "#EFF1FF",
                  textTransform: "none",
                  height: 36,
                }}
                onClick={(e) => supprimer()}
              >
                Supprimer
              </Button>
            </div>
          </Grid>
          <Divider />

          <div
            className="inner-scroll"
            style={{
              display: "flex",
              flex: "1 1 100%",
              flexDirection: "column",
              minHeight: 0,
              borderRadius: "8px 8px 0 0",
              marginTop: 20,
            }}
          >
            <FuseScrollbars
              style={{
                flex: "1 1 auto",
                height: "100%",
                overflow: "auto",
                "-webkit-overflow-scrolling": "touch",
              }}
              enable={true}
              onYReachEnd={(ve) => {}}
              onXReachEnd={(ve) => {}}
              scrollToTopOnChildChange={false}
            >
              <Table
                aria-labelledby="tableTitle"
                className="min-w-md"
                size="small"
                stickyHeader
                stickyFooter
              >
                <EcritureHeader />
                <TableBody
                  style={{
                    overflow: "visible",
                  }}
                >
                  {ecritures.map((ecriture, index) => (
                    <EcritureRow
                      key={index}
                      line={index}
                      row={ecriture}
                      selected={selected}
                      setSelected={setSelected}
                      save={save}
                      entete={enteteState}
                    />
                  ))}
                  <TableRow className="h-4 cursor-pointer" />
                  <EcritureRow
                    line={ecritures.length + 1}
                    row={defaultEcriture}
                    selected={selected}
                    setSelected={setSelected}
                    save={save}
                    entete={enteteState}
                  />
                </TableBody>
                {/* <TableFooter></TableFooter> */}
              </Table>
            </FuseScrollbars>
          </div>
          <div
            style={{
              height: 72,
              background: summary.solde === 0.0 ? "#2d6a4f" : "#6a040f",
            }}
          >
            <EcritureSummary ecritures={ecritures} />
          </div>
        </div>
      </div>
      <Dialog
        open={openSaveDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCloseSaveDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Sauvgarde</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>
              Information sur l'enregistrement de l'écriture
            </Typography>
            <Typography style={{ fontWeight: "bold" }}>
              Le numero de mouvement de la piece créée est :
              <span style={{ fontSize: 18 }}>
                {" " + enteteState.num_mouvement}
              </span>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseSaveDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withReducer("ecriture", reducer)(Ecriture);
