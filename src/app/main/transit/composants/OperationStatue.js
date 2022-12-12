import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

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

export default function OperationStatue(props) {
  const { statue, alert } = props;

  const [style, setStyle] = useState({
    color: "#06d6a0",
    backgroundColor: "#83c5be20",
    label: "INSCRIPTION",
  });

  useEffect(() => {
    switch (statue) {
      case INSCRIPTION:
        setStyle({
          color: "#14213d",
          label: "INSCRIPTION",
          statue: INSCRIPTION,
        });
        break;
      case TARE_INITIAL:
        setStyle({
          color: "#2b2d42",
          label: "TARE INITIAL",
          statue: TARE_INITIAL,
        });
        break;
      case SORTIE_DEPOT:
        setStyle({
          color: "#1e6091",
          backgroundColor: "#1e609120",
          label: "SORTIE Dépot",
          statue: SORTIE_DEPOT,
        });
        break;

      case ARRIVE_PORT:
        setStyle({
          color: "#ffb703",
          backgroundColor: "#335c6720",
          label: "ARRIVée port",
          statue: ARRIVE_PORT,
        });
        break;
      case TARE_PORT:
        setStyle({
          color: "#335c67",
          backgroundColor: "#335c6720",
          label: "ARRIVée port",
          statue: TARE_PORT,
        });
        break;

      case CHARGEMENT:
        setStyle({
          color: "#006d77",
          backgroundColor: "#006d7720",
          label: "chargement",
          statue: CHARGEMENT,
        });
        break;

      case PESEE_PORT:
        setStyle({
          color: "#f77f00",
          backgroundColor: "#f77f0020",
          label: "pesée port",
          statue: PESEE_PORT,
        });
        break;

      case SORTIE_PORT:
        setStyle({
          color: "#fca311",
          backgroundColor: "#fca31120",
          label: "sortie port",
          statue: SORTIE_PORT,
        });
        break;

      case ARRIVE_DEPOT:
        setStyle({
          color: "#00afb9",
          backgroundColor: "#00afb920",
          label: "arrivée depot",
          statue: ARRIVE_DEPOT,
        });
        break;
      case PESEE_DEPOT:
        setStyle({
          color: "#00afb9",
          backgroundColor: "#00afb920",
          label: "pesée depot",
        });
        break;

      case DECHARGMENT:
        setStyle({
          color: "#118ab2",
          backgroundColor: "#118ab220",
          label: "déchargement",
          statue: DECHARGMENT,
        });
        break;

      case FIN:
        setStyle({
          color: "#22223b",
          backgroundColor: "#8ac926",
          label: "términé",
          statue: FIN,
        });
        break;
      default:
        setStyle({
          color: "#14213d",
          backgroundColor: "#14213d20",
          label: "INSCRIPTION",
          statue: INSCRIPTION,
        });
        break;
    }
  }, [statue]);

  return (
    <div
      style={{
        fontWeight: "900",
        color: style.color,
        fontSize: 12,
        textAlign: "right",
        padding: "5px 15px",
        borderRadius: 5,
        backgroundColor: alert ? "#d0000020" : style.backgroundColor,
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
      }}
    >
      {alert && (
        <img
          alt="state"
          src={"assets/images/alert.png"}
          style={{
            width: 24,
            height: 24,
          }}
        />
      )}

      <Typography
        style={{
          fontWeight: "900",
          color: style.color,
          fontSize: 12,
          textTransform: "uppercase",
          marginLeft: 14,
        }}
      >
        {style.label}
      </Typography>
    </div>
  );
}
