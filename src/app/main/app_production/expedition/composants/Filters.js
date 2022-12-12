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

    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const postes = useSelector(({ expedition }) => expedition.poste.results);
  const equipes = useSelector(({ expedition }) => expedition.equipe.results);
  useEffect(() => {
    dispatch(list("EXPEDITION-POSTE", "production/postes", 1));
    dispatch(list("EXPEDITION-EQUIPE", "production/equipes", 1));
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifycontent="flex-end"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12} sm={12} md={4} lg={3}>
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
      <Grid item xs={12} sm={3} md={2} lg={1}>
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

      <Grid item xs={12} sm={3} md={2} lg={1}>
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
    </Grid>
  );
}

export default withReducer("expedition", reducer)(Filters);
