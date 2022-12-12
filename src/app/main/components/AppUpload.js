import { Avatar, Grid, Icon, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

function truncate(str, n) {
  if (str === null || str === undefined || str === "") return "Non Définie ...";
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}
export default function AppUpload(props) {
  const {
    attachement,
    id,
    addNewAttachement,
    deleteAttachement,
    input_accept,
  } = props;
  const [icon, setIcon] = useState("assets/images/add_file.png");

  function changePicture(event) {
    var inputTarget = event.target;
    if (inputTarget.files.length <= 0) return;

    for (let index = 0; index < inputTarget.files.length; index++) {
      const element = inputTarget.files[index];
      const ext = element.name.split(".").pop();
      let type = 3;
      if (ext === "pdf") type = 1;
      if (ext === "png" || ext === "jpg" || ext === "jpeg") type = 2;
      if (ext === "doc" || ext === "docx") type = 3;
      if (
        ext === "xlsx" ||
        ext === "xlsm" ||
        ext === "xlsb" ||
        ext === "xltx" ||
        ext === "xlx" ||
        ext === "csv"
      )
        type = 4;
      if (ext === "txt") type = 5;

      const att = {
        type: type,
        fichier: URL.createObjectURL(element),
        fichier_upload: element,
        name: element.name,
      };

      addNewAttachement(att);
    }
    // inputTarget.files.forEach((element) => {

    // });
  }
  useEffect(() => {
    if (attachement === undefined) {
      setIcon("assets/images/add_file.png");
      return;
    }
    if (attachement.type === 1) setIcon("assets/images/pdf.png");
    if (attachement.type === 2) setIcon("assets/images/image.png");
    if (attachement.type === 3) setIcon("assets/images/doc.png");
    if (attachement.type === 4) setIcon("assets/images/excel.png");
    if (attachement.type === 5) setIcon("assets/images/bloc_note.png");
  }, [attachement]);

  function openInNewTab(attachement) {
    if (attachement.empty) return;
    try {
      window.open(attachement.fichier, "_blank").focus();
    } catch (error) {}
  }

  function onDeleteAttachement(attachement) {
    if (deleteAttachement) deleteAttachement(attachement);
  }

  // accept="/*" accept="image/*"
  return (
    <Grid
      htmlFor={id}
      item
      md={2}
      style={{
        margin: "0px 10px",
        display: "flex",
        flexDirection: "column",
        justifycontent: "center",
        alignItems: "center",
      }}
    >
      <label
        htmlFor={id}
        style={{
          display: "flex",
          flexDirection: "column",
          justifycontent: "center",
          alignItems: "center",
          border: "1px #C1C1C1 dashed",
          position: "relative",

          borderRadius: 5,
          padding: 8,
          width: 86,
          height: 86,
        }}
      >
        {attachement.empty && (
          <input
            accept={input_accept || "image/*"}
            multiple
            className="hidden"
            id={id}
            type="file"
            onChange={changePicture}
          />
        )}
        {attachement.type !== 2 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifycontent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
            onClick={(e) => openInNewTab(attachement)}
          >
            <img
              htmlFor={id}
              alt="Achat"
              src={icon}
              style={{
                width: 36,
                height: 36,
                marginBottom: 6,
              }}
            />
          </div>
        )}
        {attachement.type === 2 && (
          <img
            className="max-w-none w-auto h-full"
            src={attachement.fichier}
            alt={id}
            style={{
              height: 48,
              width: 48,
              marginBottom: 6,
            }}
            onClick={(e) => openInNewTab(attachement)}
          />
        )}
        <Typography
          style={{ fontWeight: "bold", fontSize: 9, textAlign: "center" }}
        >
          {truncate(attachement.name, 20)}
        </Typography>
        {id !== "add_file" && (
          <div
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              height: 20,
              width: 20,
              borderRadius: 25,
              backgroundColor: "#e76f51",
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
            onClick={(e) => onDeleteAttachement(attachement)}
          >
            x
          </div>
        )}
      </label>
    </Grid>
  );
}
