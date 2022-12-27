import React from "react";
import history from "@history";

import api from "app/services/ApiService";

export function useNew(viewUrl) {
  const handleNew = () => {
    history.push(`${viewUrl}/nouveau`);
  };

  return handleNew;
}

export function useEdit(viewUrl, identifiant) {
  const handleEdit = (callback) => {
    if (identifiant) {
      history.push(`${viewUrl}/${identifiant}`);
      callback();
    }
  };

  return handleEdit;
}

//delete in collection, -> clean data and remove from server
//delete in view -> remove from server than return to view
export function useDelete(collection, item) {
  api.initialize(collection);

  const handleDelete = (callback, handleException) => {
    if (!Boolean(item)) return;
    api
      .deleteItem(item)
      .then((response) => {
        callback && callback();
      })
      .catch((exception) => {
        handleException && handleException();
      });
  };
  return handleDelete;
}

export function cleanFrom(data, item, pk = "id") {
  if (!Boolean(item)) return;
  return data.filter((value, index, arr) => item[pk] != value[pk]);
}

export default function useActions() {
  return <div>useActions</div>;
}
