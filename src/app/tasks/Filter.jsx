import Input from "app/composants.v2/Input";
import InputCollection from "app/composants.v2/InputCollection";
import InputSelector from "app/composants.v2/InputSelector";
import React from "react";
import { statues as defaultStatues } from "./Config";

export default function Filter(props) {
  const { filter, onFilter, onFilterChange } = props;

  const statues = [{ display: "tous", value: "tous" }, ...defaultStatues];
  const categories = [
    { display: "Tous", value: "tous" },
    { display: "Opened", value: "0" },
    { display: "Closed", value: "1" },
  ];
  const types = [
    { display: "Tous", value: "tous" },
    { display: "Tâches Créées", value: "0" },
    { display: "Tâches Affectées", value: "1" },
  ];

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

      <InputSelector
        label="Type"
        name="type"
        value={filter.type}
        options={types}
        onChange={onFilter}
      />

      <InputSelector
        label="Catégorie"
        name="closed"
        value={filter.closed}
        options={categories}
        onChange={onFilter}
      />

      <InputCollection
        label="Affectée"
        name="receiver"
        style={{}}
        lookup={{
          collection: "profiles",
          display: "name",
          value: "id",
          emptyValue: { display: "Tous", value: null },
          defaultValue: filter.receiver,
        }}
        onSelectItem={(item) => {
          onFilterChange("receiver", item.value);
        }}
      />
    </div>
  );
}
