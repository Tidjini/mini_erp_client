import React from "react";
import history from "@history";

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

//todo rememeber to use Page Response, And Response with simple Collection
export default function useCollection(params = { name, pk: "id", filter: {} }) {
  const { name, pk, filter: defaultfilter, viewUrl } = params;

  // const navigation = useHistory();

  const [data, setData] = React.useState([]);
  const [filter, setfilter] = React.useState(defaultfilter);
  const [page, setPage] = React.useState(1);
  const [ordering, setOrdering] = React.useState({});
  const [selectedItem, setSelectedItem] = React.useState(null);

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

  const handleFilter = (event) => {
    if (event.target.value === "Non Définie" || event.target.value === "Tous") {
      event.target.value = null;
    }

    if (!Boolean(event.target.value)) {
      const filter = { ...filter };
      delete filter[event.target.name];
      setfilter({ ...filter });
      return;
    }
    setfilter({ ...filter, [event.target.name]: event.target.value });
  };

  React.useEffect(() => {
    apiService.initialize(name, pk);
  }, []);

  const getCollection = (page, filter, ordering) => {
    setSelectedItem(null);
    apiService
      .getCollection(page, filter, ordering)
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((exception) => {});
  };
  React.useEffect(() => {
    getCollection(page, filter, ordering);
  }, [page, filter, ordering]);

  const handleEdit = React.useCallback(() => {
    if (selectedItem) {
      history.push(`${viewUrl}/${selectedItem[pk]}`);
      setSelectedItem(null);
      return;
    }

    console.log("no item selected");
  }, [selectedItem]);

  const handleDelete = React.useCallback(() => {
    console.log("on handleDelete callback", selectedItem);
    if (!Boolean(selectedItem)) return;
    const clean = data.results.filter(
      (value, index, arr) => selectedItem[pk] != value[pk]
    );
    console.log(clean);
    setData({
      count: 2,
      next: null,
      previous: null,
      results: [...clean],
    });
    apiService
      .deleteItem(selectedItem)
      .then((response) => {
        // setData(response);
        setSelectedItem(null);
        console.log(response);
      })
      .catch((exception) => {});
  }, [selectedItem]);

  const handleRefresh = React.useCallback(() => {
    getCollection(page, filter, ordering);
  }, [page, filter, ordering]);

  const handleSelection = (item) => {
    setSelectedItem(item);
  };

  return {
    data,
    filter,
    setPage,
    setOrdering,
    handleSelection,
    handleFilter,
    handleRefresh,
    handleDelete,
    handleEdit,
    addAction,
    editAction,
    deleteAction,
    selectedItem,
  };
}
