import React from "react";

import { ApiService } from "app/services/ApiService";
import useFilter from "./useFilter";
import useGetCollection from "./useGetCollection";

export default function useLookupCollection({
  collection,
  defaultFilter,
  pk,
  display,
  value,
  pageResponse,
  emptyValue,
  defaultValue,
}) {
  const api = new ApiService();
  api.initialize(collection, pk);

  const { data, handleGet: onGet } = useGetCollection({
    api,
    pageResponse,
    emptyValue,
    display,
    value,
  });

  const { filter, handleFilter } = useFilter(defaultFilter);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({
    display: "Non Définie",
    value: null,
  });

  const getDefault = (pk) => {
    api.getItem(pk).then((response) => {
      setSelected({ display: response[display], value: response[value] });
    });
  };

  React.useEffect(() => {
    onGet({ page: 1, filter, lookup: true });
  }, [filter]);

  React.useEffect(() => {
    if (defaultValue) getDefault(defaultValue);
  }, [defaultValue]);

  const handleInputChange = React.useCallback((event, onChange) => {
    const search = event.target.value;
    //todo extra search in API service
    onChange(event, search);
  }, []);

  const handleSelection = (value) => {
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
