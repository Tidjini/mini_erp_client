import React from "react";

import { ApiService } from "app/services/ApiService";

export function useSave(collection, pk = "id") {
  const apiService = new ApiService(collection, pk);

  const [response, setResponse] = React.useState();
  const [error, setError] = React.useState();

  const handleSave = (item) => {
    apiService
      .saveItem(item)
      .then((response) => {
        setResponse(response);
      })
      .catch((exception) => {
        setError(exception);
      });
  };

  return { response, handleSave, error };
}

export function useGetCollection(collection, pageResponse = false) {
  const apiService = new ApiService(collection);

  const [data, setData] = React.useState();
  const [error, setError] = React.useState();

  const handleGet = () => {
    apiService
      .getCollection()
      .then((response) => {
        if (pageResponse) {
          setData(response.results);
        } else {
          setData(response);
        }
      })
      .catch((exception) => {
        setError(exception);
      });
  };

  return { data, handleGet };
}
