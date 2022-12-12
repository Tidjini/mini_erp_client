import { Button } from "@material-ui/core";
import React from "react";

export default function PhaseActions(props) {
  const {
    onSelectAll,
    onUnselectAll,
    phase,
    produits,
    handleNextOperation,
    handlePreviousOperation,
  } = props;

  return (
    <div>
      <Button
        variant="contained"
        style={{
          marginLeft: 20,
          boxShadow: "none",
          backgroundColor: "#2a9d8f",
          color: "#EFF1FF",
          height: 28,
          fontSize: 12,
          textTransform: "none",
        }}
        onClick={onSelectAll}
      >
        Selectioner Tous
      </Button>
      <Button
        variant="contained"
        style={{
          marginLeft: 20,
          boxShadow: "none",
          backgroundColor: "#fca311",
          color: "#EFF1FF",
          height: 28,
          fontSize: 12,
          textTransform: "none",
        }}
        onClick={onUnselectAll}
      >
        Déselectionner tout
      </Button>
      <Button
        variant="contained"
        style={{
          marginLeft: 20,
          boxShadow: "none",
          backgroundColor: "#fca311",
          color: "#EFF1FF",
          height: 28,
          fontSize: 12,
          textTransform: "none",
        }}
        onClick={(e) => {
          handlePreviousOperation();
        }}
      >
        opération précédente
      </Button>
      {phase === "ATTENTE" &&
        produits &&
        produits.results.map((produit, index) => (
          <Button
            key={index}
            variant="contained"
            style={{
              marginLeft: 20,
              boxShadow: "none",
              backgroundColor: "#1d3557",
              color: "#EFF1FF",
              height: 28,
              fontSize: 12,
              textTransform: "none",
            }}
            onClick={(e) => {
              handleNextOperation(produit.id);
            }}
          >
            {produit.designation}
          </Button>
        ))}

      {phase === "EMPILEMENT" && (
        <Button
          variant="contained"
          style={{
            marginLeft: 20,
            boxShadow: "none",
            backgroundColor: "#bb3e03",
            color: "#EFF1FF",
            height: 28,
            fontSize: 12,
            textTransform: "none",
          }}
          onClick={(e) => {
            handleNextOperation(null);
          }}
        >
          Enfournement
        </Button>
      )}
      {phase === "ENFOURNEMENT" && (
        <Button
          variant="contained"
          style={{
            marginLeft: 20,
            boxShadow: "none",
            backgroundColor: "#ee9b00",
            color: "#EFF1FF",
            height: 28,
            fontSize: 12,
            textTransform: "none",
          }}
          onClick={(e) => {
            handleNextOperation(null);
          }}
        >
          Défournement
        </Button>
      )}
      {phase === "DEFOURNEMENT" && (
        <Button
          variant="contained"
          style={{
            marginLeft: 20,
            boxShadow: "none",
            backgroundColor: "#f77f00",
            color: "#EFF1FF",
            height: 28,
            fontSize: 12,
            textTransform: "none",
          }}
          onClick={(e) => {
            handleNextOperation(null);
          }}
        >
          Emballage
        </Button>
      )}
      {phase === "EMBALLAGE" && (
        <Button
          variant="contained"
          style={{
            marginLeft: 20,
            boxShadow: "none",
            backgroundColor: "#f77f00",
            color: "#EFF1FF",
            height: 28,
            fontSize: 12,
            textTransform: "none",
          }}
          onClick={(e) => {
            handleNextOperation(undefined);
          }}
        >
          Stockage
        </Button>
      )}
      {phase !== "ATTENTE" && (
        <Button
          variant="contained"
          style={{
            marginLeft: 20,
            boxShadow: "none",
            backgroundColor: "#1d3557",
            color: "#EFF1FF",
            height: 28,
            fontSize: 12,
            textTransform: "none",
          }}
        >
          Annuler
        </Button>
      )}
    </div>
  );
}
