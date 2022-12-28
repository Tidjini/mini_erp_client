import React from "react";
import PieSocket from "piesocket-js";
import { useSelector } from "react-redux";

export default function usePieSocket() {
  const [task, setTask] = React.useState();
  const user = useSelector(({ auth }) => auth.user.data);

  // const []
  React.useEffect(() => {
    if (!Boolean(user)) return;
    const { is_admin, is_stuff, token } = user;

    const pieSocket = new PieSocket({
      clusterId: process.env.REACT_APP_PIESOCKET_CLUSTER_ID,
      apiKey: process.env.REACT_APP_PIESOCKET_API_KEY,
      notifySelf: true,
    });
    pieSocket.subscribe("tasks").then((channel) => {
      channel.listen(token, (data, meta) => {
        const { id, label, description } = data;
        setTask({
          id,
          label,
          description,
        });
      });
    });
    if (is_admin || is_stuff) {
      pieSocket.subscribe("admin").then((channel) => {
        console.log("Channel is ready");
      });
    }

    return () => {
      pieSocket.unsubscribe("tasks");

      if (is_admin || is_stuff) {
        pieSocket.unsubscribe("admin");
      }
    };
  }, [user]);

  return { task };
}
