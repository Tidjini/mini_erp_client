import React from "react";

import { Button, Typography } from "@material-ui/core";

import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/CollectionActions";

export default function TaskCollectionView(props) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header title="Collection des Tâches" />
        <CollectionActions />
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
