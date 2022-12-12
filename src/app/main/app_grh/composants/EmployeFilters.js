import React from "react";
import AppSelector from "app/composants/inputs/AppSelector";

import { Grid } from "@material-ui/core";
import InputBasic from "app/main/composants/inputs/InputBasic";

import { useDispatch, useSelector } from "react-redux";
import { list } from "app/services/application/ActionService";

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
    ({ grh_employe }) => grh_employe.service.collection
  );
  const postes = useSelector(({ grh_employe }) => grh_employe.poste.collection);
  const statues = useSelector(
    ({ grh_employe }) => grh_employe.statue.collection
  );

  React.useEffect(() => {
    dispatch(list("SERVICE-GRH", "grh/api/services", 1));
    dispatch(list("POSTE-GRH", "grh/api/postes", 1));
    dispatch(list("STATUE-GRH", "grh/api/statues", 1));
  }, []);

  return (
    <Grid container direction="row" alignItems="center" spacing={1}>
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
      <Grid item xs={12} sm={5} md={4} lg={2}>
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
      <Grid item xs={12} sm={5} md={4} lg={2}>
        <AppSelector
          name="poste"
          value={filters.poste}
          options={postes}
          handleChange={handleChange}
          height={28}
          horizontal={true}
          width={"auto"}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={12} sm={5} md={4} lg={1}>
        <AppSelector
          name="statue"
          value={filters.statue}
          options={statues}
          handleChange={handleChange}
          height={28}
          horizontal={true}
          width={"auto"}
          style={{ width: "100%" }}
        />
      </Grid>
      {/* <Grid item xs={12} sm={5} md={4} lg={2}>
        <AppSelector
          name="poste__type"
          value={filters.poste__type}
          options={[
            { display: "Tous", value: "" },
            { display: "Chauffeur", value: "Chauffeur" },
            { display: "Production", value: "Production" },
            { display: "Autre", value: "Autre" },
          ]}
          handleChange={handleChange}
          height={28}
          horizontal={true}
          width={"auto"}
          style={{ width: "100%" }}
        />
      </Grid> */}
    </Grid>
  );
}
