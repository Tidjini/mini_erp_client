import React from "react";

import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/collection/CollectionActions";
import useCollection from "app/hooks/useCollection";
import { margins } from "app/composants.v2/constants";
import CollectionFilters from "app/composants.v2/collection/CollectionFilters";
import Filter from "app/tasks/Filter";
import CollectionTable from "app/composants.v2/collection/CollectionTable";
import TaskRow from "./TaskRow";
import { cells as allCells } from "./Config";
import { useSelector } from "react-redux";
import { useGeoLocation } from "app/hooks/useGeoLocation";
import { useCollectionData } from "app/hooks/common/useCollectionData";
import TestNotif from "./TestNotif";
import { onMessageListener } from "app/services/Firebase";

export default function TaskCollectionView(props) {
  const {
    addAction,
    editAction,
    deleteAction,
    handleFilter: onFilter,
    handleFilterChange: onFilterChange,
    handleSelection: onSelect,
    handleEdit: onEdit,
    filter,
    data,
    selectedItem,
  } = useCollection({
    collection: "tasks",
    pk: "id",
    defaultfilter: {},
    viewUrl: "/task",
    pageResponse: true,
  });

  const user = useSelector(({ auth }) => auth.user.data);
  const { data: d, metadata, error } = useCollectionData("tasks");
  const location = useGeoLocation();

  const actions = [addAction, editAction, deleteAction];

  const [cells, setCells] = React.useState(allCells);

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

  React.useEffect(() => {
    if (user.is_admin || user.is_staff) {
      setCells(allCells);
    } else {
      setCells([
        { ordering: true, label: "Statue", id: "statue_label" },
        { label: "Intitule", id: "label", style: { minWidth: 100 } },
        {
          label: "Description",
          id: "description",
          component: "th",
          scope: "row",
          style: { minWidth: 200 },
        },
        { ordering: true, label: "Created", id: "created_date" },
      ]);
    }
  }, [user]);

  const [open, setOpen] = React.useState(true);

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
      <CollectionFilters onFilter={onFilter} filter={filter}>
        <Filter
          onFilter={onFilter}
          filter={filter}
          onFilterChange={onFilterChange}
        />
      </CollectionFilters>
      <CollectionTable
        cells={cells}
        onSort={handleSorting}
        order={order}
        orderBy={orderBy}
        data={data}
        itemHandlers={{ onClick: onSelect, onDoubleClick: onEdit }}
        selectedItem={selectedItem}
        style={{ marginTop: 10 }}
      >
        {TaskRow}
      </CollectionTable>

      <TestNotif open={open} setOpen={setOpen} />
    </div>
  );
}
