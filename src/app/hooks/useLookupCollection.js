import React from "react";

import apiService from "app/services/ApiService";
import useFilter from "./useFilter";

export default function useLookupCollection(
  params = { name, filter, pk: "id", pageResponse: false }
) {
  const { name, filter: defaultFilter, pk, pageResponse } = params;
  const { filter, handleFilter } = useFilter(defaultFilter);
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);

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

  const handleInputChange = React.useCallback((event, onChange) => {
    const search = event.target.value;
    // setLoading(true);
    // getCollection({ search: search }, 1);

    //handle basic changes in InputBase
    onChange(event, search);
  }, []);

  const handleSelection = (value) => {
    console.log("handle selection", value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return {
    filter,
    data,
    open,
    handleFilter,
    handleInputChange,
    handleSelection,
    handleOpen,
    handleClose,
  };
}
