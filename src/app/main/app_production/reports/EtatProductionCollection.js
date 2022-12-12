import React, { useEffect, useState } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import Table from "app/composants/table/Table";
import { collectionCells, months } from "./EtatConfig";
import { collectionStyles as styles } from "app/main/hooks/CollectionStyles";
import { getColumns } from "app/main/helpers/utils";

import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";

import EtatProductionRow from "./composants/EtatProductionRow";
import EtatProductionHeader from "./composants/EtatProductionHeader";
import AppSelector from "app/composants/inputs/AppSelector";

function EtatProductionCollection(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [mois, setMois] = useState(1);
  const [loading, setLoading] = useState(false);

  const etat = useSelector(
    ({ etat_production }) => etat_production.etatProduction.results
  );

  useEffect(() => {
    setLoading(true);
    dispatch(Actions.getEtatProductionCollection({ mois: mois })).then(
      (res) => {
        setLoading(false);
      }
    );
  }, [mois]);

  function onDoubleClickCommande(event, employe) {
    const { history } = props;
    // history.push(`/gestion-employe/${employe.id}`);
  }

  useEffect(() => {
    const liste = etat.sort((a, b) =>
      a.date < b.date ? -1 : b.date < a.date ? 1 : 0
    );
    setData(liste);
  }, [etat]);

  useEffect(() => {
    const today = new Date();
    setMois(today.getMonth() + 1);
  }, []);

  return (
    <div style={{ ...styles.container, padding: 0 }}>
      <div className="flex container w-full">
        <div style={styles.container_l1}>
          <Grid container style={styles.header}>
            <Grid item xs={6} style={styles.titleContainer}>
              <img
                alt="state"
                src={"assets/images/app_production/production.png"}
                style={styles.icon}
              />
              <div>
                <Typography style={styles.title}>
                  <span style={styles.titleSpan}>ETAT DE </span>PRODUCTION
                </Typography>
              </div>
              <AppSelector
                name="mois"
                value={mois}
                options={months}
                handleChange={(e) => {
                  setMois(e.target.value);
                }}
                height={28}
                horizontal={true}
                width={"auto"}
                style={{ marginLeft: 50 }}
              />
            </Grid>
          </Grid>
          <Divider style={styles.divider} />
          <div className="inner-scroll" style={styles.table_container}>
            <Table
              cells={getColumns(collectionCells)}
              data={data}
              CustomRow={EtatProductionRow}
              CustomHeader={EtatProductionHeader}
              onClickItem={(e, i) => {}}
              onDoubleClickItem={onDoubleClickCommande}
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

export default withReducer(
  "etat_production",
  reducer
)(EtatProductionCollection);
