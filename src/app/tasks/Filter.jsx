import Input from "app/composants.v2/Input";
import InputSelector from "app/composants.v2/InputSelector";
import React from "react";
import { statues as defaultStatues } from "./Config";

export default function Filter(props) {
  const { filter, onFilter } = props;

  const statues = [{ display: "tous", value: "tous" }, ...defaultStatues];

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

      <InputSelector
        label="Statue"
        name="statue"
        value={filter.statue}
        options={statues}
        onChange={onFilter}
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
