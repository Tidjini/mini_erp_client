import React from "react";
import history from "@history";

import apiService from "app/services/ApiService";
import { backcolors } from "app/composants.v2/constants";
import Action from "./Action";
import useGetCollection from "./useGetCollection";

export default function useCollection({
  collection,
  pk = "id",
  defaultfilter = {},
  pageResponse,
  viewUrl,
}) {
  apiService.initialize(collection, pk);
  const {
    data: collectionData,
    metadata,
    handleGet: onGet,
  } = useGetCollection({
    api: apiService,
    pageResponse,
  });

  React.useEffect(() => {
    setData([...collectionData]);
  }, [collectionData]);

  const [data, setData] = React.useState(collectionData);
  const [filter, setfilter] = React.useState(defaultfilter);
  const [page, setPage] = React.useState(1);
  const [ordering, setOrdering] = React.useState({});
  const [selectedItem, setSelectedItem] = React.useState(null);

  React.useEffect(() => {
    onGet({ page, filter, ordering });
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

  const cleanFilter = (filter, name) => {
    const cleaned = { ...filter };
    delete cleaned[name];
    setfilter({ ...cleaned });
  };

  const handleFilterChange = (name, value) => {
    const newFilter = { ...filter };
    if (value === null || value == undefined) {
      cleanFilter(newFilter, name);
      return;
    }
    //convert to str
    value += "";
    if (
      value.toLowerCase() === "non définie" ||
      value.toLowerCase() === "tous"
    ) {
      cleanFilter(newFilter, name);
      return;
    }
    setfilter({ ...newFilter, [name]: value });
  };

  const handleFilter = React.useCallback(
    (event) => {
      const { value, name } = event.target;
      handleFilterChange(name, value);
    },
    [filter]
  );

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
    handleFilter,
    handleFilterChange,
    handleDelete,
    handleEdit,
    addAction,
    editAction,
    deleteAction,
    selectedItem,
  };
}
