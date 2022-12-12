import React from "react";
import { authRoles } from "app/auth";

export const ProduitConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/production-produits/",
      component: React.lazy(() => import("./ProduitCollection")),
    },
    {
      path: "/production-produit/:produitId",
      component: React.lazy(() => import("./ProduitView")),
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

export const produitsCells = [
  {
    id: "designation",
    label: "Designation",
  },
  {
    id: "symbole",
    label: "Symbole",
  },
  {
    id: "p_wagon",
    label: "Pieces/Wagon",
  },
  {
    id: "p_pt_prod",
    label: "Pieces/Pt Production",
  },
  {
    id: "p_pt_emnballage",
    label: "Pieces/Pt Emballage",
  },
  {
    id: "qte_stock",
    label: "Qté (Pieces)",
  },
  {
    id: "qte_stock_vrac",
    label: "Qté (Production)",
  },
  {
    id: "qte_stock_pt",
    label: "Qté (Emballage)",
  },

  {
    id: "poids",
    label: "Poids.",
  },
];

export const defaultProduit = {
  id: "",
  designation: "",
  symbole: "",
  qte_initial: 0.0,
  qte_stock: 0.0,
  poids: 0.0,
  nbr_piece_wagon: 1,
  nbr_piece_palette_production: 1,
  nbr_piece_palette_emballage: 1,
};
