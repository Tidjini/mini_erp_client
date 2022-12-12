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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AppExercice(props) {
  const { exercice, openExercice, isActive } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onOpenExercice = () => {
    openExercice(exercice.id);
    setOpen(false);
  };

  return (
    <div>
      <Card
        style={{
          minHeight: 56,
          margin: 10,
          background: isActive ? "#D4EDE6" : "#BBDAF1",
          borderRadius: 5,
          padding: 10,
          cursor: isActive ? "default" : "pointer",
          boxShadow: "none",
          borderColor: isActive ? "#34a0a4" : "#168aad",
          borderWidth: 1,
        }}
        onClick={isActive ? undefined : handleClickOpen}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            alt="state"
            src={
              isActive
                ? "assets/images/compta/exercice_open.png"
                : "assets/images/compta/exercice.png"
            }
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
              {exercice.intitule}
            </h4>
            <h4
              style={{
                fontSize: 13,
                marginLeft: 5,
                fontWeight: "700",
                fontStyle: "italic",
              }}
            >
              {exercice.annee}
              <span
                style={{
                  fontSize: 11,
                  marginLeft: 10,
                  fontWeight: "400",
                }}
              >
                du: {exercice.debut} au: {exercice.fin}
              </span>
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
                  Exercice
                </h4>
                <h4
                  style={{
                    fontSize: 18,
                    marginLeft: 5,
                    fontWeight: "bold",
                  }}
                >
                  {exercice.intitule}
                </h4>
                <h4
                  style={{
                    fontSize: 11,
                    marginLeft: 5,
                    fontWeight: "400",
                  }}
                >
                  {exercice.annee}
                </h4>
                <h4
                  style={{
                    fontSize: 13,
                    marginLeft: 5,
                    marginTop: 25,
                    fontWeight: "700",
                    fontStyle: "italic",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: "400",
                    }}
                  >
                    du: {exercice.debut} au: {exercice.fin}
                  </span>
                </h4>
              </div>

              <img
                alt="state"
                src={"assets/images/compta/exercice.png"}
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
            onClick={onOpenExercice}
            style={{
              marginRight: 4,
              boxShadow: "none",
              backgroundColor: "#0a9396",
              color: "#EFF1FF",
              textTransform: "none",
              marginBottom: 4,
            }}
          >
            Ouvrir l'Exercice
          </Button>
          {/* <Button onClick={handleClose}>Annuler</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
