import React, { useEffect } from "react";
import { theme } from "app/main/components/AppTheme";
import { Grid } from "@material-ui/core";
import DemandeAchatHeader from "./DemandeAchatHeader";
import DemandeAchatLeftForm from "./DemandeAchatLeftForm";
import AppUploaderForm from "app/main/components/AppUploaderForm";
import DemandeAchatTable from "./compenents/DemandeAchatTable";
import { columns, defaultData } from "./DemandeAchatConfig";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useForm } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "app/store/actions/fuse";

function DemandeAchat(props) {
  const dispatch = useDispatch();

  const { light } = theme;

  const demande = useSelector(
    ({ demande_achat }) => demande_achat.demande.demande
  );
  const error = useSelector(({ demande_achat }) => demande_achat.demande.error);
  const attachements = useSelector(
    ({ demande_achat }) => demande_achat.demande.attachements
  );

  const attachements_deleted = useSelector(
    ({ demande_achat }) => demande_achat.demande.attachements_deleted
  );
  const devis = useSelector(({ demande_achat }) => demande_achat.demande.devis);

  const { form, handleChange, setForm, setInForm } = useForm(defaultData);

  useEffect(() => {
    if (error === "") return;
    dispatch(
      showMessage({
        message: error,
        variant: "error",
        anchorOrigin: {
          vertical: "bottom", //top bottom
          horizontal: "right", //left center right
        },
        autoHideDuration: 1200,
      })
    );
    dispatch(Actions.initError());
  }, [error]);

  useEffect(() => {
    if (devis === null) return;
    dispatch(
      showMessage({
        message: devis.open ? "SAVE WITH OPEN" : "SAVE WITH NO OPEN",
        variant: "success",
        anchorOrigin: {
          vertical: "bottom", //top bottom
          horizontal: "right", //left center right
        },
        autoHideDuration: 1200,
      })
    );
    const { history } = props;
    history.push("/devis_achat/" + devis.id + "/");
  }, [devis]);

  useEffect(() => {
    setForm(demande);
  }, [demande]);

  useEffect(() => {}, [attachements]);

  useEffect(() => {
    function updateDemandeState() {
      const { match } = props;
      const { demandeId } = match.params;

      if (demandeId === "new") {
        dispatch(Actions.openNewDemandeAchat());
      } else {
        dispatch(Actions.getAttachments(demandeId));
        dispatch(Actions.getDemandeAchat(demandeId));
      }
    }

    updateDemandeState();
  }, []);

  function addNewAttachement(attachement) {
    dispatch(Actions.addNewAttachement(attachement));
  }

  function saveDemandeAchat() {
    dispatch(
      Actions.saveDemandeAchat(form, attachements, attachements_deleted)
    );
  }

  function onEditArticle(article) {
    dispatch(Actions.editArticle(article));
  }

  function demandeToDevis(open) {
    dispatch(Actions.demandeToDevis(form, open));
  }

  function cancelDemande() {
    dispatch(Actions.annulerDemande(form));
  }

  function deleteAttachement(attachement) {
    dispatch(Actions.deleteAttachement(attachement, attachements));
  }

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
      <DemandeAchatHeader
        form={form}
        setForm={setForm}
        save={saveDemandeAchat}
        demandeToDevis={demandeToDevis}
        annulerDemande={cancelDemande}
        collectionLink={"/demande_achat_collection/"}
      />
      <DemandeAchatLeftForm
        handleChange={handleChange}
        form={form}
        setInForm={setInForm}
        setForm={setForm}
        md={7}
      />
      <AppUploaderForm
        xs={12}
        md={4}
        attachements={attachements}
        addNewAttachement={addNewAttachement}
        setInForm={setInForm}
        deleteAttachement={deleteAttachement}
      />

      <DemandeAchatTable
        xs={12}
        md={10}
        columns={columns}
        form={form}
        data={form.articles}
        onEditing={onEditArticle}
      />
    </Grid>
  );
}

export default withReducer("demande_achat", reducer)(DemandeAchat);
