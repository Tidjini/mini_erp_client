import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse";

import { LoginConfig } from "app/main/Login/LoginConfig";

import { TaskConfig } from "app/tasks/Config";

const routeConfigs = [LoginConfig, TaskConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    component: () => <Redirect to="/tasks/" />,
  },
];

export default routes;
