import React from "react";
import history from "@history";

import ApiService from "app/services/ApiService";
import { backcolors } from "app/composants.v2/constants";
import Action from "./Action";
import { useCollectionData } from "./common/useCollectionData";
import useFilter from "./common/useFilter";

export default function useCollection({
  collection,
  pk = "id",
  defaultFilter = {},
  viewUrl,
}) {
  const apiService = new ApiService(collection);
  const {
    data: collectionData,
    metadata,
    handleGetData: onGet,
  } = useCollectionData(collection);

  const {
    filter,
    handleChange: handleFilterChange,
    resetFilter,
  } = useFilter(defaultFilter);

  React.useEffect(() => {
    setData([...collectionData]);
  }, [collectionData]);

  const [data, setData] = React.useState(collectionData);
  const [page, setPage] = React.useState(1);
  const [ordering, setOrdering] = React.useState({});
  const [selectedItem, setSelectedItem] = React.useState(null);

  React.useEffect(() => {
    onGet({ page, ...filter, ...ordering });
  }, [page, filter, ordering]);

  const addAction = new Action(
    "Ajouter",
    () => {
      history.push(`${viewUrl}/nouveau`);
    },
    "add",
    { backgroundColor: backcolors.add }
  );

  const editAction = new Action("Editer", () => handleEdit(), "edit", {
    backgroundColor: backcolors.edit,
  });

  const deleteAction = new Action("Supprimer", () => handleDelete(), "delete", {
    backgroundColor: backcolors.delete,
  });

  const handleEdit = React.useCallback(() => {
    console.log("Edit", selectedItem);
    if (selectedItem) {
      history.push(`${viewUrl}/${selectedItem[pk]}`);
      setSelectedItem(null);
      return;
    }
  }, [selectedItem]);

  const handleDelete = React.useCallback(() => {
    if (!Boolean(selectedItem)) return;
    const clean = data.filter(
      (value, index, arr) => selectedItem[pk] != value[pk]
    );
    setData([...clean]);
    apiService
      .deleteItem(selectedItem)
      .then((response) => {
        setSelectedItem(null);
      })
      .catch((exception) => {});
  }, [selectedItem]);

  const handleSelection = (item) => {
    console.log("handleSelection", item);

    setSelectedItem(item);
  };

  return {
    metadata,
    data,
    filter,
    setPage,
    setOrdering,
    handleSelection,
    handleFilterChange,
    resetFilter,
    handleDelete,
    handleEdit,
    addAction,
    editAction,
    deleteAction,
    selectedItem,
  };
}
