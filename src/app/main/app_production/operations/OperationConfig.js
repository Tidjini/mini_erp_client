import React from "react";
import { authRoles } from "app/auth";

export const ProductionOperationConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/production-operations/",
      component: React.lazy(() => import("./OperationCollection")),
    },
    // {
    //   path: "/production-operations/:operation_id",
    //   component: React.lazy(() => import("./OperationView")),
    // },
  ],
};

export const collectionCells = [
  {
    id: "wagon",
    label: "Wagon",
  },
  {
    id: "date",
    label: "Date",
  },

  {
    id: "Intitule",
    label: "Intitule",
  },

  {
    id: "produit",
    label: "Produit",
  },
  {
    id: "phase",
    label: "Phase",
  },
  {
    id: "anomalie",
    label: "Anomalie",
  },
  {
    id: "Type Anomalie",
    label: "Type Anomalie",
  },
  {
    id: "Agent",
    label: "Agent",
  },

  {
    id: "anomalie_remarque",
    label: "Remarque",
  },
];

export const defaultItem = {
  id: "",
  produit_designation: "",
  agent_anomalie: null,
  date: "",
  intitule: "",
  phase: "",
  anomalie: false,
  anomalie_remarque: null,
  anomalie_flag: "",
  production: "",
  wagon: "",
  produit: "",
  anomalie_agent: null,
};
