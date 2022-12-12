import { Card } from "@material-ui/core";
import React from "react";

export default function AppDossierActif(props) {
  const { dossier_actif } = props;
  return (
    <Card
      style={{
        margin: 10,
        background: "#34A0A4",
        borderRadius: 5,
        padding: 10,
        color: "white",
      }}
    >
      {dossier_actif.entreprise === "" && (
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
                Dossier
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
                  marginTop: 5,
                  fontWeight: "400",
                }}
              >
                Vérifier vos paramétrages et vos bases de données
              </h4>
            </div>

            <img
              alt="state"
              src={"assets/images/compta/empty_folder.png"}
              style={{
                width: 86,
                height: 86,
              }}
            />
          </div>
        </div>
      )}
      {dossier_actif.entreprise !== "" && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
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
                Dossier
              </h4>
              <h4
                style={{
                  fontSize: 18,
                  marginLeft: 5,
                  fontWeight: "bold",
                }}
              >
                {dossier_actif.entreprise &&
                  dossier_actif.entreprise.toUpperCase()}
              </h4>
              <h4
                style={{
                  fontSize: 11,
                  marginLeft: 5,
                  marginTop: 10,
                  fontWeight: "400",
                }}
              >
                {dossier_actif.address}
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
    </Card>
  );
}
