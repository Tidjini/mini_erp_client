import React from "react";
import { authRoles } from "app/auth";

export const ArticleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/articles/",
      component: React.lazy(() => import("./ArticleCollectionView")),
    },
    // {
    //   path: "/article/:article_id",
    //   component: React.lazy(() => import("./ArticleView")),
    // },
  ],
};

export const collectionCells = [
  {
    id: "reference",
    label: "Reference",
  },
  {
    id: "designation",
    label: "Designation",
  },

  {
    id: "unite",
    label: "Unite",
  },
  {
    id: "dernier_achat",
    label: "Dernier Achat",
  },
  {
    id: "alert_achat",
    label: "Achat Alert",
  },
  {
    id: "tolere_achat",
    label: "Pourcentage toléré",
  },
  {
    id: "prix_max",
    label: "Prix Max",
  },
];

export const defaultItem = {
  id: "",
  dernier_achat: "",
  alert_achat: false,
  prix_achat_max: 0.0,
  reference: "",
  tolere_achat: "5",
  achat_period: 30,
  designation: "",
  unite: "unite",
};
