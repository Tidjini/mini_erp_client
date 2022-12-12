import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import AppInput from "app/main/components/AppInput";

import * as Actions from "../store/actions";
import { useDispatch } from "react-redux";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import AppActionDialog from "app/main/components/AppActionDialog";
import DevisValidation from "app/ui/DevisAchat/DevisValidation";
import DevisStatus from "app/ui/DevisAchat/DevisStatus";

import { initDevisAchat } from "../store/actions";
import AppInputSelector from "app/main/components/AppInputSelector";

function DevisAchatHeaderItem(props) {
  const dispatch = useDispatch();

  const {
    style,
    handleChange,
    form,
    setInForm,
    setForm,
    md,
    save,
    confirmation,
    annulation,
    copierDevis,
    copierDevisEtOuvrir,
    onDevisSelectionChanged,
    onDownloadCompareTable,

    onDelete,
  } = props;
  const [dateDevis, setDateDevis] = useState("");
  const [dateValidation, setDateValidation] = useState("");

  const today = new Date();

  const handleChangeDateDevis = useCallback((e) => {
    e.persist();
    const date = new Date(e.target.value);
    setForm((form) => ({
      ...form,
      date_devis: date.toISOString(),
    }));
  }, []);

  const handleChangeDateValidate = useCallback((e) => {
    e.persist();
    const date = new Date(e.target.value);
    setForm((form) => ({
      ...form,
      date_validation: date.toISOString(),
    }));
  }, []);

  useEffect(() => {
    if (form.date_devis === null || form.date_devis === undefined) return;
    setDateDevis(form.date_devis.substring(0, 10));
    if (form.date_validation === null || form.date_validation === undefined)
      return;
    setDateValidation(form.date_validation.substring(0, 10));
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
        marginTop: 16,
      }}
    >
      <Grid
        item
        container
        xs={12}
        sm={12}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Grid item xs={12} sm={12}>
          <Button style={{ fontSize: 12 }} disabled={true}>
            <Avatar
              alt="Achat"
              src="assets/images/devis_achat.png"
              style={{ width: 36, height: 36, marginRight: 10 }}
            />
            Devis Achat N°:
            <span style={{ marginLeft: 8, fontSize: 18, color: "#1265E7" }}>
              {form.numero}
            </span>
          </Button>
        </Grid>

        <Button
          variant="contained"
          style={{
            marginRight: 4,
            boxShadow: "none",
            backgroundColor: "#1265E7",
            color: "#EFF1FF",
            textTransform: "none",
          }}
          onClick={save}
        >
          Sauvgarder
        </Button>

        <AppActionDialog
          buttonLabel="Copie Devis"
          title="Copier Devis"
          actionOne={copierDevis}
          actionOneLabel="Sauvgarder"
          actionTwo={copierDevisEtOuvrir}
          actionTwoLabel="Sauvgarder et Ouvrir"
          actionThreeLabel="Annuler"
          message={` Voulez vous copier ce devis N°${form.numero} en un autre Devis?`}
        />
        <Button
          variant="contained"
          style={{
            marginRight: 4,
            boxShadow: "none",
            backgroundColor: "#e76f51",
            color: "#EFF1FF",
            textTransform: "none",
          }}
          onClick={onDownloadCompareTable}
          startIcon={<Icon>table_view</Icon>}
        >
          Table Comparison (TCO)
        </Button>

        {form.statue < 3 && (
          <AppActionDialog
            backgroundColor="#023047"
            buttonLabel="Validation"
            title="Validation"
            actionOne={confirmation}
            actionOneLabel="Confirmez en commande"
            actionTwo={annulation}
            actionTwoLabel="Annulation Achat"
            actionThreeLabel="Retour"
            message={` Voulez vous confirmez ou annulez: devis N°${form.numero}?`}
          />
        )}
        {form.statue < 3 && (
          <AppActionDialog
            buttonLabel="Supprimez"
            title="Suppression"
            actionOne={() => {
              onDelete && onDelete();
            }}
            actionOneLabel="Supprimez"
            actionTwo={undefined}
            actionTwoLabel=""
            actionThreeLabel="Annuler"
            message={`Voulez-vous supprimer cette proforma ? (même les devis liés seront supprimés)`}
            backgroundColor={"red"}
          />
        )}
      </Grid>

      <Grid item xs={12} sm={4} md={2}>
        <AppInput
          label="Fournisseur"
          name="fournisseur"
          placeholder="Raison Social"
          type="text"
          handleChange={handleChange}
          value={form.fournisseur}
        />
      </Grid>

      <Grid item xs={12} sm={4} md={1}>
        <AppInputSelector
          label="Mode Reg."
          name="modalite_reglement"
          placeholder="Mode"
          type="text"
          items={[
            { value: "A TÉRME", display: "A TÉRME" },
            { value: "CASH", display: "CASH" },
            { value: "AUTRE", display: "AUTRE" },
          ]}
          value={form.modalite_reglement}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={1}>
        <AppInputSelector
          label="Mode Paie."
          name="modalite_paiement"
          placeholder="Mode"
          type="text"
          items={[
            { value: "Chèque", display: "Chèque" },
            { value: "Espèces", display: "Espèces" },
            { value: "Virement Banacaire", display: "Virement Banacaire" },
            { value: "Carte Banacaire", display: "Carte Banacaire" },
            { value: "autre", display: "AUTRE" },
          ]}
          handleChange={handleChange}
          value={form.modalite_paiement}
        />
      </Grid>

      <Grid item xs={12} sm={4} md={2}>
        <AppInput
          label="Commercial"
          name="commercial"
          placeholder="Contact ou Agent Commercial"
          type="text"
          handleChange={handleChange}
          value={form.commercial}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <AppInputSelector
          label="Devis Copies"
          name="numero_devis"
          placeholder="Devis Fournisseur"
          type="text"
          items={form.devis_copies}
          handleChange={(e) => onDevisSelectionChanged(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <DevisValidation date={form.date_validation} />
        <DevisStatus statue={form.statue} />
      </Grid>
      {/* <Grid item xs={12} sm={4} md={2}>
        <AppInput
          label="Employe Respnsable"
          name="employe_responsable"
          placeholder="Employé"
          type="text"
          handleChange={handleChange}
          value={form.employe_responsable}
        />
      </Grid> */}
      <Grid item xs={12} sm={4} md={2}>
        <AppInput
          label="N° Devis"
          name="numero_devis"
          placeholder="Devis Fournisseur"
          type="text"
          handleChange={handleChange}
          value={form.numero_devis}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <AppInput
          label="Date Devis"
          name="date_devis"
          placeholder={
            today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear()
          }
          type="date"
          format="DD/MM/YYYY"
          defaultValue={today.toDateString()}
          handleChange={handleChangeDateDevis}
          value={dateDevis}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <AppInput
          label="Date Validité"
          name="date_devis"
          placeholder={
            today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear()
          }
          type="date"
          format="DD/MM/YYYY"
          defaultValue={today.toDateString()}
          handleChange={handleChangeDateValidate}
          value={dateValidation}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={6}>
        <AppInput
          label="Remarque"
          name="remarque"
          placeholder="Remarque"
          type="text"
          handleChange={handleChange}
          value={form.remarque}
        />
      </Grid>
    </Grid>
  );
}

export default withReducer("devis_achat", reducer)(DevisAchatHeaderItem);
