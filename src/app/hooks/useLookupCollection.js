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
    defaultValue: 0,
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
    defaultValue,
  } = params;

  const apiService = new ApiService();
  apiService.initialize(name, pk);

  const { filter, handleFilter } = useFilter(defaultFilter);
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({
    display: "Non Définie",
    value: null,
  });

  const getDefault = (pk) => {
    console.log("getDefault, called");

    apiService.getItem(pk).then((response) => {
      setSelected({ display: response[display], value: response[value] });
    });
  };

  const getCollection = (page, filter, ordering = {}) => {
    console.log("getCollection, called");
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
    getCollection(1, filter);
  }, [filter]);

  React.useEffect(() => {
    if (defaultValue) getDefault(defaultValue);
  }, [defaultValue]);

  const handleInputChange = React.useCallback((event, onChange) => {
    const search = event.target.value;
    // setLoading(true);
    // getCollection({ search: search }, 1);

    //handle basic changes in InputBase
    // if (search) onChange(event, search);
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
