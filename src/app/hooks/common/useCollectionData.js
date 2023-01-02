import React from "react";
import ApiService from "app/services/ApiService";
/**
 * special to get collection data from server, not pagination
 */

export function useCollectionData(collection, params) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
    setLoading(true);
    api
      .getGeneric(params)
      .then((response) => {
        handleSettingData(response);
        setLoading(false);
      })
      .catch((exception) => {
        console.error("Use Data Exception ", exception);
        setError(exception);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    handleGetData(params);
  }, []);
  return { loading, data, metadata, error, handleGetData };
}
