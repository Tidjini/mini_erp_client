import React from "react";

export default function useFilter(defaultFilter) {
  const [filter, setFilter] = React.useState(defaultFilter);

  const cleanFilter = (filter, name) => {
    const cleaned = { ...filter };
    delete cleaned[name];
    setFilter({ ...cleaned });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    const newFilter = { ...filter };
    //clean null and undefined
    if (value === null || value == undefined) {
      cleanFilter(newFilter, name);
      return;
    }
    //convert to str to avoid int . toLowerCase
    value += "";
    if (
      value.toLowerCase() === "non définie" ||
      value.toLowerCase() === "tous"
    ) {
      cleanFilter(newFilter, name);
      return;
    }
    setFilter({ ...newFilter, [name]: value });
  };

  const resetFilter = () => {
    setFilter({});
  };

  return { filter, handleFilterChange, resetFilter };
}
