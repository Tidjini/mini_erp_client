import React from "react";
import TaskMapView from "./TaskMapView";

export default function GlobalMap(props) {
  const [selectedPath, setSelectedPath] = React.useState();

  return <TaskMapView path={selectedPath} />;
}
