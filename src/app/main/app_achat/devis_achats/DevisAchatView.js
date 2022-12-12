import React, { useCallback, useEffect } from "react";

import { Grid, Icon, IconButton } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { theme } from "app/main/components/AppTheme";
import * as Actions from "./store/actions";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { useForm } from "@fuse/hooks";
import { columns, defaultData } from "./DevisAchatConfig";
import DevisAchatHeaderItem from "./components/DevisAchatHeaderItem";
import { Link } from "react-router-dom";
import DevisAchatTable from "./components/DevisAchatTable";
import { showMessage } from "app/store/actions/fuse";
import DevisAchatTableCompareDialog from "./components/DevisAchatTableCompareDialog";
import AppUploaderForm from "app/main/components/AppUploaderForm";

function DevisAchatView(props) {
  const dispatch = useDispatch();
  const { form, handleChange, setForm, setInForm } = useForm(defaultData);
  const devis = useSelector(({ devis_achat }) => devis_achat.devis.devis);

  const attachements = useSelector(
    ({ devis_achat }) => devis_achat.devis.attachements
  );
  const attachements_deleted = useSelector(
    ({ devis_achat }) => devis_achat.devis.attachements_deleted
  );
  const table_compare = useSelector(
    ({ devis_achat }) => devis_achat.devis.table_compare
  );
  const devis_copie = useSelector(
    ({ devis_achat }) => devis_achat.devis.devis_copie
  );

  const { light } = theme;
  const { history } = props;

  useEffect(() => {
    const { match } = props;
    const { devisId } = match.params;

    if (devisId === "new") {
      //dispatch(Actions.openNewDemandeAchat());
    } else {
      dispatch(Actions.getAttachments(devisId));
      dispatch(Actions.getDevisAchat(devisId));
    }
  }, [props]);

  useEffect(() => {
    setForm(devis);
    if (devis.demande_achat === null || devis.demande_achat === undefined)
      return;

    dispatch(Actions.getTableComparatoire(devis.demande_achat));
  }, [devis]);

  useEffect(() => {
    if (devis_copie === null) return;

    dispatch(
      showMessage({
        message: devis_copie.open ? "SAVE WITH OPEN" : "SAVE WITH NO OPEN",
        variant: "success",
        anchorOrigin: {
          vertical: "bottom", //top bottom
          horizontal: "right", //left center right
        },
        autoHideDuration: 1200,
      })
    );
    if (!devis_copie.open) return;
    dispatch(Actions.initDevisAchat());
    const { history, viewUrl } = props;
    history.push("/devis_achat/" + devis_copie.id + "/");
  }, [devis_copie]);

  function onSaveDevis() {
    dispatch(Actions.saveDevisAchat(form, attachements, attachements_deleted));
  }

  function onEditArticle(article) {
    dispatch(Actions.editArticle(article));
  }

  function onNegociation() {
    setForm({ ...form, statue: 2 });
  }

  function copierDevis() {
    dispatch(Actions.copierDevis(form, false));
  }
  function copierDevisEtOuvrir() {
    dispatch(Actions.copierDevis(form, true));
  }

  function onDevisSelectionChanged(devisId) {
    dispatch(Actions.initDevisAchat());
    dispatch(Actions.getDevisAchat(devisId));
    dispatch(Actions.getAttachments(devisId));
    dispatch(Actions.getTableComparatoire(form.demande_achat));
  }

  function openCompareTable() {
    setOpen(true);
  }

  const [open, setOpen] = React.useState(false);
  function addNewAttachement(attachement) {
    dispatch(Actions.addNewAttachement(attachement));
  }

  function deleteAttachement(attachement) {
    dispatch(Actions.deleteAttachement(attachement, attachements));
  }

  function onCellClicked(row, index, value) {
    let i = index;
    if (index % 2 !== 0) {
      i = index - 1;
    }
    dispatch(Actions.onSelectColumn(row, i));
  }

  function confirmation() {
    form.statue = 3;
    setForm({ ...form, statue: 3 });
    dispatch(Actions.saveDevisAchat(form, attachements, attachements_deleted));
  }
  function annulation() {
    form.statue = 4;
    setForm({ ...form, statue: 4 });
    dispatch(Actions.saveDevisAchat(form, attachements, attachements_deleted));
  }

  const onDelete = useCallback(() => {
    const { match, history } = props;

    dispatch(Actions.deleteDevis(devis.id));
    history.push("/devis_achat_collection/");
  }, [devis]);

  return (
    <Grid
      container
      spacing={2}
      style={{
        background: light.backgroundHeader,
        color: light.text,
        position: "relative",
        padding: 16,
      }}
    >
      <IconButton
        color="primary"
        component={Link}
        to="/devis_achat_collection/"
        variant="contained"
        style={{
          boxShadow: "none",
          backgroundColor: "#FB5237",
          color: "#EFF1FF",
          textTransform: "none",
          position: "absolute",
          right: "5rem",
        }}
        aria-label="add to shopping cart"
      >
        <Icon>cancel</Icon>
      </IconButton>

      <DevisAchatHeaderItem
        form={form}
        setForm={setForm}
        save={onSaveDevis}
        onNegociation={onNegociation}
        handleChange={handleChange}
        copierDevis={copierDevis}
        copierDevisEtOuvrir={copierDevisEtOuvrir}
        onDevisSelectionChanged={onDevisSelectionChanged}
        onDownloadCompareTable={openCompareTable}
        confirmation={confirmation}
        annulation={annulation}
        onDelete={onDelete}
      />

      <AppUploaderForm
        xs={12}
        md={6}
        attachements={attachements}
        addNewAttachement={addNewAttachement}
        setInForm={setInForm}
        deleteAttachement={deleteAttachement}
      />
      <DevisAchatTable
        xs={12}
        md={12}
        columns={columns}
        form={form}
        data={form.articles}
        onEditing={onEditArticle}
      />

      {table_compare && (
        <DevisAchatTableCompareDialog
          table_compare={table_compare}
          open={open}
          setOpen={setOpen}
          onCellClicked={onCellClicked}
          history={history}
        />
      )}
    </Grid>
  );
}

export default withReducer("devis_achat", reducer)(DevisAchatView);
