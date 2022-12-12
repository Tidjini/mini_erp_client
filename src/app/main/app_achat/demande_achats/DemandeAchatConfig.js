import React from "react";
import { authRoles } from "app/auth";
export const DemandeAchatConfig = {
  settings: {
    layout: {
      config: {},
    },
  },

  auth: authRoles.staff,
  routes: [
    {
      path: "/demande_achat/:demandeId",
      component: React.lazy(() => import("./DemandeAchat")),
    },
    {
      path: "/demande_achat_collection/",
      component: React.lazy(() => import("./DemandeAchatCollectionView")),
    },
  ],
};

export const defaultData = {
  id: "",
  date_demande: "",
  numero_bon: "",
  label: "",
  remarque: "",
  employe_nom_complet: "",
  service_name: "",
  entreprise_name: "",
  articles: [],
  articles_to_delete: [],
  statue: 1,
  urgence: 1,
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
];

export const collectionColumns = [
  {
    id: "statue",
    align: "left",
    disablePadding: false,
    label: "Statue",
    sort: true,
  },
  {
    id: "urgence",
    align: "left",
    disablePadding: false,
    label: "Urgence",
    sort: true,
  },
  {
    id: "label",
    align: "left",
    disablePadding: true,
    label: "label",
    sort: true,
  },
  {
    id: "numero",
    align: "center",
    disablePadding: true,
    label: "Numero",
    sort: true,
  },
  {
    id: "date_demande",
    align: "left",
    disablePadding: false,
    label: "Date",
    sort: true,
  },
  {
    id: "employe",
    align: "left",
    disablePadding: false,
    label: "Employé",
    sort: true,
  },
  // {
  //   id: "entreprise",
  //   align: "center",
  //   disablePadding: false,
  //   label: "Entreprise",
  //   sort: true,
  // },
  {
    id: "service",
    align: "center",
    disablePadding: false,
    label: "Destination",
    sort: true,
  },

  {
    id: "numero_devis",
    align: "left",
    disablePadding: false,
    label: "N° Proforma",
    sort: true,
  },
];

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
