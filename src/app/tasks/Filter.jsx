import Input from "app/composants.v2/Input";
import InputCollection from "app/composants.v2/InputCollection";
import InputSelector from "app/composants.v2/InputSelector";
import React from "react";
import { useSelector } from "react-redux";
import { statues as defaultStatues } from "./Config";

export default function Filter(props) {
  const { filter, onFilter, onFilterChange } = props;

  const user = useSelector(({ auth }) => auth.user.data);

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
      <InputCollection
        label="Créer par"
        name="creator"
        style={{
          display: user.is_admin || user.is_staff ? "block" : "none",
        }}
        lookup={{
          collection: "profiles",
          display: "name",
          value: "id",
          emptyValue: { display: "Tous", value: null },
          defaultValue: filter.creator,
        }}
        onSelectItem={(item) => {
          onFilterChange("creator", item.value);
        }}
      />
      <InputCollection
        label="Affectée a"
        name="receiver"
        style={{ display: user.is_admin || user.is_staff ? "block" : "none" }}
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
        style={{ display: user.is_admin || user.is_staff ? "block" : "none" }}
      />

      <InputSelector
        label="Catégorie"
        name="closed"
        value={filter.closed}
        options={categories}
        onChange={onFilter}
        style={{ display: user.is_admin || user.is_staff ? "block" : "none" }}
      />
    </div>
  );
}
