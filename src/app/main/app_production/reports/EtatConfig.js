import React from "react";
import { authRoles } from "app/auth";

export const EtatConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/etat-production/",
      component: React.lazy(() => import("./EtatProductionCollection")),
    },
    // {
    //   path: "/etat-production/:date",
    //   component: React.lazy(() => import("./EmployeView")),
    // },
  ],
};

export const collectionCells = [
  {
    id: "date",
    label: "date",
  },
  {
    id: "equipe",
    label: "Equipe",
  },
  {
    id: "production_objectif",
    label: "Obj.",
    cellStyle: {
      background: "#fcbf49",
    },
  },
  {
    id: "production",
    label: "Prod.Effe.",
    cellStyle: {
      background: "#fcbf49",
    },
  },
  {
    id: "production_ecart",
    label: "Prod.Écart",
    cellStyle: {
      background: "#fcbf49",
    },
  },
  {
    id: "production_Brique_08",
    label: "BR8",
    cellStyle: {
      background: "#fcbf49",
    },
  },
  {
    id: "production_Brique_12",
    label: "BR12",
    cellStyle: {
      background: "#fcbf49",
    },
  },
  {
    id: "prod_durre",
    label: "Durrée",
    cellStyle: {
      background: "#fcbf49",
    },
  },
  {
    id: "prod_arret",
    label: "Arréts",
    cellStyle: {
      background: "#fcbf49",
    },
  },
  {
    id: "prod_effect",
    label: "T.Réalsé",
    cellStyle: {
      background: "#fcbf49",
    },
  },

  {
    id: "embalage_objectif",
    label: "Obj.",
    cellStyle: {
      background: "#83c5be",
    },
  },
  {
    id: "embalage",
    label: "Prod.Effe.",
    cellStyle: {
      background: "#83c5be",
    },
  },
  {
    id: "embalage_ecart",
    label: "Prod.Écart.",
    cellStyle: {
      background: "#83c5be",
    },
  },
  {
    id: "embalage_Brique_08",
    label: "BR8",
    cellStyle: {
      background: "#83c5be",
    },
  },
  {
    id: "embalage_Brique_12",
    label: "BR12",
    cellStyle: {
      background: "#83c5be",
    },
  },
  {
    id: "emb_durre",
    label: "Durrée",
    cellStyle: {
      background: "#83c5be",
    },
  },
  {
    id: "emb_arret",
    label: "Arréts",
    cellStyle: {
      background: "#83c5be",
    },
  },
  {
    id: "emb_effect",
    label: "T.Réalsé",
    cellStyle: {
      background: "#83c5be",
    },
  },
  {
    id: "exp_Brique_08",
    label: "BR8",
    cellStyle: {
      background: "#ffc300",
    },
  },
  {
    id: "exp_Brique_12",
    label: "BR12",
    cellStyle: {
      background: "#ffc300",
    },
  },
  {
    id: "stock_Brique_08",
    label: "BR8",
    cellStyle: {
      background: "#cfdbd5",
    },
  },
  {
    id: "stock_Brique_12",
    label: "BR12",
    cellStyle: {
      background: "#cfdbd5",
    },
  },
];

export const defaultItem = {
  id: "",
  service_object: {},
  nom: "",
  prenom: "",
  poste: "",
  service: null,
  superviseur: null,
};

export const months = [
  { display: "Janvier", value: 1 },
  { display: "Février", value: 2 },
  { display: "Mars", value: 3 },
  { display: "Avril", value: 4 },
  { display: "Mai", value: 5 },
  { display: "Juin", value: 6 },
  { display: "Juillet", value: 7 },
  { display: "Août", value: 8 },
  { display: "Septembre", value: 9 },
  { display: "Octobre", value: 10 },
  { display: "Nouvembre", value: 11 },
  { display: "Decembre", value: 12 },
];
