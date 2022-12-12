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
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Slide,
  IconButton,
  Icon,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { FuseScrollbars } from "@fuse";
import { SAISIE_STATUES_TOUS, JOURNAUX_TOUS } from "app/helpers/statics";

import MouvementHeader from "./composants/MouvementHeader";
import EcritureMouvement from "./composants/EcritureMouvement";
import EcritureSummary from "./composants/EcritureSummary";

import EcritureInputTable from "./composants/EcritureInputTable";
import { AppInputSearch } from "app/composants/inputs";
import AppInput from "app/composants/inputs/AppInput";
import AppSelector from "app/composants/inputs/AppSelector";
import AppJournalInput from "../components/AppJournalInput";

const drawerWidth = 240;
const headerHeight = 200;
const toolbarHeight = 64;
const headerContentHeight = headerHeight - toolbarHeight;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// const defaultEntete = ;

function ConsultationMouvement(props) {
  const dispatch = useDispatch();
  const { match, history } = props;

  const [selected, setSelected] = useState(0);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  const [filters, setFilters] = useState({
    journal: "",
    statut: "",
    debut: "",
    fin: "",
    search: "",
  });
  const [journal, setJournal] = useState(null);
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");

  const mouvements = useSelector(({ consultation }) => consultation.mouvements);
  const loading = useSelector(({ consultation }) => consultation.loading);

  const exercice_actif = useSelector(
    ({ consultation }) => consultation.exercice_actif
  );
  const summary = useSelector(({ consultation }) => consultation.summary);

  useEffect(() => {
    dispatch(Actions.setLoading(true));

    dispatch(Actions.getActiveExercice());
    // dispatch(Actions.getDefaultJournal());
  }, []);

  useEffect(() => {
    getMouvementFromServer(filters);
    if (exercice_actif.annee === "") return;
    const debut = new Date(Number(exercice_actif.annee), 1, 1);
    const fin = new Date(Number(exercice_actif.annee), 11, 31);
    setDebut(debut.toISOString().substring(0, 10));
    setFin(fin.toISOString().substring(0, 10));
  }, [exercice_actif]);

  function onSearchEnter(event) {
    const query = event.target.value;
    const filter = { ...filters, search: query };
    setFilters(filter);
    getMouvementFromServer(filter);
  }

  function getMouvementFromServer(filters) {
    dispatch(Actions.setLoading(true));

    dispatch(Actions.getMouvementFromServer(filters));
  }

  function onEdit(item) {
    if (item === null || item === undefined) return;
    if (item.num_mouvement <= 0) return;
    history.push(`/saisie_ecriture/${item.num_mouvement}`);
  }
  function onAdd() {
    history.push(`/saisie_ecriture/_`);
  }
  const handleChange = useCallback((event) => {
    event.persist();
    let dateNow = undefined;
    switch (event.target.type) {
      case "date":
        try {
          dateNow = new Date(event.target.value);
        } catch (error) {
          dateNow = undefined;
        }

        if (dateNow === undefined || dateNow.toString() === "Invalid Date")
          break;
        else {
          const month = dateNow.getMonth() + 1;
          setFilters((form) => ({
            ...form,
            [event.target
              .name]: `${dateNow.getFullYear()}-${month}-${dateNow.getDate()}`,
          }));
          if (event.target.name === "debut")
            setDebut(dateNow.toISOString().substring(0, 10));
          if (event.target.name === "fin")
            setFin(dateNow.toISOString().substring(0, 10));
          break;
        }

      default:
        setFilters((entete) => ({
          ...entete,
          [event.target.name]: event.target.value,
        }));
        break;
    }
  }, []);

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
            }}
          >
            <div
              style={{
                padding: "10px 20px",
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
          </Grid>
          <Grid
            container
            style={{
              display: "flex",
              padding: "5px 0",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-haspopup="true"
              onClick={(e) => {
                history.push(`/compta_dashboard/`);
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
              Accueil
            </div>
            <Button
              variant="contained"
              style={{
                marginRight: 4,
                boxShadow: "none",
                backgroundColor: "#2a9d8f",
                color: "#EFF1FF",
                textTransform: "none",
                height: 32,
              }}
              onClick={(e) => {
                onAdd();
              }}
            >
              Nouvelle Écriture
            </Button>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifycontent: "end",
              }}
            >
              {/* <AppSelector
                name="journal"
                label="Journal"
                value={filters.journal}
                options={JOURNAUX_TOUS}
                handleChange={handleChange}
                height={36}
                horizontal={true}
                width={"auto"}
              /> */}

              <AppJournalInput
                setJournal={(item) => {
                  getMouvementFromServer({
                    ...filters,
                    journal: item.code,
                  });

                  setFilters((entete) => ({
                    ...entete,
                    journal: item.code,
                  }));
                  setJournal(item);
                }}
                name="journal"
                width={300}
                height={36}
                direction="row"
                tous={true}
              />

              <AppSelector
                name="statut"
                label="statut"
                value={filters.statut}
                options={SAISIE_STATUES_TOUS}
                handleChange={(e) => {
                  getMouvementFromServer({
                    ...filters,
                    statut: e.target.value,
                  });
                  handleChange(e);
                }}
                height={36}
                horizontal={true}
                width={"auto"}
                style={{ marginLeft: 10 }}
              />
              <AppInput
                name="debut"
                type="date"
                format="DD/MM/YYYY"
                handleChange={handleChange}
                value={debut}
                horizontal={true}
                height={36}
                width={138}
                onEnter={() => {}}
                style={{ marginLeft: 10 }}
              />
              <AppInput
                name="fin"
                type="date"
                format="DD/MM/YYYY"
                handleChange={handleChange}
                value={fin}
                horizontal={true}
                height={36}
                width={138}
                onTab={(e) => {}}
                onEnter={() => {}}
                style={{ marginLeft: 10 }}
              />
              <AppInputSearch
                name="Search"
                placeholder="Recherche (Piece, Compte, Tier, Banque, Référence, Label)"
                type="text"
                handleChange={undefined}
                height={36}
                width={350}
                horizontal={true}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
                onEnter={onSearchEnter}
                onTab={(event) => {}}
                style={{ marginLeft: 10 }}
              />
              <Button
                variant="contained"
                style={{
                  marginRight: 4,
                  boxShadow: "none",
                  backgroundColor: "#457b9d",
                  color: "#EFF1FF",
                  textTransform: "none",
                  height: 32,
                  marginLeft: 20,
                }}
                onClick={(e) => {
                  getMouvementFromServer(filters);
                }}
              >
                Filtrer
              </Button>
              {/* <Button
                variant="contained"
                style={{
                  marginRight: 4,
                  boxShadow: "none",
                  backgroundColor: "#2a9d8f",
                  color: "#EFF1FF",
                  textTransform: "none",
                  height: 36,
                  marginLeft: 20,
                }}
                onClick={(e) => {
                  getMouvementFromServer(filters);
                }}
              >
                Recherche
              </Button> */}
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
              marginTop: 10,
              marginBottom: 10,
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
              onYReachEnd={(ve) => {
                console.log("Scroll Y");
              }}
              onXReachEnd={(ve) => {
                console.log("Scroll X");
              }}
              scrollToTopOnChildChange={false}
            >
              <Table
                aria-labelledby="tableTitle"
                className="min-w-md"
                size="small"
                stickyHeader
                stickyFooter
              >
                <MouvementHeader />
                <TableBody>
                  {mouvements.results.map((ecriture, index) => (
                    <EcritureMouvement
                      key={index}
                      ecriture={ecriture}
                      onEdit={onEdit}
                    />
                  ))}
                </TableBody>
              </Table>
            </FuseScrollbars>
          </div>
          {loading === true && (
            <div
              style={{
                display: "flex",
                backgroundColor: "#26465330",
                position: "absolute",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifycontent: "center",
                zIndex: 500,
              }}
            >
              <CircularProgress color="inherit" size={48} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withReducer("consultation", reducer)(ConsultationMouvement);
