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
  const [selectedItem, setSelectedItem] = React.useState();

  const addAction = new Action(
    "Ajouter",
    () => console.log("on add callback"),
    "add",
    { backgroundColor: backcolors.add }
  );

  const editAction = new Action("Editer", () => editItem(), "edit", {
    backgroundColor: backcolors.edit,
  });

  const deleteAction = new Action("Supprimer", () => deleteItem(), "delete", {
    backgroundColor: backcolors.delete,
  });

  const onFilterChange = (event) => {
    if (event.target.value === "Non Définie" || event.target.value === "Tous") {
      event.target.value = null;
    }
    if (!Boolean(event.target.value)) return;
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  React.useEffect(() => {
    apiService.initialize(name, pk);
  }, []);

  React.useEffect(() => {
    apiService
      .getCollection(page, filters, ordering)
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((exception) => {});
  }, [page, filters, ordering]);

  const deleteItem = React.useCallback(() => {
    console.log("on deleteItem callback", selectedItem);
    if (!Boolean(selectedItem)) return;
    const clean = data.filter(
      (value, index, arr) => selectedItem[pk] != value[pk]
    );
    setData(clean);
    apiService
      .deleteItem(selectedItem)
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((exception) => {});
  }, [selectedItem]);

  const editItem = React.useCallback(() => {
    console.log("on editItem callback", selectedItem);
  }, [selectedItem]);

  const onRefresh = React.useCallback(() => {
    apiService
      .getCollection(page, filters, ordering)
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((exception) => {});
  }, [page, filters, ordering]);

  return {
    data,
    setPage,
    filters,
    setFilters,
    onFilterChange,
    setOrdering,
    onRefresh,
    deleteItem,
    addAction,
    editAction,
    deleteAction,
    setSelectedItem,
  };
}
