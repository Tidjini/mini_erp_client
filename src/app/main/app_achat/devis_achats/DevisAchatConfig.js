import React from "react";
import { authRoles } from "app/auth";

export const DevisAchatConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/devis_achat/:devisId",
      component: React.lazy(() => import("./DevisAchatView")),
    },
    {
      path: "/devis_achat_collection/",
      component: React.lazy(() => import("./DevisAchatCollectionView")),
    },
  ],
};

export const columns = [
  {
    id: "designation",
    align: "left",
    disablePadding: false,
    label: "Article",
    sort: true,
  },
  {
    id: "qte",
    align: "right",
    disablePadding: false,
    label: "Qté",
    sort: true,
  },
  {
    id: "unite",
    align: "left",
    disablePadding: false,
    label: "Unite",
    sort: true,
  },
  {
    id: "prix_unite",
    align: "right",
    disablePadding: false,
    label: "Prix",
    sort: true,
  },
  {
    id: "total",
    align: "right",
    disablePadding: false,
    label: "Total",
    sort: true,
  },
];

export const defaultData = {
  id: "",
  date_devis: "",
  numero: "",
  label: "",
  statue: 1,
  demande_achat: "",
  remarque: "",
  devis_parent: "",
  numero_devis: "",
  modalite_reglement: "",
  modalite_paiement: "",
  date_validation: "",
  commercial: "",
  fournisseur: "",
  employe_responsable: "",
  articles: [],
  articles_to_delete: [],
  devis_copies: [],
  attachments: [],
  copies: 0,

  total: 0.0,
  remise: 0.0,
  total_remise: 0.0,
  total_tva: 0.0,
  timbre: 0.0,
  autre_frais: 0.0,
  total_ttc: 0.0,
};

export const collectionColumns = [
  {
    id: "statue",
    align: "left",
    disablePadding: false,
    label: "Statue",
    sort: true,
  },
  {
    id: "date_validation",
    align: "left",
    disablePadding: false,
    label: "Date Validation",
    sort: true,
  },
  // {
  //   id: "label",
  //   align: "left",
  //   disablePadding: false,
  //   label: "Label",
  //   sort: true,
  // },
  {
    id: "numero",
    align: "center",
    disablePadding: true,
    label: "N° System",
    sort: true,
  },
  {
    id: "date_devis",
    align: "left",
    disablePadding: false,
    label: "Date",
    sort: true,
  },
  {
    id: "fournisseur",
    align: "left",
    disablePadding: false,
    label: "Fournisseur",
    sort: true,
  },
  {
    id: "numero_devis",
    align: "left",
    disablePadding: false,
    label: "Numéro",
    sort: true,
  },
  {
    id: "modalite_reglement",
    align: "left",
    disablePadding: false,
    label: "Reglement",
    sort: true,
  },

  {
    id: "modalite_paiement",
    align: "left",
    disablePadding: false,
    label: "Paiement",
    sort: true,
  },

  {
    id: "total_ttc",
    align: "right",
    disablePadding: false,
    label: "Total TTc",
    sort: true,
  },
];
