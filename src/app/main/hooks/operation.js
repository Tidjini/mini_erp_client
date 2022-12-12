import { useState, useEffect } from "react";

//const [width, height] = useWindowSize();
const INSCRIPTION = 1;
const TARE_INITIAL = 2;
const SORTIE_DEPOT = 3;
const ARRIVE_PORT = 4;
const TARE_PORT = 5;
const CHARGEMENT = 6;
const PESEE_PORT = 7;
const SORTIE_PORT = 8;
const ARRIVE_DEPOT = 9;
const PESEE_DEPOT = 10;
const DECHARGMENT = 11;
const FIN = 12;
export function useOperationAction(old) {
  const [action, setAction] = useState({
    label: "inscription",
    color: "#264653",
    statue: 1,
  });
  useEffect(() => {
    let statue = old + 1;
    if (statue < 1) statue = 1;
    if (statue > 12) statue = 12;
    switch (statue) {
      case INSCRIPTION:
        setAction({
          color: "#14213d",
          label: "INSCRIPTION",
          statue: INSCRIPTION,
        });
        break;
      case TARE_INITIAL:
        setAction({
          color: "#2b2d42",
          label: "TARE INITIAL",
          statue: TARE_INITIAL,
        });
        break;
      case SORTIE_DEPOT:
        setAction({
          color: "#1e6091",
          backgroundColor: "#1e609120",
          label: "SORTIE Dépot",
          statue: SORTIE_DEPOT,
        });
        break;

      case ARRIVE_PORT:
        setAction({
          color: "#ffb703",
          backgroundColor: "#335c6720",
          label: "ARRIVée port",
          statue: ARRIVE_PORT,
        });
        break;
      case TARE_PORT:
        setAction({
          color: "#335c67",
          backgroundColor: "#335c6720",
          label: "ARRIVée port",
          statue: TARE_PORT,
        });
        break;

      case CHARGEMENT:
        setAction({
          color: "#006d77",
          backgroundColor: "#006d7720",
          label: "chargement",
          statue: CHARGEMENT,
        });
        break;

      case PESEE_PORT:
        setAction({
          color: "#f77f00",
          backgroundColor: "#f77f0020",
          label: "pesée port",
          statue: PESEE_PORT,
        });
        break;

      case SORTIE_PORT:
        setAction({
          color: "#fca311",
          backgroundColor: "#fca31120",
          label: "sortie port",
          statue: SORTIE_PORT,
        });
        break;

      case ARRIVE_DEPOT:
        setAction({
          color: "#00afb9",
          backgroundColor: "#00afb920",
          label: "arrivée depot",
          statue: ARRIVE_DEPOT,
        });
        break;
      case PESEE_DEPOT:
        setAction({
          color: "#00afb9",
          backgroundColor: "#00afb920",
          label: "pesée depot",
        });
        break;

      case DECHARGMENT:
        setAction({
          color: "#118ab2",
          backgroundColor: "#118ab220",
          label: "déchargement",
          statue: DECHARGMENT,
        });
        break;

      case FIN:
        setAction({
          color: "#22223b",
          backgroundColor: "#8ac926",
          label: "términé",
          statue: FIN,
        });
        break;
      default:
        setAction({
          color: "#14213d",
          backgroundColor: "#14213d20",
          label: "INSCRIPTION",
          statue: INSCRIPTION,
        });
        break;
    }
  }, [old]);
  return action;
}
