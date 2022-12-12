import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Card,
} from "@material-ui/core";
import { wordElipsis } from "app/composants/utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AppDossier(props) {
  const { dossier, openFolder } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onOpenFolder = () => {
    openFolder(dossier.database_name);
    setOpen(false);
  };

  return (
    <div>
      <Card
        style={{
          minHeight: 56,
          margin: 10,
          background: "#edf6f9",
          borderRadius: 5,
          padding: 10,
          cursor: "pointer",
        }}
        onClick={handleClickOpen}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            alt="state"
            src={"assets/images/compta/folder_close.png"}
            style={{
              width: 24,
              height: 26,
            }}
          />
          <div
            style={{
              marginLeft: 10,
            }}
          >
            <h4
              style={{
                fontSize: 12,
                marginLeft: 5,
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              {dossier.entreprise}
            </h4>
            <h4
              style={{
                fontSize: 11,
                marginLeft: 5,
                fontWeight: "400",
              }}
            >
              {wordElipsis(dossier.address, 40)}
            </h4>
          </div>
        </div>
      </Card>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">Ouvrir le dossier</DialogTitle> */}
        <DialogContent>
          <div
            style={{
              minHeight: 100,
              width: 400,
              borderRadius: 5,
              padding: 5,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                <h4
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    fontWeight: "400",
                  }}
                >
                  Dossier
                </h4>
                <h4
                  style={{
                    fontSize: 18,
                    marginLeft: 5,
                    fontWeight: "bold",
                  }}
                >
                  {dossier.entreprise}
                </h4>
                <h4
                  style={{
                    fontSize: 11,
                    marginLeft: 5,
                    fontWeight: "400",
                  }}
                >
                  {wordElipsis(dossier.address, 500)}
                </h4>
                <h4
                  style={{
                    fontSize: 14,
                    marginLeft: 5,
                    marginTop: 20,
                    fontWeight: "400",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    {"Base de Donnée:     "}
                  </span>
                  {dossier.database_name}
                </h4>
              </div>

              <img
                alt="state"
                src={"assets/images/compta/folder_open.png"}
                style={{
                  width: 86,
                  height: 86,
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onOpenFolder}
            style={{
              marginRight: 4,
              boxShadow: "none",
              backgroundColor: "#0a9396",
              color: "#EFF1FF",
              textTransform: "none",
              marginBottom: 4,
            }}
          >
            Ouvrir le dossier
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
