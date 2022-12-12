import React, { useCallback, useEffect, useState } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import { convertToTonne } from "app/main/helpers/utils";

import {
  Button,
  Divider,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useForm } from "@fuse/hooks";

import { defaultProduit } from "./ProduitConfig";
import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import Input from "app/main/composants/inputs/Input";
import Header from "app/main/composants/view/Header";

import { getDate, getTime } from "app/main/helpers/utils";

const Title = ({ style, symbole }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Produit °</span> {symbole}
  </Typography>
);

const SubTitle = ({ cloture }) => <Typography></Typography>;

function ProduitView(props) {
  const { match, history } = props;
  const dispatch = useDispatch();
  const { form, handleChange, setForm, setInForm } = useForm(defaultProduit);

  const [openDetails, setOpentDetails] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(undefined);

  const produit = useSelector(
    ({ production_produit }) => production_produit.produit
  );

  useEffect(() => {
    const { produitId } = match.params;
    if (produitId === "nouveau") {
      dispatch(Actions.setNewProduit());
    } else {
      dispatch(Actions.getProduit(produitId));
    }
  }, [match]);

  useEffect(() => {
    setForm(produit);
  }, [produit]);

  const saveProduit = useCallback(
    (event) => {
      dispatch(Actions.saveProduit(form)).then((result) => {
        history.push(`/production-produits/`);
      });
    },
    [form]
  );

  const deleteProduit = useCallback(
    (event) => {
      dispatch(Actions.deleteProduit(form)).then((result) => {
        history.push(`/production-produits/`);
      });
    },
    [form]
  );

  return (
    <div style={styles.container}>
      <Grid container>
        {/* header */}
        <Header
          style={styles}
          icon="assets/images/app_production/pallets.png"
          onBackClicked={(e) => {
            history.push(`/production-produits/`);
          }}
          title={<Title style={styles} symbole={form.symbole} />}
          hint={<SubTitle />}
          onSave={saveProduit}
          onDelete={deleteProduit}
        />
        {/* header */}

        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={styles.boxContainer}
        >
          <Grid container style={styles.box}>
            <Input
              grid={{ xs: 12 }}
              name="designation"
              placeholder="designation"
              label="Désignation"
              handleChange={handleChange}
              value={form.designation}
              style={{}}
            />

            <Input
              grid={{ xs: 12 }}
              name="symbole"
              placeholder="symbole"
              label="Symbole"
              handleChange={handleChange}
              value={form.symbole}
              style={{}}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={styles.boxContainer}
        >
          <Grid container style={styles.box}>
            <Input
              grid={{ xs: 12 }}
              name="qte_initial"
              placeholder="qte_initial"
              label="Qté Initial"
              handleChange={handleChange}
              value={form.qte_initial}
              style={{}}
              type="number"
            />

            <Grid
              item
              xs={12}
              style={{
                ...styles.selector,
                paddingTop: 5,
                display: "flex",
                justifycontent: "space-between",
              }}
            >
              <div>
                <Typography style={{ fontWeight: "bold" }}>
                  Qté Stock (Pieces)
                </Typography>
                <Typography style={{ color: "#e76f51", fontWeight: "bold" }}>
                  {form.qte_stock}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={styles.boxContainer}
        >
          <Grid container style={styles.box}>
            <Input
              grid={{ xs: 12 }}
              name="nbr_piece_wagon"
              placeholder="nbr_piece_wagon"
              label="Pieces/Wagon"
              handleChange={handleChange}
              value={form.nbr_piece_wagon}
              style={{}}
              type="number"
            />
            <Input
              grid={{ xs: 12 }}
              name="nbr_piece_palette_production"
              placeholder="nbr_piece_palette_production"
              label="Pieces/Pt Production"
              handleChange={handleChange}
              value={form.nbr_piece_palette_production}
              style={{}}
              type="number"
            />
            <Input
              grid={{ xs: 12 }}
              name="nbr_piece_palette_emballage"
              placeholder="nbr_piece_palette_emballage"
              label="Pieces/Pt Emballage"
              handleChange={handleChange}
              value={form.nbr_piece_palette_emballage}
              style={{}}
              type="number"
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={styles.boxContainer}
        >
          <Grid container style={styles.box}>
            <Input
              grid={{ xs: 12 }}
              name="poids"
              placeholder="poids"
              label="Poids"
              handleChange={handleChange}
              value={form.poids}
              style={{}}
              type="number"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withReducer("production_produit", reducer)(ProduitView);
