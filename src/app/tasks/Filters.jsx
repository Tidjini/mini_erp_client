import Input from "app/composants.v2/Input";
import React from "react";

export default function Filters(props) {
  const { filters, onFilter } = props;

  return (
    <div>
      <Input
        label="Date"
        placeholder="Date"
        type="date"
        name="created_at__date"
        handleChange={onFilter}
        value={filters.created_at__date}
      />
      <Input
        label="Statue"
        placeholder="Statue"
        handleChange={onFilter}
        value={filters.statue}
        name="statue"
      />
      <Input
        label="Type"
        placeholder="type"
        handleChange={onFilter}
        value={filters.type}
        name="type"
      />
      <Input
        label="Fermer"
        placeholder="Closed"
        handleChange={onFilter}
        value={filters.closed}
        name="closed"
      />
    </div>
  );
}
