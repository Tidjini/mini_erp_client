import React from "react";
import PieSocket from "piesocket-js";
import { useSelector } from "react-redux";

export default function usePieSocket() {
  const { is_admin, is_stuff, token } = useSelector(
    ({ auth }) => auth.user.data
  );

  // const []
  React.useEffect(() => {
    const pieSocket = new PieSocket({
      clusterId: process.env.REACT_APP_PIESOCKET_CLUSTER_ID,
      apiKey: process.env.REACT_APP_PIESOCKET_API_KEY,
      notifySelf: true,
    });

    if (user.)
      pieSocket.subscribe(token).then((channel) => {
        console.log("Channel is ready");
        channel.listen("a", (data, meta) => {
          console.log("New message: ", data);
        });

        channel.publish("a", {
          from: "Anand",
          message: "Hello PieSocket!",
        });
      });
  }, []);
}
