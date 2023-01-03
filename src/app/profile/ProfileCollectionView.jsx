import useCollection from "app/hooks/useCollection";
import React from "react";

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

  return <div>ProfileCollectionView</div>;
}
