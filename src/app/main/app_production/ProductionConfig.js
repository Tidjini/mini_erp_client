import React from "react";
import { authRoles } from "app/auth";

export const ProductionConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/production-codnfig/",
      component: React.lazy(() => import("./ProductionConfiguration")),
    },
  ],
};
