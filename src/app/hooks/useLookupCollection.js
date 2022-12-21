import React from "react";

import { ApiService } from "app/services/ApiService";
import useFilter from "./useFilter";

export default function useLookupCollection(
  params = {
    name,
    filter,
    pk: "id",
    display,
    value: "id",
    pageResponse: false,
    emptyValue,
  }
) {
  const {
    name,
    filter: defaultFilter,
    pk,
    pageResponse,
    display,
    value,
    emptyValue,
  } = params;
  const { filter, handleFilter } = useFilter(defaultFilter);
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({
    display: "Non Définie",
    value: null,
  });

  const apiService = new ApiService();

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

        const items = results.map((item) => {
          return {
            display: item[display],
            value: item[value],
          };
        });

        if (emptyValue) {
          setData([emptyValue, ...items]);
          return;
        }
        setData(items);
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
    console.log("handleSelection", value);
    setSelected(value);
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
    selected,
    handleFilter,
    handleInputChange,
    handleSelection,
    handleOpen,
    handleClose,
  };
}
