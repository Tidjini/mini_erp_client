import React, { useEffect, useState } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions/collection.actions";
import { useDispatch, useSelector } from "react-redux";

import Table from "app/composants/table/Table";
import { cells, collectionStyles as styles } from "./TransitConfig";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { AppInputSearch } from "app/composants/inputs";

import BitumeOperationRow from "./composants/BitumeOperationRow";

function BitumeOperationCollection(props) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    journal: "",
    statut: "",
    debut: "",
    fin: "",
    search: "",
  });

  const operations = useSelector(({ transit }) => transit.collection.results);
  const loading = useSelector(({ transit }) => transit.collection.loading);

  useEffect(() => {
    // dispatch(Actions.setLoading(true));
    dispatch(Actions.getOperationCollection(1, {}));
  }, [filters]);

  function onDoubleClickCommande(event, operation) {
    const { history } = props;
    history.push(`/bitume-operation/${operation.id}`);
  }

  return (
    <div style={styles.container}>
      <div className="flex container w-full">
        <div style={styles.container_l1}>
          <Grid container style={styles.header}>
            <Grid item xs={6} style={styles.titleContainer}>
              <img
                alt="state"
                src={"assets/images/transit/cargo-ship.png"}
                style={styles.icon}
              />
              <div>
                <Typography style={styles.title}>
                  <span style={styles.titleSpan}>Opération</span> (Transit)
                </Typography>
              </div>
              <Button
                variant="contained"
                style={{
                  marginLeft: 20,
                  boxShadow: "none",
                  backgroundColor: "#2a9d8f",
                  color: "#EFF1FF",
                  height: 32,
                  fontSize: 12,
                }}
                onClick={(e) => {
                  const { history } = props;
                  history.push(`/bitume-operation/nouveau`);
                }}
              >
                + Ajouter
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                ...styles.titleContainer,
                justifycontent: "end",
              }}
            >
              <AppInputSearch
                name="search"
                placeholder="Recherche (navire, statue, numéro, date..)"
                type="text"
                handleChange={undefined}
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
            </Grid>
          </Grid>
          <Divider style={styles.divider} />
          <div className="inner-scroll" style={styles.table_container}>
            <Table
              cells={cells}
              data={operations}
              CustomRow={BitumeOperationRow}
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

export default withReducer("transit", reducer)(BitumeOperationCollection);
