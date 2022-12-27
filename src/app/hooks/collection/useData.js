import React from "react";
import api from "app/services/ApiService";
/**
 * special to get collection data from server, not pagination
 */

export function useData(collection, params) {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState();

  api.initialize(collection);

  const handleGetData = (params) => {
    api
      .getGeneric(params)
      .then((result) => {
        setData(result);
      })
      .catch((exception) => {
        console.error("Use Data Exception ", exception);
        setError(exception);
      });
  };

  React.useEffect(() => {
    handleGetData(params);
  }, []);
  return { data, error, handleGetData };
}
