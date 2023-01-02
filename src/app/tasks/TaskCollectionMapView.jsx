import React from "react";
import TaskMapView from "./TaskMapView";

export default function TasksMapView(props) {
  const [selectedPath, setSelectedPath] = React.useState();

  return <TaskMapView path={selectedPath} />;
}
