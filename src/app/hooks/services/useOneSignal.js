import React from "react";
import OneSignal from "react-onesignal";

export default function useOneSignal() {
  const [intialized, setIntialized] = React.useState(false);
  React.useEffect(() => {
    async function initializeApp() {
      await OneSignal.init({
        appId: process.env.REACT_APP_ONESIGNAL_API_ID,
        allowLocalhostAsSecureOrigin: true,
      });
      setIntialized(true);
      OneSignal.showSlidedownPrompt();
    }

    initializeApp();

    return () => {
      //todo
      console.log("todo some cleanup");
    };
  }, []);
}
