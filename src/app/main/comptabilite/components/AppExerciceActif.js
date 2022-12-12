import { Card } from "@material-ui/core";
import React from "react";

export default function AppExerciceActif(props) {
  const { exercice_actif } = props;
  return (
    <Card
      style={{
        minHeight: 100,
        margin: 10,
        background: "#D4EDE5",
        borderRadius: 5,
        padding: 10,
      }}
    >
      {exercice_actif.id === 0 && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              <h4
                style={{
                  fontSize: 12,
                  marginLeft: 5,
                  fontWeight: "400",
                }}
              >
                Exercice
              </h4>
              <h4
                style={{
                  fontSize: 18,
                  marginLeft: 5,
                  fontWeight: "bold",
                }}
              >
                Pas de dossier ouvert
              </h4>
              <h4
                style={{
                  fontSize: 11,
                  marginLeft: 5,
                  fontWeight: "400",
                }}
              >
                Vérifier votre configuration
              </h4>
            </div>

            <img
              alt="state"
              src={"assets/images/compta/folder_open.png"}
              style={{
                width: 86,
                height: 86,
              }}
            />
          </div>
        </div>
      )}
      {exercice_actif.id !== 0 && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              <h4
                style={{
                  fontSize: 12,
                  marginLeft: 5,
                  fontWeight: "400",
                }}
              >
                Exercice
              </h4>
              <h4
                style={{
                  fontSize: 18,
                  marginLeft: 5,
                  fontWeight: "bold",
                }}
              >
                {exercice_actif.intitule}
              </h4>
              {/* <h4
                style={{
                  fontSize: 11,
                  marginLeft: 5,
                  fontWeight: "400",
                }}
              >
                {exercice_actif.annee}
              </h4> */}
              <h4
                style={{
                  fontSize: 11,
                  marginLeft: 5,
                  fontWeight: "400",
                }}
              >
                du: {exercice_actif.debut} au: {exercice_actif.fin}
              </h4>
            </div>

            <img
              alt="state"
              src={"assets/images/compta/folder_open.png"}
              style={{
                width: 86,
                height: 86,
              }}
            />
          </div>
          <h4
            style={{
              fontSize: 18,
              marginLeft: 5,
              fontWeight: "bold",
            }}
          >
            {"Année: " + exercice_actif.annee}
          </h4>
          {/* <h4
            style={{
              fontSize: 12,
              marginLeft: 5,
              fontWeight: "400",
            }}
          >
            Entreprise
          </h4>
          <h4
            style={{
              fontSize: 18,
              marginLeft: 5,
              fontWeight: "bold",
            }}
          >
            {exercice_actif.entreprise}
          </h4>
          <h4
            style={{
              fontSize: 11,
              marginLeft: 5,
              fontWeight: "400",
            }}
          >
            {exercice_actif.address}
          </h4> */}
        </div>
      )}
    </Card>
  );
}
