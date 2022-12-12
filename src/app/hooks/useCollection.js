import React from "react";
import apiService from "app/services/ApiService";

export default function useCollection(name, pk = "id") {
  const [data, setData] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [ordering, setOrdering] = React.useState({});

  React.useEffect(() => {
    apiService.initialize(name, pk);
  }, []);

  React.useEffect(() => {
    apiService
      .getCollection(page, filters, ordering)
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((exception) => {});
  }, [page, filters, ordering]);

  const deleteItem = (item) => {
    const clean = data.filter((value, index, arr) => item[pk] != value[pk]);
    setData(clean);
    apiService
      .deleteItem(item)
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((exception) => {});
  };

  return { data, setPage, setFilters, setOrdering, deleteItem };
}
