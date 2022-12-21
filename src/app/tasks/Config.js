import React from "react";

const collectionPath = "/tasks/";

export const TaskConfig = {
  routes: [
    {
      path: collectionPath,
      component: React.lazy(() => import("./TaskCollectionView")),
    },
    {
      path: "/task/:id",
      component: React.lazy(() => import("./TaskView")),
    },
  ],
  navigation: {
    id: "tasks",
    title: "Gestion Des Taches",
    type: "group",
    children: [
      {
        id: "taches",
        title: "Tâches",
        icon: "add_task",
        type: "item",
        url: collectionPath,
      },
    ],
  },
};
