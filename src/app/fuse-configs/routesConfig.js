import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse";

import { LoginConfig } from "app/main/Login/LoginConfig";

import { TaskConfig } from "app/tasks/Config";
import { ProfileConfig } from "app/profile/Config";

const routeConfigs = [LoginConfig, TaskConfig, ProfileConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    component: () => <Redirect to="/tasks/" />,
  },
];

export default routes;
