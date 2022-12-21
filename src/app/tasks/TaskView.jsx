import React from "react";
import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/collection/CollectionActions";
import { margins } from "app/composants.v2/constants";
import useView from "app/hooks/useView";

export default function TaskView(props) {
  const { id } = props.match.params;

  const {
    title,
    handleGoBack: goBack,
    saveAction,
    deleteAction,
  } = useView({
    name: "tasks",
    title: "Tâche",
    primary: id,
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
    </div>
  );
}
