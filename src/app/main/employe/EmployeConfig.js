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
    // {
    //   path: "/employe/:id",
    //   component: React.lazy(() => import("./DevisAchatView")),
    // },
    {
      path: "/employe_collection/",
      component: React.lazy(() => import("./EmployeCollectionView")),
    },
    {
      path: "/tasks_collection/",
      component: React.lazy(() => import("./EmployeTasksCollectionView")),
    },
  ],
};

export const collectionColumns = [
  {
    id: "nom",
    align: "left",
    disablePadding: false,
    label: "Employe",
    sort: true,
  },
  {
    id: "poste",
    align: "left",
    disablePadding: false,
    label: "Poste",
    sort: true,
  },
  {
    id: "superviseur",
    align: "left",
    disablePadding: false,
    label: "Superviseur",
    sort: true,
  },

  {
    id: "service",
    align: "center",
    disablePadding: true,
    label: "Service",
    sort: true,
  },
  {
    id: "entreprise",
    align: "center",
    disablePadding: true,
    label: "Entreprise",
    sort: true,
  },

  {
    id: "global_note",
    align: "left",
    disablePadding: false,
    label: "Note Général",
    sort: true,
  },
  {
    id: "task_today",
    align: "left",
    disablePadding: false,
    label: "Tasks",
    sort: true,
  },
  {
    id: "state",
    align: "left",
    disablePadding: false,
    label: "State",
    sort: true,
  },
];

export const tasksColumns = [
  {
    id: "task",
    align: "left",
    disablePadding: false,
    label: "Task",
    sort: true,
  },
  {
    id: "time",
    align: "left",
    disablePadding: false,
    label: "Temps",
    sort: true,
  },
  {
    id: "personnel",
    align: "left",
    disablePadding: false,
    label: "Personne",
    sort: true,
  },

  {
    id: "delay",
    align: "left",
    disablePadding: true,
    label: "Retard",
    sort: true,
  },

  {
    id: "state",
    align: "center",
    disablePadding: true,
    label: "Statue",
    sort: true,
  },
];
