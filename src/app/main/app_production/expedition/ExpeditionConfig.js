import React from "react";
import { authRoles } from "app/auth";

export const ExpeditionConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/expeditions/",
      component: React.lazy(() => import("./ExpeditionCollection")),
    },
    {
      path: "/expedition/:expedition_id",
      component: React.lazy(() => import("./ExpeditionView")),
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
];

export const defaultItem = {
  id: "",
  produit: null,
  equipe: "",
  responsable: "",
  poste: "",
  date: "",
  nbr_piece: 0.0,
  nbr_palette: 0.0,
  produit_object: null,
  responsable_object: null,
};
