import React from "react";
import { authRoles } from "app/auth";

export const ArretConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/production-arrets/",
      component: React.lazy(() => import("./ArretCollection")),
    },
    {
      path: "/production-arret/:arretId",
      component: React.lazy(() => import("./ArretView")),
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
      arret: undefined,
    });
  }

  return a;
};

export const collectionCells = [
  {
    id: "date",
    label: "Date",
  },
  {
    id: "poste",
    label: "Poste",
  },

  {
    id: "arret",
    label: "Arrêt",
  },
  {
    id: "duree_minute",
    label: "Durrée",
  },
  {
    id: "zone",
    label: "Zone",
  },
  {
    id: "type_arret",
    label: "Type",
  },
  {
    id: "equipement",
    label: "Equipement",
  },

  {
    id: "description",
    label: "description",
  },
  {
    id: "intervenant",
    label: "Intervenant",
  },
];

export const defaultItem = {
  id: "",
  intervenant_object: undefined,
  description: "",
  zone: "",
  type_arret: "PRODUCTION",
  equipement: "",
  duree_minute: 0,
  poste: "",
  date: "",
  heure_debut: "08:00",
  heure_fin: "08:05",
  intervenant: "",
  type_intervention: "Nettoyage",
};
