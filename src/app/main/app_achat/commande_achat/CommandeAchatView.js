import React, { useCallback, useEffect } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions/view.actions";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Divider,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useForm } from "@fuse/hooks";

import { viewStyles as styles } from "./CommandeAchatConfig";
import AppInput from "app/main/components/AppInput";
import AppInputSelector from "app/main/components/AppInputSelector";
import CommandeStatut from "app/composants/custom/CommandeStatut";
import Table from "app/composants/table/Table";
import {
  viewTableHeader,
  viewColumns,
  defaultData,
} from "./CommandeAchatConfig";

import { getDate } from "app/helpers/utils";
import Attachements from "app/composants/custom/Attachements";
import ActionDialog from "app/main/composants/ActionDialog";

function CommandeAchatView(props) {
  const { match, history } = props;
  const dispatch = useDispatch();
  const { form, handleChange, setForm, setInForm } = useForm(defaultData);
  const commande = useSelector(({ commande_achat }) => commande_achat.commande);
  const attachements = useSelector(
    ({ commande_achat }) => commande_achat.attachements
  );
  const attachements_deleted = useSelector(
    ({ commande_achat }) => commande_achat.attachements_deleted
  );

  useEffect(() => {
    const { commandeId } = match.params;
    if (commandeId === "new") {
    } else {
      dispatch(Actions.getCommandeItem(commandeId));
      dispatch(Actions.getAttachements(commandeId));
    }
  }, [match]);

  useEffect(() => {
    setForm(commande);
  }, [commande]);

  const saveCommande = useCallback(
    (event) => {
      dispatch(Actions.saveCommande(form, attachements, attachements_deleted));
    },
    [form, attachements, attachements_deleted]
  );

  function addNewAttachement(attachement) {
    dispatch(Actions.addNewAttachement(attachement));
  }

  function deleteAttachement(attachement) {
    dispatch(Actions.deleteAttachement(attachement, attachements));
  }

  function onDelete() {
    if (form.id === undefined || form.id === null || form.id === 0) return;
    dispatch(Actions.deleteCommande(form.id)).then(() => {
      history.push(`/commande_achat_collection/`);
    });
  }
  return (
    <div style={styles.container}>
      <Grid container>
        {/* header */}
        <Grid container className="w-full flex" style={styles.header}>
          <Grid item xs={12} sm={4} md={6} lg={8}>
            <div style={styles.flexCenter}>
              <IconButton
                aria-haspopup="true"
                onClick={(e) => {
                  history.push(`/commande_achat_collection/`);
                }}
              >
                <Icon
                  color="action"
                  className="text-24"
                  style={{ color: "white" }}
                >
                  arrow_back
                </Icon>
              </IconButton>
              <img
                alt="state"
                src={"assets/images/app_achat/commande_achat.png"}
                style={styles.icon}
              />
              <Typography style={styles.title}>
                <span style={styles.titleSpan}>Commande N°</span> {form.numero}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button
              variant="contained"
              style={{ ...styles.button }}
              onClick={saveCommande}
            >
              Sauvgarder
            </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Attachements
              attachements={attachements}
              addNewAttachement={addNewAttachement}
              deleteAttachement={deleteAttachement}
              buttonStyle={{
                ...styles.button,
                backgroundColor: "#0a939620",
                textTransform: "uppercase",
              }}
            />
          </Grid>

          <Grid item xs={12} sm={1}>
            <ActionDialog
              label="Supprimer"
              title="Suppression"
              actionOne={() => onDelete()}
              labelOne="Supprimer"
              actionTwo={() => {}}
              labelTwo="Annuler"
              message={`Voulez-vous supprimer cette commande ? (tous les articles seront supprimes)`}
              style={{
                ...styles.button,
                backgroundColor: "red",
                textTransform: "uppercase",
              }}
            />
          </Grid>
        </Grid>
        {/* header */}

        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={styles.boxContainer}
        >
          <Grid container style={styles.box}>
            <Grid item xs={12} style={{ ...styles.selector, paddingTop: 5 }}>
              <Typography style={{ fontWeight: "bold" }}>
                Fournisseur:
              </Typography>
              <Typography
                style={{
                  color: "#2a9d8f",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {form.fournisseur}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} style={styles.selector}>
              <AppInputSelector
                label="Reglement."
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
            <Grid item xs={12} sm={6} style={styles.selector}>
              <AppInputSelector
                label="Mode Paiement"
                name="modalite_paiement"
                placeholder="Mode"
                type="text"
                items={[
                  { value: "Chèque", display: "Chèque" },
                  { value: "Espèces", display: "Espèces" },
                  {
                    value: "Virement Banacaire",
                    display: "Virement Banacaire",
                  },
                  { value: "Carte Banacaire", display: "Carte Banacaire" },
                  { value: "autre", display: "AUTRE" },
                ]}
                value={form.modalite_paiement}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} style={styles.input}>
              <AppInput
                label="Commercial"
                name="commercial"
                placeholder="Commercial"
                type="text"
                value={form.commercial}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={styles.boxContainer}
        >
          <Grid container style={styles.box}>
            <Grid
              item
              xs={12}
              style={{
                ...styles.selector,
                paddingTop: 5,
                display: "flex",
                justifycontent: "space-between",
              }}
            >
              <div>
                <Typography style={{ fontWeight: "bold" }}>Numero:</Typography>
                <Typography style={{ color: "#2a9d8f", fontWeight: "bold" }}>
                  {form.numero}
                </Typography>
              </div>
              <div>
                <Typography style={{ fontWeight: "bold" }}>Date:</Typography>
                <Typography style={{ color: "#2a9d8f", fontWeight: "bold" }}>
                  {getDate(form.date_commande)}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} style={styles.input}>
              <AppInput
                label="N° Commande"
                name="numero_commande"
                handleChange={handleChange}
                value={form.numero_commande}
              />
            </Grid>
            <Grid item xs={12} style={styles.input}>
              <AppInput
                label="Libellé"
                name="label"
                placeholder="Libellé"
                type="text"
                handleChange={handleChange}
                value={form.label}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={styles.boxContainer}
        >
          <Grid container style={styles.box}>
            <Grid item xs={12} style={{ ...styles.selector, paddingTop: 5 }}>
              <Typography style={{ fontWeight: "bold" }}>
                Numéro Devis:
              </Typography>
              <Typography style={{ color: "#bb3e03", fontWeight: "bold" }}>
                {form.devis_achat_numero}
              </Typography>
            </Grid>

            <Grid item xs={12} style={styles.input}>
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
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ ...styles.boxContainer, padding: "10px 0 0 0" }}
        >
          <Grid container style={styles.box}>
            <Typography
              style={{
                fontWeight: "600",
                fontSize: 16,
                marginLeft: 5,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Totaux
            </Typography>
            <Grid
              item
              xs={12}
              style={{
                ...styles.selector,
                paddingTop: 5,
                display: "flex",
                justifycontent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Total HT:
              </Typography>
              <Typography style={{ color: "#1d3557", fontWeight: "600" }}>
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "DZD",
                }).format(form.total)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                ...styles.selector,
                paddingTop: 5,
                display: "flex",
                justifycontent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Total TVA:
              </Typography>
              <Typography style={{ color: "#1d3557", fontWeight: "600" }}>
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "DZD",
                }).format(form.total_tva)}
              </Typography>
            </Grid>
            <Divider style={styles.divider} />
            <Grid
              item
              xs={12}
              style={{
                ...styles.selector,
                paddingTop: 5,
                display: "flex",
                justifycontent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Total TTC:
              </Typography>
              <Typography
                style={{ color: "#2a9d8f", fontWeight: "700", fontSize: 24 }}
              >
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "DZD",
                }).format(form.total_ttc)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div style={{ marginTop: 20 }}>
        <Table
          cells={viewTableHeader}
          data={form.articles}
          columns={viewColumns}
        />
      </div>
    </div>
  );
}

export default withReducer("commande_achat", reducer)(CommandeAchatView);
