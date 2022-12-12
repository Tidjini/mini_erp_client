import React from "react";

export const GestionResourceHumaineConfig = {
  routes: [
    {
      path: "/employe-list/",
      component: React.lazy(() => import("./EmployeCollection")),
    },
    {
      path: "/car/",
      component: React.lazy(() => import("./Car")),
    },
    {
      path: "/employe-view/:employeId",
      component: React.lazy(() => import("./EmployeView")),
    },
    {
      path: "/statue-list/",
      component: React.lazy(() => import("./StatueCollection")),
    },

    {
      path: "/service-list/",
      component: React.lazy(() => import("./ServiceCollection")),
    },
    {
      path: "/poste-list/",
      component: React.lazy(() => import("./PosteCollection")),
    },
  ],
};

export const collectionCells = [
  {
    id: "nom",
    label: "Nom",
  },
  {
    id: "prenom",
    label: "Prénom",
  },
  {
    id: "poste",
    label: "Poste",
  },
  {
    id: "service",
    label: "Service",
  },
  {
    id: "statue",
    label: "Statue.",
  },
  {
    id: "superviseur",
    label: "Superviseur.",
  },
];
export const statueCells = [
  {
    id: "statue",
    label: "Statue",
  },
  {
    id: "Active",
    label: "active",
  },
];

export const serviceCells = [{ id: "service", label: "Service" }];
export const posteCells = [
  { id: "poste", label: "poste" },
  { id: "mission", label: "mission" },
  { id: "taches", label: "taches" },
  { id: "competences", label: "competences" },
  { id: "type", label: "type" },
];

export const defaultEmploye = {
  id: "",
  service_nom: null,
  superviseur_nom: null,
  statue_item: null,
  type: null,
  nom: "",
  prenom: "",
  telephone: "",
  photo: null,
  longitude: 0.0,
  latitude: 0.0,
  offline: true,
  offline_gps: true,
  service: null,
  superviseur: null,
  statue: null,
  poste: null,
};
