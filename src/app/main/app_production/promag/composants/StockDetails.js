import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Slide,
  Typography,
} from "@material-ui/core";
import StockDetailsItem from "./StockDetailsItem";
import * as Actions from "../store/actions";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import { useDispatch, useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function StockDetails(props) {
  const { stock } = props;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      dispatch(Actions.getProduitCollection());
    }
  }, [open]);

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleNextOperation = (produit) => {
    setOpen(false);
  };

  const produits = useSelector(
    ({ production_main }) => production_main.produits.results
  );

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const ps = [];
    produits.map((produit) => {
      const pt = ~~(produit.qte_stock / produit.nbr_piece_palette_emballage);
      const pieces = produit.qte_stock % produit.nbr_piece_palette_emballage;

      ps.push({
        libelle: produit.designation,
        short: produit.symbole,
        qte_pt: pt,
        qte_piece: pieces,
        casse_int: 0,
        casse_ext: 0,
        EXPEDITION: 0,
        rest_pt: 0,
        rest_piece: 0,
      });
    });
    setProducts(ps);
  }, [produits]);

  return (
    <div>
      <Button
        variant="contained"
        style={{
          marginLeft: 20,
          boxShadow: "none",
          backgroundColor: "#264653",
          color: "#EFF1FF",
          height: 28,
          fontSize: 12,
          textTransform: "none",
        }}
        onClick={handleClickOpen}
      >
        STOCKS
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  alt="Stock"
                  src={`assets/images/app_production/packages.png`}
                  style={{ width: 24, height: 24, marginRight: 10 }}
                />
                <Typography
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Zone de stock
                </Typography>
              </div>
            </Grid>

            <Divider style={{ height: 0.8, width: "100%", marginBottom: 10 }} />

            <Grid container justify="center" spacing={2}>
              {products &&
                products.map((p) => (
                  <Grid
                    item
                    xs={3}
                    style={{ display: "flex", justifycontent: "center" }}
                  >
                    <StockDetailsItem produit={p} />
                  </Grid>
                ))}
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withReducer("production_main", reducer)(StockDetails);
