import React, { useEffect, useState, useCallback } from "react";

import { Dialog, Grid, Slide } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import Input from "app/main/composants/inputs/Input";
import AppSelector from "app/composants/inputs/AppSelector";
import { useForm } from "@fuse/hooks";
import { mapListToSelector } from "app/main/helpers/utils";

import { list, save } from "app/services/infrabitumService/ActionService";
import Button from "app/main/composants/base/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WagonAnomalie(props) {
  const dispatch = useDispatch();

  const { form, handleChange, setForm } = useForm({
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
  });
  const responsables = useSelector(
    ({ production_production }) => production_production.responsable.results
  );
  const products = useSelector(
    ({ production_production }) => production_production.produits
  );

  const production = useSelector(
    ({ production_production }) => production_production.production
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({
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
      });
    }
  }, [open]);

  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const collection = mapListToSelector(
      products.results,
      ["designation"],
      "id",
      false
    );
    setProduits(collection);
  }, [products]);

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

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
      form.production = production.id;
      const data = { ...form };
      dispatch(
        save("PRODUCTION-production", "production/production_operations", data)
      ).then((result) => {
        dispatch(list("PRODUCTION-WAGON", "production/wagons", 1));
        setOpen(false);
      });
    },
    [form]
  );
  return (
    <div>
      <Button
        style={{
          backgroundColor: "#e63946",
          color: "#f1faee",
        }}
        onClick={handleClickOpen}
      >
        Anomalie
      </Button>
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
              name="anomalie_agent"
              label="Agent"
              value={form.anomalie_agent}
              options={responsables}
              handleChange={handleChange}
              height={28}
              horizontal={false}
              width={"auto"}
              style={{ marginBottom: 35 }}
            />
          </Grid>
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
              name="anomalie_flag"
              label="Type"
              value={form.anomalie_flag}
              options={[
                { display: "ERREUR", value: "ERREUR" },
                {
                  display: "PRODUCTION_PREMATURE",
                  value: "PRODUCTION_PREMATURE",
                },
                { display: "PREMIER_ITIRATION", value: "PREMIER_ITIRATION" },
                { display: "AUTRE", value: "AUTRE" },
              ]}
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
          <Grid item xs={12}>
            <Button
              style={{
                backgroundColor: "#2a9d8f",
                color: "#EFF1FF",
              }}
              onClick={handleSave}
            >
              Sauvgarder
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
