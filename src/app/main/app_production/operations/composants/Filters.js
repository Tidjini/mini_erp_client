import React, { useEffect } from "react";
import AppSelector from "app/composants/inputs/AppSelector";
import { Grid } from "@material-ui/core";
import InputBasic from "app/main/composants/inputs/InputBasic";

import { useDispatch, useSelector } from "react-redux";
import { list } from "app/services/infrabitumService/ActionService";

import reducer from "../store/reducer";
import withReducer from "app/store/withReducer";

function Filters({ filters, setFilters }) {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    if (event.target.value === "Non Définie") {
      event.target.value = null;
    }
    if (event.target.value === "Tous") {
      event.target.value = null;
    }

    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const produits = useSelector(
    ({ production_operations }) => production_operations.produits.results
  );
  useEffect(() => {
    dispatch(list("OPERATION-PRODUIT", "production/produits", 1));
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifycontent="flex-end"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12} sm={4} md={3}>
        <InputBasic
          name="search"
          placeholder="Recherche"
          handleChange={handleChange}
          value={filters.search}
          style={{}}
          horizontal={true}
        />
      </Grid>

      <Grid item xs={12} sm={3} md={2} lg={1}>
        <InputBasic
          name="production__date"
          type="date"
          placeholder="production__date"
          handleChange={handleChange}
          value={filters.production__date}
          style={{}}
          horizontal={true}
        />
      </Grid>
      <Grid item xs={12} sm={3} md={2} lg={1}>
        <InputBasic
          name="wagon"
          placeholder="Wagon"
          handleChange={handleChange}
          value={filters.wagon}
          style={{}}
          horizontal={true}
        />
      </Grid>

      <Grid item xs={6} sm={3} md={2} lg={1}>
        <AppSelector
          name="produit"
          value={filters.produit}
          options={produits}
          handleChange={handleChange}
          height={28}
          horizontal={true}
          width={"auto"}
          style={{}}
        />
      </Grid>

      <Grid item xs={6} sm={3} md={2} lg={1}>
        <AppSelector
          name="anomalie"
          value={filters.anomalie}
          options={[
            { display: "Tous", value: null },
            { display: "Normal", value: 0 },
            { display: "Anomalie", value: 1 },
          ]}
          handleChange={handleChange}
          height={28}
          horizontal={true}
          width={"auto"}
          style={{}}
        />
      </Grid>
      <Grid item xs={6} sm={3} md={2} lg={1}>
        <AppSelector
          name="phase"
          value={filters.phase}
          options={[
            { display: "Tous", value: null },
            { display: "EMPILEMENT", value: "EMPILEMENT" },
            { display: "ENFOURNEMENT", value: "ENFOURNEMENT" },
            { display: "DEFOURNEMENT", value: "DEFOURNEMENT" },
            { display: "EMBALLAGE", value: "EMBALLAGE" },
            { display: "ATTENTE", value: "ATTENTE" },
          ]}
          handleChange={handleChange}
          height={28}
          horizontal={true}
          width={"auto"}
          style={{}}
        />
      </Grid>
    </Grid>
  );
}

export default withReducer("production_operations", reducer)(Filters);
