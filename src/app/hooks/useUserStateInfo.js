import React from "react";

export default function useUserStateInfo(statue) {
  const [stateInfo, setStateInfo] = React.useState({
    color: "#414962",
    backgroundColor: "#41496220",
    text: "Non Définie",
  });
  React.useEffect(() => {
    changeStateInfo(statue);
  }, [statue]);

  const changeStateInfo = (state) => {
    switch (statue) {
      case "a":
        setStateInfo({
          color: "#2a9d8f",
          backgroundColor: "#2a9d8f20",
          text: "Active",
        });
        break;
      case "n":
        setStateInfo({
          color: "#e63946",
          backgroundColor: "#e6394620",
          text: "Non Active",
        });
        break;
      case "ab":
        setStateInfo({
          color: "#231942",
          backgroundColor: "#23194220",
          text: "Absent(e)",
        });
        break;

      default:
        setStateInfo({
          color: "#414962",
          backgroundColor: "#41496220",
          text: "Non Définie",
        });
        break;
    }
  };

  return { stateInfo, changeStateInfo };
}

export function useUserStateColor(statue) {
  const [stateInfo, setStateInfo] = React.useState({
    backgroundColor: "#414962",
  });
  React.useEffect(() => {
    changeStateInfo(statue);
  }, [statue]);

  const changeStateInfo = (state) => {
    switch (statue) {
      case "a":
        setStateInfo({
          backgroundColor: "#2a9d8f",
        });
        break;
      case "n":
        setStateInfo({
          backgroundColor: "#e63946",
        });
        break;
      case "ab":
        setStateInfo({
          backgroundColor: "#231942",
        });
        break;

      default:
        setStateInfo({
          backgroundColor: "#414962",
        });
        break;
    }
  };

  return { stateInfo, changeStateInfo };
}
