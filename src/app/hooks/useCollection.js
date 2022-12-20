import React from "react";
import apiService from "app/services/ApiService";

import { backcolors } from "app/composants.v2/constants";
class Action {
  constructor(label, callback, icon, style) {
    this.label = label;
    this.callback = callback;
    this.icon = icon;
    this.style = style;
  }
}

export default function useCollection(
  params = { name, pk: "id", filters: {} }
) {
  const { name, pk, filters: defaultFilters } = params;

  const [data, setData] = React.useState([]);
  const [filters, setFilters] = React.useState(defaultFilters);
  const [page, setPage] = React.useState(1);
  const [ordering, setOrdering] = React.useState({});
  const [selectedItem, setSelectedItem] = React.useState(null);

  const addAction = new Action(
    "Ajouter",
    () => console.log("on add callback"),
    "add",
    { backgroundColor: backcolors.add }
  );

  const editAction = new Action("Editer", () => handleEdit(), "edit", {
    backgroundColor: backcolors.edit,
  });

  const deleteAction = new Action("Supprimer", () => handleDelete(), "delete", {
    backgroundColor: backcolors.delete,
  });

  const handleFilter = (event) => {
    if (event.target.value === "Non Définie" || event.target.value === "Tous") {
      event.target.value = null;
    }

    if (!Boolean(event.target.value)) {
      const filter = { ...filters };
      delete filter[event.target.name];
      setFilters({ ...filter });
      return;
    }
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  React.useEffect(() => {
    apiService.initialize(name, pk);
  }, []);

  const getCollection = (page, filters, ordering) => {
    setSelectedItem(null);
    apiService
      .getCollection(page, filters, ordering)
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((exception) => {});
  };
  React.useEffect(() => {
    getCollection(page, filters, ordering);
  }, [page, filters, ordering]);

  const handleEdit = React.useCallback(() => {
    console.log("on handleEdit callback", selectedItem);
  }, [selectedItem]);

  const handleDelete = React.useCallback(() => {
    console.log("on handleDelete callback", selectedItem);
    if (!Boolean(selectedItem)) return;
    const clean = data.filter(
      (value, index, arr) => selectedItem[pk] != value[pk]
    );
    setData(clean);
    apiService
      .handleDelete(selectedItem)
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((exception) => {});
  }, [selectedItem]);

  const handleRefresh = React.useCallback(() => {
    getCollection(page, filters, ordering);
  }, [page, filters, ordering]);

  const handleSelection = (item) => {
    setSelectedItem(item);
  };

  return {
    data,
    filters,
    setPage,
    setOrdering,
    handleSelection,
    handleFilter,
    handleRefresh,
    handleDelete,
    addAction,
    editAction,
    deleteAction,
    selectedItem,
  };
}
