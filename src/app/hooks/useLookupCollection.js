import React from "react";

import apiService from "app/services/ApiService";
import { da } from "date-fns/locale";
import useFilter from "./useFilter";

export default function useLookupCollection(
  params = { name, filter, pk: "id", pageResponse: false }
) {
  const { name, filter: defaultFilter, pk, pageResponse } = params;
  const [data, setData] = React.useState([]);
  const { filter, handleFilter } = useFilter(defaultFilter);

  const getCollection = (page, filter, ordering = {}) => {
    apiService
      .getCollection(page, filter, ordering)
      .then((response) => {
        let results = [];
        if (pageResponse) {
          results = [...response.results];
        } else {
          results = [...response];
        }
        setData(results);
      })
      .catch((exception) => {
        /*TODO later*/
      });
  };
  React.useEffect(() => {
    function initialize() {
      apiService.initialize(name, pk);
      getCollection(1, filter);
    }
    initialize();
  }, [filter]);

  return { filter, data, handleFilter };
}
