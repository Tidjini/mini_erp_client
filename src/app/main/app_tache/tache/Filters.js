import React from "react";
import AppSelector from "app/composants/inputs/AppSelector";
import { months } from "app/main/helpers/utils";
import Button from "app/main/composants/base/Button";

import { Grid } from "@material-ui/core";
import InputBasic from "app/main/composants/inputs/InputBasic";

import { useDispatch } from "react-redux";

export default function Filters({ filters, setFilters }) {
  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
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
        <InputBasic
          name="date"
          type="date"
          placeholder="date"
          handleChange={handleChange}
          value={filters.date}
          style={{ with: "100%" }}
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
          style={{ with: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
