import React, { useEffect } from "react";
import AppSelector from "app/composants/inputs/AppSelector";
import { months } from "app/main/helpers/utils";
import { collectionStyles as styles } from "app/main/hooks/CollectionStyles";
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

  const postes = useSelector(({ casse }) => casse.poste.results);
  const equipes = useSelector(({ casse }) => casse.equipe.results);
  useEffect(() => {
    dispatch(list("CASSE-POSTE", "production/postes", 1));
    dispatch(list("CASSE-EQUIPE", "production/equipes", 1));
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
      <Grid item xs={6} sm={3} md={2} lg={1}>
        <AppSelector
          name="mois"
          value={filters.mois}
          options={months}
          handleChange={handleChange}
          height={24}
          horizontal={true}
        />
      </Grid>
      <Grid item xs={12} sm={3} md={2} lg={1}>
        <InputBasic
          name="date"
          type="date"
          placeholder="date"
          handleChange={handleChange}
          value={filters.date}
          style={{}}
          horizontal={true}
        />
      </Grid>
      <Grid item xs={6} sm={3} md={2} lg={1}>
        <AppSelector
          name="poste"
          value={filters.poste}
          options={postes}
          handleChange={handleChange}
          height={28}
          horizontal={true}
          width={"auto"}
          style={{}}
        />
      </Grid>

      <Grid item xs={6} sm={3} md={2} lg={1}>
        <AppSelector
          name="equipe"
          value={filters.equipe}
          options={equipes}
          handleChange={handleChange}
          height={28}
          horizontal={true}
          width={"auto"}
          style={{}}
        />
      </Grid>

      <Grid item xs={6} sm={3} md={2} lg={1}>
        <AppSelector
          name="type"
          value={filters.type}
          options={[
            { display: "Tous", value: null },
            { display: "INTERIEUR", value: "INTERIEUR" },
            { display: "EXTERIEUR", value: "EXTERIEUR" },
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
            { display: "PRODUCTION", value: "PRODUCTION" },
            { display: "EMBALLAGE", value: "EMBALLAGE" },
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

export default withReducer("casse", reducer)(Filters);
