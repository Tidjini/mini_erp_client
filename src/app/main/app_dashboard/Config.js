import React from "react";
// import { authRoles } from "app/auth";

export const AppDashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  //   auth: authRoles.staff,
  routes: [
    {
      path: "/app_dashboard/",
      component: React.lazy(() => import("./Dashboard")),
    },
  ],
};

const demandeStyle = {
  container: {
    width: "100%",
    backgroundColor: "#3d405b",
    color: "white",
    margin: 10,
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 15,
  },
};

export const chartOprtions = {
  spanGaps: false,
  legend: {
    display: false,
  },
  maintainAspectRatio: false,
  layout: {},
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
};
