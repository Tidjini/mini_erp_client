import React, { useEffect, useState } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions/collection.actions";
import { useDispatch, useSelector } from "react-redux";

import Table from "app/composants/table/Table";
import { cells, styles } from "./CommandeAchatConfig";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { AppInputSearch } from "app/composants/inputs";
import { getColumns } from "app/main/helpers/utils";
import CommandeRow from "./CommandeRow";

function CommandeAchatCollection(props) {
  const dispatch = useDispatch();

  const [scrollOnTop, setScrollOnTop] = useState(false);

  const [filters, setFilters] = useState({
    journal: "",
    statut: "",
    debut: "",
    fin: "",
    search: "",
  });

  const commandes = useSelector(
    ({ commande_achat }) => commande_achat.commandes
  );
  const loading = useSelector(({ commande_achat }) => commande_achat.loading);

  useEffect(() => {
    getCommandes(filters);
  }, [filters]);

  function onClickCommande(event, commande) {
    const { history } = props;
    history.push(`/commande_achat/${commande.id}`);
  }

  function onDelete(event, item) {
    if (item.id === undefined || item.id === null || item.id === 0) return;

    dispatch(Actions.deleteCommande(item.id)).then(() => {
      getCommandes(filters);
    });
  }
  const [currentPage, setCurrentPage] = useState(1);

  function getCommandes(filters, page = 1) {
    if (page === 1) {
      setScrollOnTop(true);
    } else {
      setScrollOnTop(false);
    }

    setCurrentPage(page);

    dispatch(Actions.setLoading(true));
    dispatch(Actions.getCommandeCollection(filters, page));
  }

  return (
    <div style={styles.container}>
      <div className="flex container w-full">
        <div style={styles.container_l1}>
          <Grid container style={styles.header}>
            <Grid item xs={12} style={styles.titleContainer}>
              <img
                alt="state"
                src={"assets/images/app_achat/commande_achat.png"}
                style={styles.icon}
              />
              <div>
                <Typography style={styles.title}>
                  <span style={styles.titleSpan}>Commandes</span> Achat
                </Typography>
              </div>
              {/* <Button
                variant="contained"
                style={{
                  marginLeft: 20,
                  boxShadow: "none",
                  backgroundColor: "#2a9d8f",
                  color: "#EFF1FF",
                  height: 32,
                  fontSize: 12,
                }}
                onClick={(e) => {}}
              >
                Ajouter
              </Button> */}
            </Grid>
            {/* <Grid
              item
              xs={12}
              style={{
                ...styles.titleContainer,
                justifycontent: "end",
              }}
            >
              <AppInputSearch
                name="search"
                placeholder="Recherche (statue, numéro, date, fournisseur, devis, montant..)"
                type="text"
                handleChange={(e) => {
                  const f = filters;
                  f["search"] = e.target.value;
                  setFilters(f);
                }}
                height={36}
                width={350}
                horizontal={true}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
                onEnter={(e) => {}}
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
                  width: "auto",
                }}
                onClick={(e) => {}}
              >
                Recherche
              </Button>
            </Grid> */}
          </Grid>
          <Divider style={styles.divider} />
          <div className="inner-scroll" style={styles.table_container}>
            <Table
              cells={getColumns(cells)}
              data={commandes.results}
              CustomRow={CommandeRow}
              onDoubleClickItem={onDelete}
              onClickItem={onClickCommande}
              onReachEnd={(element) => {
                if (element && commandes.next !== null) {
                  getCommandes(filters, currentPage + 1);
                }
              }}
              scrollOnTop={scrollOnTop}
            />
          </div>
          {loading === true && (
            <div style={styles.loading_container}>
              <CircularProgress color="inherit" size={48} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withReducer("commande_achat", reducer)(CommandeAchatCollection);
