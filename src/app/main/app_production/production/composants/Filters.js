import React, { useEffect } from "react";
import AppSelector from "app/composants/inputs/AppSelector";
import { months } from "app/main/helpers/utils";
import { Grid } from "@material-ui/core";
import Button from "app/main/composants/base/Button";

import InputBasic from "app/main/composants/inputs/InputBasic";

import { useDispatch, useSelector } from "react-redux";
import { list } from "app/services/infrabitumService/ActionService";

import { etatGlobal, etatJournalier } from "../store/actions";

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

  const postes = useSelector(({ production }) => production.poste.results);
  const equipes = useSelector(({ production }) => production.equipe.results);
  useEffect(() => {
    dispatch(list("PRODUCTION-POSTE", "production/postes", 1));
    dispatch(list("PRODUCTION-EQUIPE", "production/equipes", 1));
  }, []);

  const printEtat = React.useCallback(
    (event) => {
      const year = 2022;
      const mois = filters.mois;
      const month = months[mois - 1];

      dispatch(etatGlobal(year, mois, month.display));
    },
    [filters, months]
  );

  const journalier = React.useCallback(
    (event) => {
      if (
        filters.date === undefined ||
        filters.date === null ||
        filters.date === ""
      ) {
        return;
      } else {
        dispatch(etatJournalier(filters.date));
      }
    },
    [filters]
  );
  return (
    <Grid
      container
      direction="row"
      justifycontent="flex-end"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12} sm={4} md={3} lg={2}>
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

      <Grid item xs={12} sm={3} md={2} lg={1}>
        <AppSelector
          name="poste"
          value={filters.poste}
          options={postes}
          handleChange={handleChange}
          height={28}
          horizontal={true}
          width={"auto"}
          style={{ marginLeft: 5 }}
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
          style={{ marginLeft: 5 }}
        />
      </Grid>
      <Grid item xs={6} sm={3} md={2} lg={1}>
        <Button
          style={{
            backgroundColor: "#e76f51",
          }}
          onClick={printEtat}
        >
          Rapport
        </Button>
      </Grid>

      <Grid item xs={6} sm={3} md={2} lg={1}>
        <Button
          style={{
            backgroundColor: "#14213d",
          }}
          onClick={journalier}
        >
          Journalier
        </Button>
      </Grid>
    </Grid>
  );
}

export default withReducer("production", reducer)(Filters);
