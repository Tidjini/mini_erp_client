import PhaseOpration from "./PhaseOpration";

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
  title: { fontSize: 16, fontWeight: "bold" },
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

export const cells = [
  {
    id: "numero",
    align: "center",
    disablePadding: true,
    label: "N° Wagon",
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
    id: "operation",
    align: "center",
    disablePadding: true,
    label: "Phase Production",
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
    id: "produit",
    align: "center",
    disablePadding: true,
    label: "Produit",
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
      textDecoration: "underline",
    },
  },
  // {
  //   id: "nbr_piece_wagon_actuel",
  //   align: "center",
  //   disablePadding: true,
  //   label: "Pieces (Total)",
  //   sort: true,
  //   cellStyle: {
  //     border: "1px solid #9E9E9E60",
  //     borderWidth: "1px",
  //     background: "#e8e8e8",
  //   },
  //   contentStyle: {
  //     fontSize: 12,
  //     fontWeight: "bold",
  //     color: "#474747",
  //     textDecoration: "underline",
  //   },
  // },
];

export const cols = [
  {
    id: "numero",
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
    },
    contentStyle: {
      fontWeight: "bold",
      fontSize: 12,
    },
  },
  {
    id: "phase_actuel",
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 0 1px 1px",
    },
    composant: PhaseOpration,
  },
  {
    id: "produit_object",
    cellStyle: {
      border: "1px solid #9E9E9E60",
      borderWidth: "1px 1px 1px 1px",
    },
    contentStyle: {
      fontWeight: "bold",
      fontSize: 12,
    },
  },
];
