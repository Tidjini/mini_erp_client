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
import Loader from "app/composants.v2/Loader";
import Action from "app/hooks/Action";

export default function TaskCollectionView(props) {
  const { history } = props;
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

  const goToMapView = new Action(
    "Map View",
    () => history.push("/tasks-map-view/"),
    "map",
    {
      backgroundColor: "#264653",
    }
  );
  const actions = [addAction, goToMapView, editAction, deleteAction];

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
    return () => {};
  }, [user]);

  return (
    <div>
      <Loader isLoading={loading} />
      <div style={{ margin: margins.default }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Header title="Collection des T??ches" />

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
          itemHandlers={{ onClick: onSelect, onDoubleClick: onEdit }}
          selectedItem={selectedItem}
          style={{ marginTop: 10 }}
        >
          {TaskRow}
        </CollectionTable>
      </div>
    </div>
  );
}
