import React from "react";
import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/collection/CollectionActions";
import { margins } from "app/composants.v2/constants";
import useView from "app/hooks/useView";
import Input from "app/composants.v2/Input";

const task = {
  id: 0,
  documents: [],
  caption: "",
  statue_label: "",
  closed: false,
  created_date: "",
  created_time: "",
  receiver_name: "",
  creator_name: "",
  statue: "i",
  label: "",
  forecolor: "#27187E",
  backcolor: "#E9C46A",
  description: "",
  created_at: "",
  finished_at: null,
  creator: 1,
  receiver: 2,
};

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
    data: task,
  });

  const actions = [saveAction, deleteAction];

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
      </div>
    </div>
  );
}
