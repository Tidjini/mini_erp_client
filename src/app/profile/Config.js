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
export const profileCell = [
  { label: "", id: "photo" },
  { ordering: true, label: "Nom Complet", id: "name" },
  { label: "Statue", id: "statue" },
  { ordering: true, label: "Distance", id: "distance" },
  { ordering: true, label: "Duration", id: "duration" },
  { ordering: true, label: "Tâches", id: "tasks" },
];
