import React from "react";
import { authRoles } from "app/auth";

const collectionPath = "/tasks/";
export const TaskConfig = {
  auth: authRoles.user,

  routes: [
    {
      path: collectionPath,
      component: React.lazy(() => import("./TaskCollectionView")),
    },
    {
      path: "/task/:id",
      component: React.lazy(() => import("./TaskView")),
    },
  ],
  navigation: {
    id: "tasks",
    title: "Gestion Des Tâches",
    type: "group",
    children: [
      {
        id: "taches",
        title: "Tâches Collection",
        icon: "assignment_turned_in",
        type: "item",
        url: collectionPath,
      },
    ],
  },
};

export const cells = [
  { ordering: true, label: "Statue", id: "statue_label" },
  { label: "Intitule", id: "label", style: { minWidth: 100 } },
  {
    label: "Description",
    id: "description",
    component: "th",
    scope: "row",
    style: { minWidth: 200 },
  },
  { ordering: true, label: "Responsable", id: "creator_name" },
  { ordering: true, label: "Affectation", id: "receiver_name" },
  { ordering: true, label: "Created", id: "created_date" },
  { label: "Categorie", id: "closed", align: "right" },
];

export const defaultItem = {
  id: 0,
  documents: [],
  caption: "",
  statue_label: "",
  closed: false,
  created_date: "",
  created_time: "",
  receiver_name: "",
  creator_name: "",
  has_location: false,
  statue: "i",
  label: "",
  forecolor: "#27187E",
  backcolor: "#E9C46A",
  description: "",
  created_at: "",
  finished_at: null,
  creator: 0,
  receiver: 0,
};

export const statues = [
  { display: "Instance", value: "i" },
  { display: "accepted", value: "a" },
  { display: "in progress", value: "p" },
  { display: "terminated", value: "t" },
  { display: "canceled", value: "c" },
];

export const taskLocation = {
  task: null,
  origin_address: "",
  origin_lng: 0.0,
  origin_lat: 0.0,
  destination_address: "",
  destination_lng: 0.0,
  destination_lat: 0.0,
};
