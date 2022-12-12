import React from "react";
import { authRoles } from "app/auth";

export const ProductionProdConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/productions/",
      component: React.lazy(() => import("./ProductionCollection")),
    },
    {
      path: "/production/:production_id",
      component: React.lazy(() => import("./ProductionView")),
    },
  ],
};

export const collectionCells = [
  {
    id: "date",
    label: "Date",
  },
  {
    id: "intitule",
    label: "intitule",
  },
  {
    id: "poste",
    label: "poste",
  },
  {
    id: "equipe",
    label: "equipe",
  },
  {
    id: "responsable",
    label: "responsable",
  },
];

export const defaultItem = {
  date: "",
  intitule: "",
  equipe: "",
  responsable: "",
  poste: "",
  responsable_nom: "",
  id: "",
  objectif: 22,
};
