import React from "react";
import AppSelector from "app/composants/inputs/AppSelector";

import { Grid } from "@material-ui/core";
import InputBasic from "app/main/composants/inputs/InputBasic";

import { useDispatch, useSelector } from "react-redux";
import { list } from "app/services/infrabitumService/ActionService";

export default function Filters({ filters, setFilters }) {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    if (event.target.value === null || event.target.value === "Non Définie") {
      delete filters[event.target.name];
      setFilters({ ...filters });
    } else {
      setFilters({ ...filters, [event.target.name]: event.target.value });
    }
  };

  const services = useSelector(
    ({ production_employe }) => production_employe.service.results
  );

  React.useEffect(() => {
    dispatch(list("EMPLOYE-SERVICE", "gestion/services", 1));
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifycontent="flex-end"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12} sm={5} md={4} lg={3}>
        <InputBasic
          name="search"
          placeholder="Recherche"
          handleChange={handleChange}
          value={filters.search}
          style={{ width: "100%" }}
          horizontal={true}
        />
      </Grid>
      <Grid item xs={12} sm={5} md={4} lg={3}>
        <AppSelector
          name="service"
          value={filters.service}
          options={services}
          handleChange={handleChange}
          height={28}
          horizontal={true}
          width={"auto"}
          style={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
