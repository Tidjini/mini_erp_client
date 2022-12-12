import React from "react";
import { authRoles } from "app/auth";
import CommandeStatut from "app/composants/custom/CommandeStatut";

export const CommandeAchatConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: "/commande_achat/:commandeId",
      component: React.lazy(() => import("./CommandeAchatView")),
    },
    {
      path: "/commande_achat_collection/",
      component: React.lazy(() => import("./CommandeAchatCollection")),
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
  id: null,
  fournisseur_object: null,
  articles: [],
  attachements: [],
  attachements_deleted: [],
  numero: "",
  numero_commande: "",
  label: "",
  date_commande: null,
  remarque: null,
  statut: "",
  applique_tva: false,
  modalite_reglement: "A TÉRME",
  modalite_paiement: "Chèque",
  commercial: null,
  total: 0.0,
  remise: 0.0,
  total_remise: 0.0,
  total_tva: 0.0,
  timbre: 0.0,
  autre_frais: 0.0,
  total_ttc: 0.0,
  employe_responsable: null,
  user_creation: null,
  user_modification: null,
  employe: null,
  demande_achat: null,
  devis_achat: null,
  fournisseur: null,
  devis_achat_numero: "",
};

export const cells = [
  {
    id: "statut",
    label: "Statue",
  },
  {
    id: "numero",
    label: "N° System",
  },
  {
    id: "numero_commande",
    label: "N° Commande",
  },
  {
    id: "label",
    label: "Libellé",
  },
  {
    id: "date_devis",
    label: "Date",
  },
  {
    id: "fournisseur",
    label: "Fournisseur",
  },
  {
    id: "numero_devis",
    label: "N° Devis",
  },
  {
    id: "modalite_reglement",
    label: "Reglement",
  },

  {
    id: "modalite_paiement",
    label: "Paiement",
  },
  {
    id: "total_ttc",
    label: "Total TTc",
  },
  {
    id: "action",
    label: "Edition",
  },
];

export const styles = {
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

export const viewTableHeader = [
  {
    id: "article_name",
    align: "left",
    disablePadding: false,
    label: "Article",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
      textDecoration: "underline",
    },
  },
  {
    id: "qte",
    align: "left",
    disablePadding: false,
    label: "Quantité",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
    },
  },
  {
    id: "unite",
    align: "left",
    disablePadding: false,
    label: "Unité",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
    },
  },
  {
    id: "prix_unite",
    align: "left",
    disablePadding: false,
    label: "Prix Unitaire",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
    },
    type: "montant",
  },
  {
    id: "total",
    align: "left",
    disablePadding: false,
    label: "Montant",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
    },
    type: "montant",
  },
  {
    id: "total_tva",
    align: "left",
    disablePadding: false,
    label: "Montant TVA",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
    },
    type: "montant",
  },
  {
    id: "total_ttc",
    align: "left",
    disablePadding: false,
    label: "Montant TTC",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px",
      background: "#e8e8e8",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
    },
    type: "montant",
  },
];

export const viewColumns = [
  {
    id: "article_name",
    align: "left",
    disablePadding: false,
    label: "Article",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
      textDecoration: "underline",
    },
  },
  {
    id: "qte",
    align: "left",
    disablePadding: false,
    label: "Quantité",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
    },
  },
  {
    id: "unite",
    align: "left",
    disablePadding: false,
    label: "Unité",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
    },
  },
  {
    id: "prix_unite",
    align: "left",
    disablePadding: false,
    label: "Prix Unitaire",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
    },
    type: "montant",
  },
  {
    id: "total",
    align: "left",
    disablePadding: false,
    label: "Montant",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
    },
    type: "montant",
  },
  {
    id: "total_tva",
    align: "left",
    disablePadding: false,
    label: "Montant TVA",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
    },
    type: "montant",
  },
  {
    id: "total_ttc",
    align: "left",
    disablePadding: false,
    label: "Montant TTC",
    sort: true,
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px",
    },
    contentStyle: {
      fontWeight: "bold",
      color: "#474747",
    },
    type: "montant",
  },
];
