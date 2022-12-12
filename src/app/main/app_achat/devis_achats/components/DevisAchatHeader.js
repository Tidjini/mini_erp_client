import {
  Avatar,
  Button,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React from "react";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";

function DevisAchatHeader(props) {
  const { save, demandeToDevis, form, setForm, collectionLink } = props;

  function onNegociation(event) {
    if (form.statue < 2) setForm({ ...form, statue: 2 });
  }
  function reponseRecus(event) {
    if (form.statue < 3) setForm({ ...form, statue: 3 });
  }
  function transformerEnDevis(open) {
    //demandeToDevis(open);
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
              src="assets/images/devis_achat.png"
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
                Devis Achat N°:
                <span style={{ marginLeft: 8, fontSize: 18, color: "#1265E7" }}>
                  {form.numero}
                </span>
              </Typography>

              <Typography style={{ fontSize: 10 }}>
                {"System : " + form.date_devis}
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
        ></Grid>
      </Grid>
    )
  );
}

export default withReducer("demande_achat", reducer)(DevisAchatHeader);
