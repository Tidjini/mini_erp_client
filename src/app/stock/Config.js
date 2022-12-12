import React from "react";
export const StockConfig = {
  //   todo later auth: authRoles.staff,
  routes: [
    {
      path: "/categories/:category_id",
      component: React.lazy(() => import("./CategoryView")),
    },
    {
      path: "/categories/",
      component: React.lazy(() => import("./CategoryCollection")),
    },
  ],
};
