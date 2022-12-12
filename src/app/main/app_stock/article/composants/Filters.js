import React from "react";
import { collectionStyles as styles } from "app/main/hooks/CollectionStyles";
import { Grid } from "@material-ui/core";
import InputBasic from "app/main/composants/inputs/InputBasic";

export default function Filters({ filters, setFilters }) {
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
    <Grid container direction="row-reverse" style={styles.header}>
      <Grid item xs={12} sm={6} md={4} style={{ margin: "0 10px" }}>
        <InputBasic
          name="search"
          placeholder="Recherche"
          handleChange={handleChange}
          value={filters.search}
          style={{ marginTop: -10 }}
          horizontal={true}
        />
      </Grid>
    </Grid>
  );
}
