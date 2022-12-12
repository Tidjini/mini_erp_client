import React from "react";
import { authRoles } from "app/auth";

export const ConmptaConfigurationConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,

  routes: [
    {
      path: "/compta_configuration/",
      component: React.lazy(() => import("./Configuration")),
    },
  ],
};

export const configurationStyles = {
  container: { padding: 32 },
  title: { fontSize: 32, fontWeight: "bold" },
  titleSpan: { fontWeight: "400" },
  description: { fontSize: 16, color: "#8D8F9D", fontWeight: "600" },
  icon: {
    width: 72,
    height: 72,
  },
  icon_container: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  info_item: {
    marginTop: 32,
    display: "flex",
    alignItems: "center",
  },
  info_item_icon: {
    width: 48,
    height: 48,
    marginRight: 16,
    borderRadius: 24,
    padding: 10,
    backgroundColor: "#E9EEFE",
  },
  info_item_text: {
    fontSize: 12,
    color: "#818190",
    fontWeight: "400",
  },
  info_item_title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    height: 1.5,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#D1DBE8",
    marginTop: 32,
  },
  item: {
    marginTop: 32,
    padding: 20,
    alignItems: "center",
    boxShadow: "1px 3px 3px #9E9E9E20",
    borderRadius: 20,
  },
  item_title: {
    fontSize: 24,
    fontWeight: "600",
  },
  item_description: { fontSize: 16, color: "#8D8F9D", fontWeight: "600" },
  item_icon: {
    width: 48,
    height: 48,
  },
  item_main: {
    margin: "15px 0",
    fontSize: 32,
    fontWeight: "600",
  },
  item_second: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8D8F9D",
  },
  item_button: {
    boxShadow: "none",
    color: "#EFF1FF",
    textTransform: "none",
    margin: "40px 0 10px 0",
    height: 32,
    width: "100%",
  },
};
