import React from "react";
import ApiService from "app/services/ApiService";
/**
 * special to get collection data from server, not pagination
 */

export function useCollectionData(collection, params) {
  const [data, setData] = React.useState([]);
  const [metadata, setMetadata] = React.useState();
  const [error, setError] = React.useState();

  const api = new ApiService(collection);

  const handleSettingData = (response) => {
    if (Array.isArray(response)) {
      setData(response);
      return;
    }

    setData([...response.results]);
    delete response.results;
    setMetadata({
      ...response,
    });
  };

  const handleGetData = (params) => {
    api
      .getGeneric(params)
      .then((response) => {
        handleSettingData(response);
      })
      .catch((exception) => {
        console.error("Use Data Exception ", exception);
        setError(exception);
      });
  };

  React.useEffect(() => {
    handleGetData(params);
  }, []);
  return { data, metadata, error, handleGetData };
}
