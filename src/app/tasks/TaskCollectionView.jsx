import React from "react";

import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/CollectionActions";

import useCollection from "app/hooks/useCollection";
import { margins } from "app/composants.v2/constants";
import CollectionFilters from "app/composants.v2/collection/CollectionFilters";
import Filters from "app/tasks/Filters";
import Input from "app/composants.v2/Input";
import CustomizedTables from "./sample";
import CollectionTable from "app/composants.v2/collection/CollectionTable";

const cells = [
  { ordering: true, label: "Dessert (100g serving)", id: 1 },
  { ordering: true, label: "Calories", align: "right", id: 2 },
  { label: "Fat&nbsp;(g)", align: "right", id: 3 },
  { ordering: true, label: "Carbs&nbsp;(g)", align: "right", id: 4 },
  { label: "Protein&nbsp;(g)", align: "right", id: 5 },
];

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

  const [orderBy, setOrderBy] = React.useState(null);
  const [order, setOrder] = React.useState("asc");
  const handleSorting = (id) => (event) => {
    if (orderBy === id) {
      const o = order === "asc" ? "desc" : "asc";
      setOrder(o);
    } else {
      setOrderBy(id);
      setOrder("asc");
    }

    //todo perform the real sorting from server
  };

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
      <div style={{ marginTop: 10 }}>
        <CollectionTable cells={cells} onSort={handleSorting} />
      </div>
      {/*  */}
      {/* <div>
        <h1>collection header</h1>
        <h1>collection body</h1>
        <h1>collection pagination</h1>
      </div> */}
    </div>
  );
}
