import { Grid } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import AppInput from "app/main/components/AppInput";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import AppInputSelector from "app/main/components/AppInputSelector";

function DemandeAchatLeftForm(props) {
  const { style, handleChange, form, setForm, md } = props;
  const [dateDemande, setDateDemande] = useState("");

  const today = new Date();

  const handleChangeDate = useCallback((e) => {
    e.persist();
    const date = new Date(e.target.value);
    setForm((form) => ({
      ...form,
      date_demande: date.toISOString(),
    }));
  }, []);

  useEffect(() => {
    if (form.date_demande === null || form.date_demande === undefined) return;
    setDateDemande(form.date_demande.substring(0, 10));
  }, [form]);

  if (form === null || form === undefined) return "";

  return (
    <Grid
      container
      item
      xs={12}
      md={md}
      spacing={2}
      style={{
        ...style,
        backgroundColor: "#F8F9FE",
        padding: 16,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 8,
        alignSelf: "start",
      }}
    >
      <Grid item xs={12} sm={4} md={4}>
        <AppInput
          label="N° Bon"
          name="numero_bon"
          placeholder="Numero Bon"
          type="text"
          handleChange={handleChange}
          value={form.numero_bon}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <AppInput
          label="Label"
          name="label"
          placeholder="Label"
          type="text"
          handleChange={handleChange}
          value={form.label}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <AppInputSelector
          label="Urgence"
          name="urgence"
          placeholder="Urgence"
          type="text"
          items={[
            { value: 1, display: "Normal" },
            { value: 2, display: "Moyenne" },
            { value: 3, display: "Urgent" },
            { value: 4, display: "Très Urgent" },
          ]}
          value={form.urgence}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AppInput
          label="Date Demande"
          name="date_demande"
          placeholder={
            today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear()
          }
          type="date"
          format="DD/MM/YYYY"
          defaultValue={today.toDateString()}
          handleChange={handleChangeDate}
          value={dateDemande}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AppInput
          label="Employe"
          name="employe_nom_complet"
          placeholder="Nom Prenom"
          type="text"
          handleChange={handleChange}
          value={form.employe_nom_complet}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <AppInput
          label="Destination"
          name="service_name"
          placeholder="Achat"
          type="text"
          defaultValue={"Achat"}
          handleChange={handleChange}
          value={form.service_name}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <AppInput
          label="Remarque"
          name="remarque"
          placeholder="Remarque sur la demande"
          type="text"
          defaultValue={"remarque"}
          handleChange={handleChange}
          value={form.remarque}
        />
      </Grid>
    </Grid>
  );
}

export default withReducer("demande_achat", reducer)(DemandeAchatLeftForm);
