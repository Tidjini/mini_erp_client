import React, { useEffect, useState, useCallback } from "react";

import { Dialog, Grid, Slide } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import Input from "app/main/composants/inputs/Input";
import AppSelector from "app/composants/inputs/AppSelector";
import { useForm } from "@fuse/hooks";
import { mapListToSelector } from "app/main/helpers/utils";

import {
  list,
  save,
  destroy,
} from "app/services/infrabitumService/ActionService";
import Button from "app/main/composants/base/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultItem = {
  id: "",
  produit_designation: "",
  phase: "ATTENTE",
  anomalie: true,
  anomalie_agent: "",
  anomalie_remarque: "",
  anomalie_flag: "ERREUR",
  production: "",
  wagon: "1",
  produit: "",
};

export default function OperationView(props) {
  const dispatch = useDispatch();
  const { item, open, setOpen } = props;

  const { form, handleChange, setForm } = useForm(defaultItem);
  // const responsables = useSelector(
  //   ({ production_operations }) => production_operations.responsable.results
  // );
  const products = useSelector(
    ({ production_operations }) => production_operations.produits
  );

  // const production = useSelector(
  //   ({ production_operations }) => production_operations.production
  // );

  React.useEffect(() => {
    if (!open) setForm(defaultItem);
    else {
      if (item === null) setForm(defaultItem);
      else setForm(item);
    }
    // dispatch(list("OPERATION", "gestion/services", 1));
    dispatch(list("OPERATION-PRODUIT", "production/produits", 1));
  }, [open, item]);
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    // const collection = mapListToSelector(
    //   products.results,
    //   ["designation"],
    //   "id",
    //   false
    // );
    setProduits(products.results);
  }, [products]);

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleSave = useCallback(
    (event) => {
      const { produit } = form;
      if (produit == null || produit === undefined || produit === "") {
        form.produit = produits[0].value;
      }
      const data = { ...form };
      dispatch(
        save("PRODUCTION-production", "production_api/operations", data)
      ).then((result) => {
        dispatch(list("OPERATION", "production_api/operations", 1, {})).then(
          (res) => setOpen(false)
        );
      });
    },
    [form]
  );
  const handleDelete = useCallback(
    (event) => {
      const { produit } = form;
      if (produit == null || produit === undefined || produit === "") {
        form.produit = produits[0].value;
      }
      const data = { ...form };
      dispatch(
        destroy("PRODUCTION-production", "production_api/operations", data)
      ).then((result) => {
        dispatch(list("OPERATION", "production_api/operations", 1, {})).then(
          (res) => {
            setOpen(false);
          }
        );
      });
    },
    [form]
  );
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <Grid container style={{ padding: 20 }}>
        <Input
          grid={{ xs: 6 }}
          name="wagon"
          label="wagon"
          handleChange={handleChange}
          value={form.wagon}
          style={{}}
        />

        <Grid item xs={6}>
          <AppSelector
            grid={{ xs: 6 }}
            name="produit"
            label="Produit"
            value={form.produit}
            options={produits}
            handleChange={handleChange}
            height={28}
            horizontal={false}
            width={"auto"}
            style={{ marginLeft: 5, marginBottom: 35 }}
          />
        </Grid>

        <Grid item xs={6}>
          <AppSelector
            name="phase"
            label="Opération"
            value={form.phase}
            options={[
              { display: "ATTENTE", value: "ATTENTE" },
              { display: "EMPILEMENT", value: "EMPILEMENT" },
              { display: "ENFOURNEMENT", value: "ENFOURNEMENT" },
              { display: "DEFOURNEMENT", value: "DEFOURNEMENT" },
              { display: "EMBALLAGE", value: "EMBALLAGE" },
            ]}
            handleChange={handleChange}
            height={28}
            horizontal={false}
            width={"auto"}
            style={{ marginLeft: 5, marginBottom: 35 }}
          />
        </Grid>

        <Input
          grid={{ xs: 12 }}
          name="anomalie_remarque"
          label="Remarque"
          handleChange={handleChange}
          value={form.anomalie_remarque}
          style={{}}
        />
        <Grid item xs={6}>
          <Button
            style={{
              backgroundColor: "#2a9d8f",
              color: "#EFF1FF",
              marginTop: 15,
            }}
            onClick={handleSave}
          >
            Sauvgarder
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            style={{
              backgroundColor: "red",
              color: "#EFF1FF",
              marginLeft: 15,
              marginTop: 15,
            }}
            onClick={handleDelete}
          >
            Supprimer
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
