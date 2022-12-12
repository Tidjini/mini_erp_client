import React from "react";
import { authRoles } from "app/auth";

export const EcritureConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,

  routes: [
    {
      path: "/saisie_ecriture/:num_mouvement",
      component: React.lazy(() => import("./Ecriture")),
    },
  ],
};

export const ecriture_default = {
  id: "",
  num_ligne: 0,
  num_mouvement: 0,
  num_piece: "",
  date: "",
  date_echeance: "",
  compte: "",
  journal: "",
  tier: "",
  libelle: "",
  reference: "",

  debit: 0.0,
  credit: 0.0,

  appliquer_rapprochement: false,
  rapproche: false,
  lettre_rapprochement: "LDR",
  statut: "BROUILLARD",

  third: {
    code: "",
    raison_social: "",
  },
  daily: {
    code: "",
    intitule: "",
  },
  account: {
    num_compte: "",
    intitule: "",
    appliquer_rapprochement: false,
    tier: false,
  },
};
