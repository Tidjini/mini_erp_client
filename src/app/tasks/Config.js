import React from "react";

export const TaskConfig = {
  routes: [
    {
      path: "tasks/",
      component: React.lazy(() => import("./TaskCollectionView")),
    },
  ],
};
