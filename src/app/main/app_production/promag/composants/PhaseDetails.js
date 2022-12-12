import React, { useEffect, useState } from "react";

import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Slide,
  Typography,
} from "@material-ui/core";
import Wagon from "./Wagon";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PhaseDetails(props) {
  const {
    buttonStyle,
    list,
    onSelectWagon,
    onUnselectWagon,
    onSelectAll,
    onUnselectAll,
    nextOperation,
    title,
    icon,
    titleStyle,
    phase,
    width,
  } = props;

  const produits = useSelector(
    ({ production_main }) => production_main.produits
  );

  const [open, setOpen] = useState(false);
  const [empty, setEmpty] = useState([]);

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleNextOperation = (produit) => {
    nextOperation(produit);
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          marginRight: 4,
          boxShadow: "none",
          backgroundColor: "#467D2B",
          color: "#EFF1FF",
          textTransform: "none",
          marginBottom: 4,
          marginTop: 4,
          ...buttonStyle,
        }}
        onClick={handleClickOpen}
      >
        Détails
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent>
          <div>
            <Grid
              item
              xs={12}
              style={{
                padding: 10,
              }}
            >
              <div style={titleStyle}>
                <img
                  alt={title}
                  src={`assets/images/app_production/${icon}`}
                  style={{ width: 24, height: 24, marginRight: 10 }}
                />
                <Typography style={{ fontSize: 16, fontWeight: "600" }}>
                  {title}
                </Typography>
              </div>

              <Grid
                container
                style={{
                  display: "flex",
                  border: "2px solid #264653",
                  margin: "10px 0",
                  minHeight: 56,
                }}
              >
                {list.map((wagon, index) => (
                  <Wagon
                    numero={wagon.numero}
                    key={index}
                    operation={wagon.phase_actuel}
                    produit={wagon.produit_object}
                    onSelectWagon={onSelectWagon}
                    onUnselectWagon={onUnselectWagon}
                    nextOperation={nextOperation}
                    selected={wagon.selected}
                  />
                ))}
              </Grid>
              {/* </FuseAnimateGroup> */}
            </Grid>
            <Divider style={{ height: 0.8, width: "100%", marginBottom: 10 }} />
            <Button
              variant="contained"
              style={{
                marginLeft: 20,
                boxShadow: "none",
                backgroundColor: "#2a9d8f",
                color: "#EFF1FF",
                height: 28,
                fontSize: 12,
                textTransform: "none",
              }}
              onClick={onSelectAll}
            >
              Selectioner Tous
            </Button>
            <Button
              variant="contained"
              style={{
                marginLeft: 20,
                boxShadow: "none",
                backgroundColor: "#fca311",
                color: "#EFF1FF",
                height: 28,
                fontSize: 12,
                textTransform: "none",
              }}
              onClick={onUnselectAll}
            >
              Déselectionner tout
            </Button>
            {phase === "ATTENTE" &&
              produits &&
              produits.results.map((produit, index) => (
                <Button
                  key={index}
                  variant="contained"
                  style={{
                    marginLeft: 20,
                    boxShadow: "none",
                    backgroundColor: "#1d3557",
                    color: "#EFF1FF",
                    height: 28,
                    fontSize: 12,
                    textTransform: "none",
                  }}
                  onClick={(e) => {
                    handleNextOperation(produit.id);
                  }}
                >
                  {produit.designation}
                </Button>
              ))}

            {phase === "EMPILEMENT" && (
              <Button
                variant="contained"
                style={{
                  marginLeft: 20,
                  boxShadow: "none",
                  backgroundColor: "#bb3e03",
                  color: "#EFF1FF",
                  height: 28,
                  fontSize: 12,
                  textTransform: "none",
                }}
                onClick={(e) => {
                  handleNextOperation(null);
                }}
              >
                Enfournement
              </Button>
            )}
            {phase === "ENFOURNEMENT" && (
              <Button
                variant="contained"
                style={{
                  marginLeft: 20,
                  boxShadow: "none",
                  backgroundColor: "#ee9b00",
                  color: "#EFF1FF",
                  height: 28,
                  fontSize: 12,
                  textTransform: "none",
                }}
                onClick={(e) => {
                  handleNextOperation(null);
                }}
              >
                Défournement
              </Button>
            )}
            {phase === "DEFOURNEMENT" && (
              <Button
                variant="contained"
                style={{
                  marginLeft: 20,
                  boxShadow: "none",
                  backgroundColor: "#f77f00",
                  color: "#EFF1FF",
                  height: 28,
                  fontSize: 12,
                  textTransform: "none",
                }}
                onClick={(e) => {
                  handleNextOperation(null);
                }}
              >
                Emballage
              </Button>
            )}
            {phase === "EMBALLAGE" && (
              <Button
                variant="contained"
                style={{
                  marginLeft: 20,
                  boxShadow: "none",
                  backgroundColor: "#f77f00",
                  color: "#EFF1FF",
                  height: 28,
                  fontSize: 12,
                  textTransform: "none",
                }}
                onClick={(e) => {
                  handleNextOperation(undefined);
                }}
              >
                Stockage
              </Button>
            )}
            {phase !== "ATTENTE" && (
              <Button
                variant="contained"
                style={{
                  marginLeft: 20,
                  boxShadow: "none",
                  backgroundColor: "#1d3557",
                  color: "#EFF1FF",
                  height: 28,
                  fontSize: 12,
                  textTransform: "none",
                }}
              >
                Annuler
              </Button>
            )}
            {phase !== "ATTENTE" && (
              <Button
                variant="contained"
                style={{
                  marginLeft: 20,
                  boxShadow: "none",
                  backgroundColor: "#6b705c",
                  color: "#EFF1FF",
                  height: 28,
                  fontSize: 12,
                  textTransform: "none",
                }}
              >
                Casse
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withReducer("production_main", reducer)(PhaseDetails);
