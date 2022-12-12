import React, { useState } from "react";

import { useSelector } from "react-redux";

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
import PhaseActions from "./PhaseActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PhaseDetails(props) {
  const {
    buttonStyle,
    list,
    onSelectWagon,
    onUnselectWagon,
    onSelectAll,
    onUnselectAll,
    nextOperation,
    previousOperation,
    title,
    icon,
    titleStyle,
    phase,
  } = props;

  const produits = useSelector(
    ({ production_production }) => production_production.produits
  );

  const [open, setOpen] = useState(false);
  // const [empty, setEmpty] = useState([]);

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
  const handlePreviousOperation = () => {
    previousOperation();
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
                    produit={wagon.produit}
                    produit_designation={wagon.produit_designation}
                    onSelectWagon={onSelectWagon}
                    onUnselectWagon={onUnselectWagon}
                    nextOperation={nextOperation}
                    previousOperation={previousOperation}
                    selected={wagon.selected}
                  />
                ))}
              </Grid>
              {/* </FuseAnimateGroup> */}
            </Grid>
            <Divider style={{ height: 0.8, width: "100%", marginBottom: 10 }} />
            <PhaseActions
              onSelectAll={onSelectAll}
              onUnselectAll={onUnselectAll}
              phase={phase}
              produits={produits}
              handleNextOperation={handleNextOperation}
              handlePreviousOperation={handlePreviousOperation}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
