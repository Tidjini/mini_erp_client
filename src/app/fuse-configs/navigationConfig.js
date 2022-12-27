import { TaskConfig } from "app/tasks/Config";

const { navigation: tasks } = TaskConfig;

const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    type: "group",
    icon: "apps",
    children: [tasks],
  },
];

export default navigationConfig;
