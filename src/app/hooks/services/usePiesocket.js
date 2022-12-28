import PieSocket from "piesocket-js";
import React from "react";

export default function usePieSocket() {
  // const []
  React.useEffect(() => {
    const pieSocket = new PieSocket({
      clusterId: "s8153.nyc1",
      apiKey: "Y42tEqSEf35expzZEpyjnBOycrk2MWK5RBrcjjZD",
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
