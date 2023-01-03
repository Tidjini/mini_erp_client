import React from "react";

import CollectionActions from "app/composants.v2/collection/CollectionActions";
import CollectionTable from "app/composants.v2/collection/CollectionTable";
import CollectionFilters from "app/composants.v2/collection/CollectionFilters";
import Header from "app/composants.v2/Header";
import Loader from "app/composants.v2/Loader";
import useCollection from "app/hooks/useCollection";
import { margins } from "app/composants.v2/constants";
import { profileCell } from "./Config";

export default function ProfileCollectionView(props) {
  const { history } = props;
  const {
    handleFilterChange: onFilterChange,
    handleSelection: onSelect,
    handleEdit: onEdit,
    filter,
    data,
    loading,
    selectedItem,
  } = useCollection({
    collection: "profiles",
    pk: "id",
    defaultfilter: {},
    viewUrl: "/profile",
    pageResponse: false,
  });

  const search = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

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
    <div>
      <Loader isLoading={loading} />
      <div style={{ margin: margins.default }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Header title="Collection des Tâches" />

          <CollectionActions actions={[]} />
        </div>
        <CollectionFilters onFilter={search} filter={filter}>
          {/* <Filter filter={filter} onFilterChange={onFilterChange} /> */}
        </CollectionFilters>
        <CollectionTable
          cells={profileCell}
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
