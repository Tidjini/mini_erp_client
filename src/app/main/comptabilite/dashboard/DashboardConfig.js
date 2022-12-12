import React from "react";
import { authRoles } from "app/auth";

export const DashboardConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: true,
          style: "fixed",
          position: "below",
        },
      },
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/compta_dashboard/",
      component: React.lazy(() => import("./Dashboard")),
    },
  ],
};
