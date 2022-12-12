import React, { useCallback, useEffect, useState } from "react";

import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

import { convertToTonne } from "app/main/helpers/utils";

import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useForm } from "@fuse/hooks";

import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import Input from "app/main/composants/inputs/Input";
import Header from "app/main/composants/view/Header";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";
import Transition from "app/main/helpers/Transition";
import DateTimeInput from "app/main/composants/inputs/DateTimeInput";
import AppSelector from "app/composants/inputs/AppSelector";

import { getDate, getTime } from "app/main/helpers/utils";

const Title = ({ style, date_debut }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Expédi</span>tion
  </Typography>
);

const SubTitle = ({ cloture }) => <Typography></Typography>;

function ExpeditionDialog(props) {
  const { poste, responsable, date, equipe } = props;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { form, handleChange, setForm, setInForm } = useForm({
    id: "",
    produit: null,
    equipe: "",
    responsable: null,
    poste: "",
    date: "",
    nbr_piece: 0.0,
    nbr_palette: 0.0,
    produit_object: null,
    responsable_object: null,
  });

  const expedition = useSelector(
    ({ production_main }) => production_main.expedition
  );
  const produits = useSelector(
    ({ production_main }) => production_main.produits.results
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setForm({
      ...form,
      id: "",
      nbr_piece: 0.0,
      nbr_palette: 0.0,
      poste: poste,
      date: date,
      equipe: equipe,
      responsable: responsable,
    });
  }, [poste, responsable, date, equipe]);

  useEffect(() => {
    const prds = [];
    let def = null;
    produits.map((p) => {
      prds.push({ display: p.designation, value: p.id });
    });
    if (prds.length > 0) {
      def = prds[0].value;
    }

    setForm({
      ...form,
      produit: def,
    });

    setProducts(prds);
  }, [produits]);

  const saveExpedition = useCallback(
    (event) => {
      dispatch(Actions.saveExpedition(form)).then((result) => {
        setOpen(false);
      });
    },
    [form]
  );
  const saveExpeditionNew = useCallback(
    (event) => {
      dispatch(Actions.saveExpedition(form)).then((result) => {
        setOpen(false);
        setTimeout(() => {
          setOpen(true);
        }, 200);
      });
    },
    [form]
  );
  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          marginLeft: 20,
          boxShadow: "none",
          backgroundColor: "#e5e5e5",
          color: "#264653",
          height: 28,
          fontSize: 12,
          textTransform: "none",
        }}
        onClick={handleClickOpen}
      >
        Expeditions
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <Grid container>
            <Header
              style={styles}
              icon="assets/images/app_production/expedition.png"
              onBackClicked={handleClose}
              title={<Title style={styles} date_debut={form.date_debut} />}
              hint={<SubTitle />}
              onSave={saveExpedition}
              onSaveAndNew={saveExpeditionNew}
            />
            {/* header */}

            <Grid item container xs={12} sm={6} style={styles.boxContainer}>
              <Grid container style={styles.box}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{ ...styles.input, paddingTop: 5 }}
                >
                  <AppSelector
                    name="produit"
                    label="produit"
                    value={form.produit}
                    options={products}
                    handleChange={handleChange}
                    height={28}
                    horizontal={false}
                    width={"auto"}
                    style={{ marginLeft: 5 }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={6} style={styles.boxContainer}>
              <Grid container style={styles.box}>
                <Input
                  grid={{ xs: 12, sm: 6 }}
                  name="nbr_palette"
                  placeholder="nbr_palette"
                  label="Qté Palette"
                  handleChange={handleChange}
                  value={form.nbr_palette}
                  style={{}}
                  type="number"
                />
                <Input
                  grid={{ xs: 12, sm: 6 }}
                  name="nbr_piece"
                  placeholder="nbr_piece"
                  label="Qté Pieces"
                  handleChange={handleChange}
                  value={form.nbr_piece}
                  style={{}}
                  type="number"
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withReducer("production_main", reducer)(ExpeditionDialog);
