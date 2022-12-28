import PieSocket from "piesocket-js";
import React from "react";

export default function usePieSocket() {
  // const []
  React.useEffect(() => {
    const pieSocket = new PieSocket({
      clusterId: process.env.REACT_APP_PIESOCKET_CLUSTER_ID,
      apiKey: process.env.REACT_APP_PIESOCKET_API_KEY,
      notifySelf: true,
    });
    pieSocket.subscribe("chat-room").then((channel) => {
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
