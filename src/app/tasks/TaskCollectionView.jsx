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
import TaskNofitication from "app/composants.v2/notification/TaskNofitication";
import { CircularProgress, Typography } from "@material-ui/core";

export default function TaskCollectionView(props) {
  const {
    addAction,
    editAction,
    deleteAction,
    handleFilterChange: onFilterChange,
    handleSelection: onSelect,
    handleEdit: onEdit,
    filter,
    data,
    loading,
    selectedItem,
  } = useCollection({
    collection: "tasks",
    pk: "id",
    defaultfilter: {},
    viewUrl: "/task",
    pageResponse: true,
  });

  const user = useSelector(({ auth }) => auth.user.data);
  useGeoLocation();

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

  const search = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
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

  return (
    <div>
      <div
        style={{
          backgroundColor: "#26465350",
          position: "absolute",
          width: "100%",
          height: "100%",
          display: loading ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 5,
        }}
      >
        <Typography className="text-18 mb-16" color="textSecondary">
          Loading...
        </Typography>
        {/* <LinearProgress className="w-xs" color="secondary" /> */}
        <CircularProgress color="inherit" size={36} />
      </div>
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
        <CollectionFilters onFilter={search} filter={filter}>
          <Filter filter={filter} onFilterChange={onFilterChange} />
        </CollectionFilters>
        <CollectionTable
          cells={cells}
          onSort={handleSorting}
          order={order}
          orderBy={orderBy}
          data={data}
          isLoading={loading}
          itemHandlers={{ onClick: onSelect, onDoubleClick: onEdit }}
          selectedItem={selectedItem}
          style={{ marginTop: 10 }}
        >
          {TaskRow}
        </CollectionTable>

        <TaskNofitication />
      </div>
    </div>
  );
}
