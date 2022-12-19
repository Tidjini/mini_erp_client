import React from "react";

import { Typography } from "@material-ui/core";

import Header from "app/composants.v2/Header";

export default function TaskCollectionView(props) {
  return (
    <div>
      <Header title="Collection des Tâches" />
      <h1>filters</h1>
      <div>
        <h1>collection header</h1>
        <h1>collection body</h1>
        <h1>collection pagination</h1>
      </div>
    </div>
  );
}
