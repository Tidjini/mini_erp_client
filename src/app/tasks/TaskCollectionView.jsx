import React from "react";

import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/CollectionActions";

import useCollection from "app/hooks/useCollection";
import Input from "app/composants.v2/Input";
import { margins } from "app/composants.v2/constants";
import { Grid, Icon } from "@material-ui/core";
import Button from "app/composants.v2/Button";

export default function TaskCollectionView(props) {
  const { addAction, editAction, deleteAction, setFilters, filters } =
    useCollection({
      name: "tasks",
      pk: "id",
      filters: { type: "0" },
    });

  const actions = [addAction, editAction, deleteAction];

  return (
    <div style={{ margin: margins.default }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Header title="Collection des Tâches" />
        <CollectionActions actions={actions} />
      </div>
      <div
        style={{
          marginTop: margins.default,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Input
          name="search"
          placeholder="Rechercher des task"
          handleChange={(event) => {
            console.log(event.target.value);
            setFilters({
              ...filters,
              search: event.target.value,
            });
          }}
          value={filters.search}
        />
        <Button
          style={{
            marginLeft: 14,
            backgroundColor: "#e5e5e5",
            color: "#2b2d42",
          }}
        >
          Filtrer
        </Button>
      </div>
      {/* <Input label="Date" placeholder="Date" type="date" sm={12} />
        <Input label="Statue" placeholder="Statue" sm={12} />
        <Input label="Type" placeholder="type" sm={12} />
        <Input label="Fermer" placeholder="Closed" sm={12} /> */}
      <div>
        <h1>collection header</h1>
        <h1>collection body</h1>
        <h1>collection pagination</h1>
      </div>
    </div>
  );
}
