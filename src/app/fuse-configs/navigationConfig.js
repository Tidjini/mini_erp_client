import { TaskConfig } from "app/tasks/Config";
import { ProfileConfig } from "app/profile/Config";

const { navigation: tasks } = TaskConfig;
const { navigation: profiles } = ProfileConfig;

const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    type: "group",
    icon: "apps",
    children: [tasks, profiles],
  },
];

export default navigationConfig;
