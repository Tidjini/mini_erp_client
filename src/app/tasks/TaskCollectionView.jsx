import React from "react";

import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/CollectionActions";

import useCollection from "app/hooks/useCollection";
import { margins } from "app/composants.v2/constants";
import CollectionFilters from "app/composants.v2/collection/CollectionFilters";
import Filters from "app/tasks/Filters";
import Input from "app/composants.v2/Input";

export default function TaskCollectionView(props) {
  const tasks = useCollection({
    name: "tasks",
    pk: "id",
    filters: {
      type: "0",
      closed: null,
      statue: null,
      created_at__date: null,
    },
  });

  const { addAction, editAction, deleteAction, setFilters, filters } = tasks;

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
      <CollectionFilters
        setFilters={setFilters}
        filters={filters}
        FilterContent={<Filters setFilters={setFilters} filters={filters} />}
      />
      {/*  */}
      <div>
        <h1>collection header</h1>
        <h1>collection body</h1>
        <h1>collection pagination</h1>
      </div>
    </div>
  );
}
