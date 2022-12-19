import React from "react";

import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/CollectionActions";

import useCollection from "app/hooks/useCollection";

export default function TaskCollectionView(props) {
  const { addAction, editAction, deleteAction } = useCollection();

  const actions = [addAction, editAction, deleteAction];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header title="Collection des Tâches" />
        <CollectionActions actions={actions} />
      </div>
      <h1>filters</h1>
      <div>
        <h1>collection header</h1>
        <h1>collection body</h1>
        <h1>collection pagination</h1>
      </div>
    </div>
  );
}
