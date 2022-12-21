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
        onChange={onFilter}
        value={filter.created_at__date}
      />
      <Input
        label="Statue"
        placeholder="Statue"
        onChange={onFilter}
        value={filter.statue}
        name="statue"
      />
      <Input
        label="Type"
        placeholder="type"
        onChange={onFilter}
        value={filter.type}
        name="type"
      />
      <Input
        label="Fermer"
        placeholder="Closed"
        onChange={onFilter}
        value={filter.closed}
        name="closed"
      />
    </div>
  );
}
