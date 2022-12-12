import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { Link } from "react-router-dom";
import DemandeToDevisDialog from "./compenents/DemandeToDevisDialog";
import ActionDialog from "app/main/composants/ActionDialog";

function DemandeAchatHeader(props) {
  const { save, demandeToDevis, annulerDemande, form, collectionLink } = props;

  function transformerEnDevis(open) {
    demandeToDevis(open);
  }

  function cancelDemandeAchat(open) {
    //todo later statue
  }

  if (form === null || form === undefined) return "";
  return (
    form && (
      <Grid
        container
        spacing={2}
        style={{
          backgroundColor: "#F8F9FE",
          padding: 16,
          margin: 16,
          borderRadius: 8,
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <div className="flex">
            <Avatar
              alt="Achat"
              src="assets/images/demande_achat.png"
              style={{ width: 56, height: 56 }}
            />
            <div
              style={{
                marginLeft: 16,
                display: "flex",
                flexDirection: "column",
                justifycontent: "center",
              }}
            >
              <Typography style={{ fontSize: 18 }}>
                Demande Achat N°:
                <span style={{ marginLeft: 8, fontSize: 18, color: "#1265E7" }}>
                  {form.numero}
                </span>
              </Typography>

              <Typography style={{ fontSize: 10 }}>
                {"System : " + form.date_demande}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid
          container
          justify="flex-end"
          item
          xs={12}
          sm={6}
          md={8}
          lg={9}
          spacing={2}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {form.statue < 4 && (
            <Button
              variant="contained"
              style={{
                marginRight: 4,
                boxShadow: "none",
                backgroundColor: "#1265E7",
                color: "#EFF1FF",
                textTransform: "none",
                marginBottom: 4,
              }}
              onClick={save}
            >
              Sauvgarder
            </Button>
          )}
          {form.statue < 4 && (
            <DemandeToDevisDialog
              transformerEnDevis={transformerEnDevis}
              numero={form.numero}
            />
          )}
          {form.statue < 4 && (
            <ActionDialog
              label="Annuler"
              title="Annulation"
              actionOne={annulerDemande}
              labelOne="Confirmer"
              actionTwo={() => {}}
              labelTwo="Annuler"
              message={`Voulez-vous annuler cette demande ?`}
              style={{
                marginRight: 4,
                boxShadow: "none",
                backgroundColor: "#ffb703",
                color: "#283618",
                textTransform: "none",
                marginBottom: 4,
                marginTop: 0,
              }}
            />
          )}
          <Button
            component={Link}
            to={collectionLink}
            variant="contained"
            style={{
              marginRight: 4,
              boxShadow: "none",
              backgroundColor: "#FB5237",
              color: "#EFF1FF",
              textTransform: "none",
              marginBottom: 4,
            }}
          >
            Fermer
          </Button>
        </Grid>
      </Grid>
    )
  );
}

export default withReducer("demande_achat", reducer)(DemandeAchatHeader);
