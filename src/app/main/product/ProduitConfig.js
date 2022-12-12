/**
 * Lazy load Example
 */

import React from "react";

export const ProduitConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/produit-collection",
      component: React.lazy(() => import("./ProduitCollectionView"))
    },
    {
      path: "/produit-view",
      component: React.lazy(() => import("./ProduitView"))
    }
  ]
};
