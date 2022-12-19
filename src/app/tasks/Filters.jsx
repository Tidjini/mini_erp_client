import Input from "app/composants.v2/Input";
import React from "react";

export default function Filters(props) {
  const { filters, setFilters } = props;

  const handleChanges = React.useCallback(
    (event) => {
      setFilters({
        ...filters,
        [event.target.name]: event.target.value,
      });
    },
    [filters]
  );

  return (
    <div>
      <Input
        label="Date"
        placeholder="Date"
        type="date"
        name="created_at__date"
        handleChange={handleChanges}
        value={filters.created_at__date}
      />
      <Input
        label="Statue"
        placeholder="Statue"
        handleChange={handleChanges}
        value={filters.statue}
        name="statue"
      />
      <Input
        label="Type"
        placeholder="type"
        handleChange={handleChanges}
        value={filters.type}
        name="type"
      />
      <Input
        label="Fermer"
        placeholder="Closed"
        handleChange={handleChanges}
        value={filters.closed}
        name="closed"
      />
    </div>
  );
}
