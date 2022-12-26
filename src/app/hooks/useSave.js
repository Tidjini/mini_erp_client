import React from "react";

import { ApiService } from "app/services/ApiService";

export default function useSave(collection, pk = "id") {
  const apiService = ApiService(collection, pk);

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
