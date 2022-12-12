import React from "react";
import { authRoles } from "app/auth";

export const ConsultationConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,

  routes: [
    {
      path: "/consultation/mouvement",
      component: React.lazy(() => import("./ConsultationMouvement")),
    },
    {
      path: "/consultation/ecriture",
      component: React.lazy(() => import("./ConsultationEcriture")),
    },
  ],
};
