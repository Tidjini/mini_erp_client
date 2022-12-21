import React from "react";

import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/collection/CollectionActions";
import useCollection from "app/hooks/useCollection";
import { margins } from "app/composants.v2/constants";
import CollectionFilters from "app/composants.v2/collection/CollectionFilters";
import Filter from "app/tasks/Filter";
import CollectionTable from "app/composants.v2/collection/CollectionTable";
import TaskRow from "./TaskRow";
import { cells } from "./Config";

export default function TaskCollectionView(props) {
  const tasks = useCollection({
    name: "tasks",
    pk: "id",
    filter: {
      type: "0",
      closed: null,
      statue: null,
      created_at__date: null,
    },
    viewUrl: "/task",
  });

  const {
    addAction,
    editAction,
    deleteAction,
    handleFilter: onFilter,
    handleSelection: onSelect,
    handleEdit: onEdit,
    filter,
    data,
    selectedItem,
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
        filter={filter}
        FilterContent={<Filter onFilter={onFilter} filter={filter} />}
      />
      <CollectionTable
        cells={cells}
        onSort={handleSorting}
        order={order}
        orderBy={orderBy}
        data={data.results}
        itemHandlers={{ onClick: onSelect, onDoubleClick: onEdit }}
        selectedItem={selectedItem}
        style={{ marginTop: 10 }}
      >
        {TaskRow}
      </CollectionTable>
    </div>
  );
}
