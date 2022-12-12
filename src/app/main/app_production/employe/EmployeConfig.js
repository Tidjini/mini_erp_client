import React from "react";
import { authRoles } from "app/auth";

export const EmployeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/gestion-employees/",
      component: React.lazy(() => import("./EmployeCollection")),
    },
    {
      path: "/gestion-employe/:employeId",
      component: React.lazy(() => import("./EmployeView")),
    },
  ],
};

export const collectionCells = [
  {
    id: "nom",
    label: "Nom",
  },
  {
    id: "prenom",
    label: "Prénom",
  },
  {
    id: "poste",
    label: "Poste",
  },
  {
    id: "service",
    label: "Service",
  },
  {
    id: "superviseur",
    label: "Superviseur.",
  },
];

export const defaultItem = {
  id: "",
  service_object: {},
  nom: "",
  prenom: "",
  poste: "",
  service: "",
  superviseur: "",
};
