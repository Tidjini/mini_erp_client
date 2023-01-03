import React from "react";
import { authRoles } from "app/auth";

const collectionPath = "/profiles/";
export const ProfileConfig = {
  auth: authRoles.user,

  routes: [
    {
      path: collectionPath,
      component: React.lazy(() => import("./ProfileCollectionView")),
    },
  ],
  navigation: {
    id: "profiles_app",
    title: "Gestion des Profile",
    type: "group",
    children: [
      {
        id: "profile",
        title: "Profile Collection",
        icon: "assignment_turned_in",
        type: "item",
        url: collectionPath,
      },
    ],
  },
};
