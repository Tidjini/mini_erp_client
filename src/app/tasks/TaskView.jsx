import React from "react";
import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/collection/CollectionActions";
import { margins } from "app/composants.v2/constants";
import useView from "app/hooks/useView";
import Input from "app/composants.v2/Input";
import InputSelector from "app/composants.v2/InputSelector";
import { defaultItem, statues } from "./Config";
import InputCollection from "app/composants.v2/InputCollection";

export default function TaskView(props) {
  const { id } = props.match.params;

  const {
    title,
    saveAction,
    deleteAction,
    form,
    handleChange: onFormChanged,
    handleGoBack: goBack,
  } = useView({
    name: "tasks",
    title: "Tâche",
    primary: id,
    data: defaultItem,
  });

  const actions = [saveAction, deleteAction];

  const onInputChange = React.useCallback((event, onChange) => {
    console.log("onInputChange", onChange);
    const search = event.target.value;
    // setLoading(true);
    // getCollection({ search: search }, 1);

    //handle basic changes in InputBase
    onChange(event, search);
  }, []);

  const handleSelection = (value) => {
    console.log("handle selection", value);
  };
  return (
    <div style={{ margin: margins.default }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Header title={title} goBack={goBack} />
        <CollectionActions actions={actions} />
      </div>
      <div>
        <Input
          label="Intitule"
          placeholder="Tâche Intitule"
          name="label"
          onChange={onFormChanged}
          value={form.label}
        />
        <Input
          label="Description"
          placeholder="Description de cette tâche"
          name="description"
          onChange={onFormChanged}
          value={form.description}
          style={{
            multiline: true,
            rows: 5,
          }}
        />
        <InputSelector
          label="Statue"
          name="statue"
          value={form.statue}
          options={statues}
          onChange={onFormChanged}
        />
        <InputCollection
          label="Statue"
          name="statue"
          value={form.statue}
          options={statues}
          onChange={onFormChanged}
          onInputChange={onInputChange}
          onSelect={handleSelection}
        />
      </div>
    </div>
  );
}
