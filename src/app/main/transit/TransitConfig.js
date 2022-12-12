import React from "react";
import { authRoles } from "app/auth";

export const TransitConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: authRoles.staff,
  routes: [
    {
      path: "/bitume-operation-collection/",
      component: React.lazy(() => import("./BitumeOperationCollection")),
    },
    {
      path: "/bitume-operation/:operationId",
      component: React.lazy(() => import("./BitumeOperationView")),
    },
  ],
};

export const cells = [
  {
    id: "rotation",
    align: "left",
    disablePadding: false,
    label: "N° Rotation",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#474747",
    },
  },
  {
    id: "navire",
    align: "left",
    disablePadding: true,
    label: "Navire",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#474747",
      textDecoration: "underline",
    },
  },
  {
    id: "gros",
    align: "center",
    disablePadding: true,
    label: "N° Gros",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#474747",
      textDecoration: "underline",
    },
  },
  {
    id: "qte",
    align: "left",
    disablePadding: false,
    label: "Qté Effective",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#474747",
    },
  },
  {
    id: "periode",
    align: "left",
    disablePadding: false,
    label: "Periode",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#474747",
    },
  },
  {
    id: "statue",
    align: "left",
    disablePadding: false,
    label: "Statue",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#474747",
    },
  },
];

export const collectionStyles = {
  container: {
    padding: "10px 32px",
    display: "flex",
    flexDirection: "row",
    minHeight: "100%",
    position: "relative",
    flex: "1 1 auto",
    height: "100%",
  },
  container_l1: {
    display: "flex",
    flexDirection: "column",
    padding: "0 1.2rem",
    flex: "1 1 100%",
    zIndex: 2,
    maxWidth: "100%",
    minWidth: 0,
    minHeight: 0,
  },
  table_container: {
    display: "flex",
    flex: "1 1 100%",
    flexDirection: "column",
    minHeight: 0,
    borderRadius: "8px 8px 0 0",
    marginTop: 10,
    marginBottom: 10,
  },
  loading_container: {
    display: "flex",
    backgroundColor: "#26465330",
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifycontent: "center",
    zIndex: 500,
  },
  header: { padding: "10px 0 20px 0" },
  titleContainer: { display: "flex", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  titleSpan: { fontWeight: "400" },
  description: { fontSize: 12, color: "#8D8F9D", fontWeight: "600" },
  icon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },

  divider: {
    height: 0.8,
    width: "100%",
    marginBottom: 20,
  },
};

export const viewStyles = {
  container: { padding: "10px 32px", backgroundColor: "#f3f3f3" },
  box: { padding: "10px", backgroundColor: "white", borderRadius: 5 },
  boxContainer: {
    padding: "10px 10px 0 0",
    display: "flex",
    alignItems: "start",
  },
  icon: {
    width: 36,
    height: 36,
  },
  header: {
    alignItems: "center",
    justifycontent: "space-between",
    backgroundColor: "#023047",
    borderRadius: 5,
    padding: 10,
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
  },
  title: { fontSize: 14, fontWeight: "bold", margin: "0 10px", color: "white" },
  titleSpan: { fontWeight: "400" },
  button: {
    marginLeft: 20,
    boxShadow: "none",
    backgroundColor: "#2a9d8f",
    color: "#EFF1FF",
    height: 32,
    fontSize: 12,
  },
  input: {
    paddingTop: 10,
  },
  selector: {
    paddingTop: 10,
    paddingLeft: 5,
  },
  divider: {
    height: 0.8,
    width: "100%",
    margin: "20px 0",
  },
};

export const defaultData = {
  id: 0,
  numero: "nouveau",
  navire: "",
  gros: "",
  qte: 0, //KG
  qte_theorique: 0, //KG
  qte_diff: 0, //KG
  debut: "",
  fin: "",
  cloture: false,
  nbr_chauffeur: 0,
  nbr_heure: 0,
  details: [],
};

export const detailCells = [
  {
    id: "numero",
    label: "Numéro",
  },
  {
    id: "chauffeur",
    label: "Chauffeur",
  },
  {
    id: "camion",
    label: "Camion",
  },

  {
    id: "tare_int",
    label: "Tare Init.",
  },
  {
    id: "tare_ext",
    label: "Tare PORT.",
  },
  {
    id: "brut_ext",
    label: "Brute PORT.",
  },
  {
    id: "brut_int",
    label: "Brute Infra.",
  },
  {
    id: "tare_finale",
    label: "Tare Infra.",
  },
  {
    id: "net_depot",
    label: "Net Infra.",
  },
  {
    id: "statue",
    label: "Statue.",
  },
];
