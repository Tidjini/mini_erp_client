import React from "react";
import { authRoles } from "app/auth";

export const EntreSortieConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/entres-sorties/",
      component: React.lazy(() => import("./EntreSortieCollection")),
    },
    {
      path: "/entre-sortie/:entre_sortie_id",
      component: React.lazy(() => import("./EntreSortieView")),
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
    id: "type",
    label: "Type",
  },
  {
    id: "observation",
    label: "observation",
  },
];

export const defaultItem = {
  id: "",
  produit_object: null,
  nbr_piece: 0.0,
  nbr_palette: 0.0,
  date: "",
  type: "SORTIE",
  auto: false,
  observation: "ENTREE/SORTIE",
  produit: "",
};
