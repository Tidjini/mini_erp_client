import React from "react";

export default function useFilter(defaultFilter) {
  const [filter, setFilter] = React.useState(defaultFilter);

  const handleFilter = React.useCallback(
    (event) => {
      const { value } = event.target;

      if (
        value === undefined ||
        value === null ||
        value.toLowerCase() === "non définie" ||
        value.toLowerCase() === "tous"
      ) {
        const cleaned = { ...filter };
        delete cleaned[event.target.name];
        setFilter({ ...cleaned });
        return;
      }

      setFilter({ ...filter, [event.target.name]: event.target.value });
    },
    [filter]
  );

  return {
    filter,
    handleFilter,
  };
}
