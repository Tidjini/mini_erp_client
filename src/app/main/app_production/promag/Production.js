import React, { useCallback, useEffect, useState } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import { Button, Divider, Grid, Typography } from "@material-ui/core";
import Wagon from "./composants/Wagon";
import WagonVide from "./composants/WagonVide";
import ProduitStock from "./composants/ProduitStock";
import Phase from "./composants/Phase";
import { useForm } from "@fuse/hooks";

import {
  onSelectWagon,
  onUnselectWagon,
  onSelectAll,
  onUnselectAll,
} from "./Controller";
import AppSelector from "app/composants/inputs/AppSelector";
import AppInput from "app/composants/inputs/AppInput";
import StockDetails from "./composants/StockDetails";
import ProductionHeader from "./composants/ProductionHeader";
import ConfirmationDialog from "app/main/composants/ConfirmationDialog";

function Production(props) {
  const dispatch = useDispatch();
  const { match, history } = props;

  useEffect(() => {
    dispatch(Actions.getWagonCollection());
    dispatch(Actions.getEmployeCollection());
    dispatch(Actions.getPosteCollection());
    dispatch(Actions.getEquipeCollection());
    dispatch(Actions.getProduitCollection());
  }, []);

  const employes = useSelector(
    ({ production_main }) => production_main.employees.results
  );

  const wagons = useSelector(({ production_main }) => production_main.wagons);

  useEffect(() => {
    setAttente(wagons.attentes);
    setEmpilement(wagons.empliements);
    setEnfournement(wagons.enfournements);
    setDefournement(wagons.defournements);
    setEmballage(wagons.emballages);
  }, [wagons]);

  const [attente, setAttente] = useState([]);
  const [empilement, setEmpilement] = useState([]);
  const [enfournement, setEnfournement] = useState([]);
  const [defournement, setDefournement] = useState([]);
  const [emballage, setEmballage] = useState([]);

  const [stock, setStock] = useState([]);
  const { form, handleChange, setForm } = useForm({
    wagons: [],
    produit: null,
    equipe: null,
    responsable: null,
    poste: null,
    phase: "ATTENTE",
    date: "",
    objectif: 22,
  });

  const goNextOperation = useCallback(
    (liste, phase, produit) => {
      const selected = [];
      liste.map((item) => {
        if (item.selected) {
          selected.push(item.numero);
        }
      });

      dispatch(
        Actions.goNextOperation(
          produit,
          selected,
          form.equipe,
          form.responsable,
          form.poste,
          phase,
          form.date
        )
      );
    },
    [form]
  );

  const stockage = useCallback(
    (liste) => {
      const selected = [];
      liste.map((item) => {
        if (item.selected) {
          selected.push(item.numero);
        }
      });
      dispatch(
        Actions.stockage(
          selected,
          form.equipe,
          form.responsable,
          form.poste,
          form.date
        )
      );
    },
    [form]
  );

  const backup = () => {
    dispatch(Actions.backup());
  };
  const restore = () => {
    dispatch(Actions.restore());
  };
  return (
    <div style={{}}>
      <div style={{ padding: 10, display: "flex" }}>
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

      <ProductionHeader
        form={form}
        handleChange={handleChange}
        setForm={setForm}
        history={history}
      />
      <Divider style={{ height: 0.8, width: "100%", marginBottom: 10 }} />

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
            stockage(emballage);
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

export default withReducer("production_main", reducer)(Production);
