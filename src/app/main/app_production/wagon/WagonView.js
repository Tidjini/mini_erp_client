import React, { useCallback, useEffect } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { useForm } from "@fuse/hooks";

import { defaultItem } from "./WagonConfig";
import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import Input from "app/main/composants/inputs/Input";
import Header from "app/main/composants/view/Header.v2";

const Title = ({ style, numero }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Wagon °</span> {numero}
  </Typography>
);

function WagonView(props) {
  const { match, history } = props;
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(defaultItem);

  const wagon = useSelector(({ production_wagon }) => production_wagon.wagon);

  useEffect(() => {
    const { wagonId } = match.params;
    if (wagonId === "nouveau") {
      dispatch(Actions.setNewWagon());
    } else {
      dispatch(Actions.getWagon(wagonId));
    }
  }, [match]);

  useEffect(() => {
    if (wagon.numero !== "") {
      setForm(wagon);
    } else {
      setForm(wagon);
    }
  }, [wagon]);

  const saveWagon = useCallback(
    (event) => {
      dispatch(Actions.saveWagon(form)).then((result) => {
        history.push(`/production-wagons/`);
      });
    },
    [form]
  );

  const deleteWagon = useCallback(
    (event) => {
      dispatch(Actions.deleteWagon(form)).then((result) => {
        history.push(`/production-wagons/`);
      });
    },
    [form]
  );

  return (
    <div style={styles.container}>
      <Grid container>
        <Header
          style={styles}
          icon="assets/images/app_production/wagon.png"
          onBackClicked={(e) => {
            history.push(`/production-wagons/`);
          }}
          title={<Title style={styles} symbole={form.symbole} />}
          onSave={saveWagon}
          onDelete={deleteWagon}
        />

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
              name="numero"
              placeholder="numero"
              label="Numero"
              handleChange={handleChange}
              value={form.numero}
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
              name="phase_actuel"
              placeholder="phase_actuel"
              label="Phase Actuel"
              handleChange={handleChange}
              value={form.phase_actuel}
              style={{}}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withReducer("production_wagon", reducer)(WagonView);
