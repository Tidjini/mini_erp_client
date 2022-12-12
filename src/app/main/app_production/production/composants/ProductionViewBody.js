import React, { useCallback, useEffect, useState } from "react";

import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { list, saveList } from "app/services/infrabitumService/ActionService";

import { Grid } from "@material-ui/core";
import Phase from "./Phase";

import {
  onSelectWagon,
  onUnselectWagon,
  onSelectAll,
  onUnselectAll,
} from "./Controller";

//todo if production id is null then hide with div the production body section
export default function ProductionViewBody(props) {
  const dispatch = useDispatch();

  const production = useSelector(
    ({ production_production }) => production_production.production
  );

  useEffect(() => {
    dispatch(list("PRODUCTION-WAGON", "production/wagons", 1));
    dispatch(list("PRODUCTION-PRODUIT", "production/produits", 1));
  }, []);

  const wagons = useSelector(
    ({ production_production }) => production_production.wagon
  );
  const [attente, setAttente] = useState([]);
  const [empilement, setEmpilement] = useState([]);
  const [enfournement, setEnfournement] = useState([]);
  const [defournement, setDefournement] = useState([]);
  const [emballage, setEmballage] = useState([]);

  useEffect(() => {
    setAttente(wagons.attentes);
    setEmpilement(wagons.empliements);
    setEnfournement(wagons.enfournements);
    setDefournement(wagons.defournements);
    setEmballage(wagons.emballages);
  }, [wagons]);

  const goNextOperation = useCallback(
    (liste, phase, produit) => {
      if (
        production.id === undefined ||
        production.id === null ||
        production.id === ""
      ) {
        alert("Error, votre production n est pas encore savgarder ...");
        return;
      }
      const selected = [];
      liste.map((item) => {
        if (item.selected) {
          const i = {
            production: production.id,
            wagon: item.numero,
            produit: item.produit,
            phase: phase,
          };
          if (produit !== undefined && phase === "EMPILEMENT") {
            i.produit = produit;
          } else {
          }
          selected.push(i);
        }
      });

      dispatch(
        saveList(
          "PRODUCTION-production",
          "production/production_operations",
          selected
        )
      ).then((result) => {
        dispatch(list("PRODUCTION-WAGON", "production/wagons", 1));
      });
    },
    [production]
  );

  const goPreviousOperation = useCallback(
    (liste) => {
      if (
        production.id === undefined ||
        production.id === null ||
        production.id === ""
      ) {
        alert("Error, votre production n est pas encore savgarder ...");
        return;
      }
      const selected = [];
      liste.map((item) => {
        if (item.selected) {
          selected.push(item);
        }
      });

      dispatch(Actions.previousOperation(selected)).then((result) => {
        dispatch(list("PRODUCTION-WAGON", "production/wagons", 1));
      });
    },
    [production]
  );

  return (
    <div style={{}}>
      {/* <div style={{ padding: 10, display: "flex" }}>
        <ConfirmationDialog
          button="Annuler cette action"
          title="Restore (Production)"
          message="Voulez vous restorer les données précédent de la production ?"
          confirm={restore}
          buttonStyle={{
            marginLeft: 20,
            boxShadow: "none",
            backgroundColor: "#fb8500",
            color: "#f1faee",
            height: 28,
            fontSize: 12,
            textTransform: "uppercase",
          }}
        />
      </div>
 */}

      <Grid
        container
        style={{
          padding: "0px 25px",
          display: "flex",
          justifycontent: "space-between",
          backgroundImage: `url("assets/images/app_production/storage-stacks.png")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: 200,
        }}
      >
        <Phase
          width={4}
          list={emballage}
          title={`Emballage (${emballage.length} WG)`}
          icon="package.png"
          detailStyle={{
            backgroundColor: "#f77f00",
          }}
          containerStyle={{
            display: "flex",
            justifycontent: "center",
            border: "2px solid #f77f00",
            width: 500,
            height: 56 * 3 + 20,
            margin: "10px 0",
            padding: 10,
          }}
          maxDisplay={18}
          titleStyle={{ display: "flex", alignItems: "center" }}
          onSelectWagon={(numero, ctrl) => {
            onSelectWagon(numero, emballage, setEmballage, ctrl);
          }}
          onUnselectWagon={(numero) => {
            onUnselectWagon(numero, emballage, setEmballage);
          }}
          nextOperation={(produit) => {
            // stockage(emballage);
            goNextOperation(emballage, "ATTENTE", produit);
          }}
          previousOperation={() => {
            goPreviousOperation(emballage);
          }}
          phase="EMBALLAGE"
          onSelectAll={() => {
            onSelectAll(emballage, setEmballage);
          }}
          onUnselectAll={() => {
            onUnselectAll(emballage, setEmballage);
          }}
        />

        <Phase
          width={4}
          list={attente}
          title={`Attente (${attente.length} WG)`}
          icon="queue.png"
          detailStyle={{
            backgroundColor: "#6b705c",
          }}
          containerStyle={{
            display: "flex",
            justifycontent: "center",
            borderWidth: "2px 0",
            borderColor: "#6b705c",
            width: 500,
            height: 56 * 2,
            margin: "10px 0",
          }}
          maxDisplay={12}
          titleStyle={{ display: "flex", alignItems: "center" }}
          onSelectWagon={(numero, ctrl) => {
            onSelectWagon(numero, attente, setAttente, ctrl);
          }}
          onUnselectWagon={(numero) => {
            onUnselectWagon(numero, attente, setAttente);
          }}
          nextOperation={(produit) => {
            goNextOperation(attente, "EMPILEMENT", produit);
          }}
          previousOperation={() => {
            goPreviousOperation(attente);
          }}
          phase="ATTENTE"
          onSelectAll={() => {
            onSelectAll(attente, setAttente);
          }}
          onUnselectAll={() => {
            onUnselectAll(attente, setAttente);
          }}
        />

        <Phase
          width={4}
          list={empilement}
          title={`Empilement (${empilement.length} WG)`}
          icon="layers.png"
          detailStyle={{
            backgroundColor: "#023047",
          }}
          containerStyle={{
            display: "flex",
            justifycontent: "center",
            border: "2px dashed #023047",
            width: 500,
            height: 56 * 3 + 20,
            margin: "10px 0",
            padding: 10,
          }}
          maxDisplay={18}
          titleStyle={{ display: "flex", alignItems: "center" }}
          onSelectWagon={(numero, ctrl) => {
            onSelectWagon(numero, empilement, setEmpilement, ctrl);
          }}
          onUnselectWagon={(numero) => {
            onUnselectWagon(numero, empilement, setEmpilement);
          }}
          nextOperation={(produit) => {
            goNextOperation(empilement, "ENFOURNEMENT", produit);
          }}
          previousOperation={() => {
            goPreviousOperation(empilement);
          }}
          phase="EMPILEMENT"
          onSelectAll={() => {
            onSelectAll(empilement, setEmpilement);
          }}
          onUnselectAll={() => {
            onUnselectAll(empilement, setEmpilement);
          }}
        />

        <Phase
          width={3}
          list={defournement}
          title={`Défournement (${defournement.length} WG)`}
          icon="container.png"
          detailStyle={{
            backgroundColor: "#bb3e03",
          }}
          containerStyle={{
            display: "flex",
            justifycontent: "center",
            borderWidth: "0 5px",
            borderColor: "#bb3e03",
            width: 200,
            height: 52 * 6 + 10,
            margin: "10px 0",
            padding: "0 10px",
          }}
          maxDisplay={12}
          titleStyle={{ display: "flex", alignItems: "center" }}
          previousOperation={() => {
            goPreviousOperation(defournement);
          }}
          onSelectWagon={(numero, ctrl) => {
            onSelectWagon(numero, defournement, setDefournement, ctrl);
          }}
          onUnselectWagon={(numero) => {
            onUnselectWagon(numero, defournement, setDefournement);
          }}
          nextOperation={(produit) => {
            goNextOperation(defournement, "EMBALLAGE", produit);
          }}
          phase="DEFOURNEMENT"
          onSelectAll={() => {
            onSelectAll(defournement, setDefournement);
          }}
          onUnselectAll={() => {
            onUnselectAll(defournement, setDefournement);
          }}
        />

        <Phase
          width={9}
          list={enfournement}
          title={`Enfournement (${enfournement.length} WG)`}
          icon="fire-place.png"
          detailStyle={{
            backgroundColor: "#bb3e03",
          }}
          containerStyle={{
            display: "flex",
            justifycontent: "center",
            alignItems: "center",
            borderWidth: "5px 0",
            borderColor: "#bb3e03",
            width: "100%",
            height: 150,
            margin: "10px 0",
            padding: "5px 0",
          }}
          maxDisplay={30}
          titleStyle={{
            display: "flex",
            alignItems: "center",
            justifycontent: "end",
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "end",
          }}
          onSelectWagon={(numero, ctrl) => {
            onSelectWagon(numero, enfournement, setEnfournement, ctrl);
          }}
          onUnselectWagon={(numero) => {
            onUnselectWagon(numero, enfournement, setEnfournement);
          }}
          nextOperation={(produit) => {
            goNextOperation(enfournement, "DEFOURNEMENT", produit);
          }}
          previousOperation={() => {
            goPreviousOperation(enfournement);
          }}
          phase="ENFOURNEMENT"
          onSelectAll={() => {
            onSelectAll(enfournement, setEnfournement);
          }}
          onUnselectAll={() => {
            onUnselectAll(enfournement, setEnfournement);
          }}
        />
      </Grid>
    </div>
  );
}
