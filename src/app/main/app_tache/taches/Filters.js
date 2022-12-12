import React, { useEffect } from "react";
import AppSelector from "app/composants/inputs/AppSelector";
import { months } from "app/main/helpers/utils";
import { Grid, Hidden } from "@material-ui/core";
import InputBasic from "app/main/composants/inputs/InputBasic";

import { useDispatch, useSelector } from "react-redux";
import { list } from "app/services/application/ActionService";
import LookupCollection from "app/composants/LookupCollection";

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

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={6} sm={3} md={false} lg={false} xl={false}>
        <AppSelector
          name="terminer"
          value={filters.terminer}
          options={[
            { display: "Tous", value: null },
            { display: "Cloturés", value: 1 },
            { display: "Non Cloturés", value: 0 },
          ]}
          handleChange={handleChange}
          height={24}
          horizontal={true}
          style={{ marginTop: 20 }}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <InputBasic
          name="search"
          placeholder="Recherche"
          handleChange={handleChange}
          value={filters.search}
          style={{ marginTop: 20 }}
          horizontal={true}
        />
      </Grid>
      <Grid item xs={6} sm={3} md={2} lg={1}>
        <AppSelector
          name="terminer"
          value={filters.terminer}
          options={[
            { display: "Tous", value: null },
            { display: "Cloturés", value: 1 },
            { display: "Non Cloturés", value: 0 },
          ]}
          handleChange={handleChange}
          height={24}
          horizontal={true}
          style={{ marginTop: 20 }}
        />
      </Grid>
      <Grid item xs={12} sm={3} md={2} lg={1}>
        <InputBasic
          name="debut__date"
          type="date"
          placeholder="début"
          handleChange={handleChange}
          value={filters.debut__date}
          style={{ marginTop: 20 }}
          horizontal={true}
        />
      </Grid>
      <Grid item xs={12} sm={3} md={2} lg={1}>
        <InputBasic
          name="fin__date"
          type="date"
          placeholder="fin"
          handleChange={handleChange}
          value={filters.fin__date}
          style={{ marginTop: 20 }}
          horizontal={true}
        />
      </Grid>
      <Grid item xs={6} sm={3} md={2} lg={1}>
        <LookupCollection
          name="categorie"
          value={filters.categorie}
          handleChange={handleChange}
          context="TACHE-CATEGORIE"
          link="api/app_tache/tache_categories"
          display={["intitule"]}
          collection={useSelector((state) => state.collection.tache.categories)}
          emptyValue="Tous"
        />
      </Grid>

      <Grid item xs={6} sm={3} md={2} lg={1}>
        <LookupCollection
          name="tache_statue"
          value={filters.tache_statue}
          handleChange={handleChange}
          context="TACHE-STATUE"
          link="api/app_tache/tache_statues"
          display={["intitule"]}
          collection={useSelector((state) => state.collection.tache.statues)}
          emptyValue="Tous"
        />
      </Grid>
      <Grid item xs={6} sm={3} md={2} lg={1}>
        <LookupCollection
          name="tache_urgence"
          value={filters.tache_urgence}
          handleChange={handleChange}
          context="TACHE-URGENCE"
          link="api/app_tache/tache_urgences"
          display={["intitule"]}
          collection={useSelector((state) => state.collection.tache.urgences)}
          emptyValue="Tous"
        />
      </Grid>
    </Grid>
  );
}

export default withReducer("tache", reducer)(Filters);
