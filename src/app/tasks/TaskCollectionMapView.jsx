import React from "react";
import TaskMapView from "./TaskMapView";

export default function TaskCollectionMapView(props) {
  const [selectedPath, setSelectedPath] = React.useState();

  return (
    <TaskMapView
      path={selectedPath}
      style={{
        xl: 12,
        lg: 12,
      }}
      mapStyle={{
        minHeight: 700,
        height: "100%",
      }}
    />
  );
}
