import React, { useEffect, useState } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import Table from "app/composants/table/Table";
import { produitsCells } from "./ProduitConfig";
import { collectionStyles as styles } from "app/main/hooks/CollectionStyles";
import { getColumns } from "app/main/helpers/utils";

import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";

import ProduitRow from "./composants/ProduitRow";

function ProduitCollection(props) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ designation: "", symbole: "" });

  const produits = useSelector(
    ({ production_produit }) => production_produit.produits.results
  );
  const loading = useSelector(
    ({ production_produit }) => production_produit.produits.loading
  );

  useEffect(() => {
    dispatch(Actions.getProduitCollection(1, {}));
  }, [filters]);

  function onDoubleClickCommande(event, operation) {
    const { history } = props;
    history.push(`/production-produit/${operation.id}`);
  }

  return (
    <div style={styles.container}>
      <div className="flex container w-full">
        <div style={styles.container_l1}>
          <Grid container style={styles.header}>
            <Grid item xs={6} style={styles.titleContainer}>
              <img
                alt="state"
                src={"assets/images/app_production/pallets.png"}
                style={styles.icon}
              />
              <div>
                <Typography style={styles.title}>
                  <span style={styles.titleSpan}>Prod</span>utis
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
                  history.push(`/production-produit/nouveau`);
                }}
              >
                + Ajouter
              </Button>
            </Grid>
          </Grid>
          <Divider style={styles.divider} />
          <div className="inner-scroll" style={styles.table_container}>
            <Table
              cells={getColumns(produitsCells)}
              data={produits}
              CustomRow={ProduitRow}
              onClickItem={onDoubleClickCommande}
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

export default withReducer("production_produit", reducer)(ProduitCollection);
