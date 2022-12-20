import React from "react";

import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/CollectionActions";

import useCollection from "app/hooks/useCollection";
import { margins } from "app/composants.v2/constants";
import CollectionFilters from "app/composants.v2/collection/CollectionFilters";
import Filters from "app/tasks/Filters";
import Input from "app/composants.v2/Input";
import CollectionTable from "app/composants.v2/collection/CollectionTable";
import TaskRow from "./TaskRow";

const cells = [
  {
    ordering: true,
    label: "Caption",
    id: "caption",
  },
  { label: "Intitule", id: "label", style: { minWidth: 100 } },
  {
    label: "Description",
    id: "description",
    component: "th",
    scope: "row",
    style: { minWidth: 200 },
  },
  { ordering: true, label: "Responsable", id: "creator_name" },
  { ordering: true, label: "Affectation", id: "receiver_name" },
  { ordering: true, label: "Statue", id: "statue_label" },
  { ordering: true, label: "Created", id: "created" },
  { label: "Categorie", id: "closed", align: "right" },
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

  const {
    addAction,
    editAction,
    deleteAction,
    handleFilter: onFilter,
    filters,
    data,
  } = tasks;

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
        onFilter={onFilter}
        filters={filters}
        FilterContent={<Filters onFilter={onFilter} filters={filters} />}
      />
      <div style={{ marginTop: 10 }}>
        <CollectionTable
          cells={cells}
          onSort={handleSorting}
          order={order}
          orderBy={orderBy}
          data={data.results}
        >
          {TaskRow}
        </CollectionTable>
      </div>
      {/*  */}
      {/* <div>
        <h1>collection pagination</h1>
      </div> */}
    </div>
  );
}
