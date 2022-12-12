import React from "react";

export const TacheConfig = {
  routes: [
    {
      path: "/tache-configurations/",
      component: React.lazy(() => import("./Configurations")),
    },
    {
      path: "/tache-list/",
      component: React.lazy(() => import("./taches/TacheCollection")),
    },
    {
      path: "/tache-view/:tacheId",
      component: React.lazy(() => import("./taches/TacheView")),
    },
  ],
};
