import React from "react";
import { authRoles } from "app/auth";

export const CasseConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/casses/",
      component: React.lazy(() => import("./CasseCollection")),
    },
    {
      path: "/casse/:casse_id",
      component: React.lazy(() => import("./CasseView")),
    },
  ],
};

export const collectionCells = [
  {
    id: "date",
    label: "Date",
  },
  {
    id: "produit",
    label: "Produit",
  },

  {
    id: "palette",
    label: "Palletes",
  },
  {
    id: "pieces",
    label: "pieces",
  },
  {
    id: "poste",
    label: "poste",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "phase",
    label: "Phase",
  },
];

export const defaultItem = {
  id: "",
  produit: "",
  equipe: "",
  responsable: "",
  poste: "",
  type: "EXTERIEUR",
  date: "",
  nbr_piece: 0.0,
  nbr_palette: 0.0,
  produit_object: null,
  responsable_object: null,
};
