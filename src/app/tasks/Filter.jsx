import Input from "app/composants.v2/Input";
import React from "react";

export default function Filter(props) {
  const { filter, onFilter } = props;

  return (
    <div>
      <Input
        label="Date"
        placeholder="Date"
        type="date"
        name="created_at__date"
        handleChange={onFilter}
        value={filter.created_at__date}
      />
      <Input
        label="Statue"
        placeholder="Statue"
        handleChange={onFilter}
        value={filter.statue}
        name="statue"
      />
      <Input
        label="Type"
        placeholder="type"
        handleChange={onFilter}
        value={filter.type}
        name="type"
      />
      <Input
        label="Fermer"
        placeholder="Closed"
        handleChange={onFilter}
        value={filter.closed}
        name="closed"
      />
    </div>
  );
}
