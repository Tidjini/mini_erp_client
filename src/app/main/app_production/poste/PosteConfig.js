import React from "react";
import { authRoles } from "app/auth";

export const PosteConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/production-postes/",
      component: React.lazy(() => import("./PosteCollection")),
    },
    {
      path: "/production-poste/:posteId",
      component: React.lazy(() => import("./PosteView")),
    },
  ],
};

export const collectionCells = [
  {
    id: "intitule",
    label: "Intitule",
  },
  {
    id: "periode",
    label: "Periode",
  },
  {
    id: "nbr_heure",
    label: "Nombre Heures",
  },
];

export const defaultItem = {
  intitule: "",
  periode: "JOUR",
  nbr_heure: 12,
};
