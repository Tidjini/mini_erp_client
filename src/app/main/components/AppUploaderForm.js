import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { theme } from "./AppTheme";
import AppUpload from "./AppUpload";

export default function AppUploaderForm(props) {
  const { xs, md, addNewAttachement, attachements, deleteAttachement } = props;

  return (
    <Grid
      container
      item
      xs={xs}
      md={md}
      spacing={1}
      style={{
        backgroundColor: "#F8F9FE",
        padding: 16,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 8,
        alignSelf: "start",
      }}
    >
      <Typography
        lg={12}
        style={{
          color: theme.light.text,
          fontSize: 16,
          fontWeight: "600",
          width: "100%",
          height: 48,
          marginLeft: 16,
          verticalAlign: "center",
        }}
      >
        Attachements
      </Typography>
      {attachements.map((att, index) => (
        <AppUpload
          key={index}
          attachement={att}
          id={att.id}
          deleteAttachement={deleteAttachement}
        />
      ))}

      <AppUpload
        id={"add_file"}
        addNewAttachement={addNewAttachement}
        attachement={{ type: "file", name: "Ajouter Fichier", empty: true }}
        attachements={attachements}
      />
    </Grid>
  );
}
