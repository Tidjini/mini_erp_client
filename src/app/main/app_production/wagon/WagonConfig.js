import React from "react";
import { authRoles } from "app/auth";

export const WagonConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/production-wagons/",
      component: React.lazy(() => import("./WagonCollection")),
    },
    {
      path: "/production-wagon/:wagonId",
      component: React.lazy(() => import("./WagonView")),
    },
  ],
};

export const attente = () => {
  const a = [];
  for (let i = 1; i <= 120; i++) {
    a.push({
      numero: i,
      operation: "attente",
      selected: false,
      qte: 0,
      produit: undefined,
    });
  }

  return a;
};

export const collectionCells = [
  {
    id: "numero",
    label: "Numéro",
  },
  {
    id: "operation_actuel",
    label: "Phase Production",
  },
  {
    id: "produit",
    label: "Produits",
  },
  {
    id: "nbr_piece_wagon_actuel",
    label: "Pieces Actual",
  },
];

export const defaultItem = {
  numero: "",
  produit_designation: "",
  produit_simulation_designation: "",
  numero_int: 1,
  phase_actuel: "ATTENTE",
  phase_simulation: "ATTENTE",
  nbr_piece_wagon_actuel: 0,
  plein: false,
  produit: "",
  produit_simulation: "",
};
