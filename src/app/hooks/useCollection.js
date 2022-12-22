import React from "react";
import history from "@history";

import apiService from "app/services/ApiService";
import { backcolors } from "app/composants.v2/constants";
import Action from "./Action";
import useGetCollection from "./useGetCollection";


export default function useCollection({ name, pk= "id", filter= {}, pageResponse }) {
  apiService.initialize(name, pk);

  const [filter, setfilter] = React.useState(defaultfilter);
  const [page, setPage] = React.useState(1);
  const [ordering, setOrdering] = React.useState({});
  const [selectedItem, setSelectedItem] = React.useState(null);

  const { data, handleGet: onGet } = useGetCollection({
    apiService,
    pageResponse,
  });

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

  const handleFilter = React.useCallback(
    (event) => {
      const { value } = event.target;

      if (
        value === undefined ||
        value === null ||
        value.toLowerCase() === "non définie" ||
        value.toLowerCase() === "tous"
      ) {
        const cleaned = { ...filter };
        delete cleaned[event.target.name];
        setfilter({ ...cleaned });
        return;
      }

      setfilter({ ...filter, [event.target.name]: event.target.value });
    },
    [filter]
  );




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

  const getCollection = React.useCallback(() => {
    onGet({page, filter, ordering});
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
