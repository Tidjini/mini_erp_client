import React from "react";
import AppSelector from "app/composants/inputs/AppSelector";

import { Grid } from "@material-ui/core";
import InputBasic from "app/main/composants/inputs/InputBasic";

export default function Filters({ filters, setFilters }) {
  const handleChange = (event) => {
    if (event.target.value === null || event.target.value === "Tous") {
      delete filters[event.target.name];
      setFilters({ ...filters });
    } else {
      setFilters({ ...filters, [event.target.name]: event.target.value });
    }
  };

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
          style={{ width: "100%" }}
          horizontal={true}
        />
      </Grid>

      <Grid item xs={12} sm={3} md={2} lg={1}>
        <AppSelector
          name="phase_actuel"
          value={filters.phase_actuel}
          options={[
            { display: "Tous", value: null },
            { display: "ATTENTE", value: "ATTENTE" },
            { display: "EMPILAGE", value: "EMPILEMENT" },
            { display: "FOUR", value: "ENFOURNEMENT" },
            { display: "ATTENTE OMS", value: "DEFOURNEMENT" },
            { display: "OMS", value: "EMBALLAGE" },
          ]}
          handleChange={handleChange}
          height={24}
          horizontal={true}
          style={{ with: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
