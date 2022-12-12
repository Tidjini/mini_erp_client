import React, { useCallback, useEffect } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { useForm } from "@fuse/hooks";

import { defaultItem } from "./PosteConfig";
import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import Input from "app/main/composants/inputs/Input";
import Header from "app/main/composants/view/Header.v2";
import AppInputSelector from "app/main/components/AppInputSelector";

const Title = ({ style, intitule }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Poste °</span> {intitule}
  </Typography>
);

function PosteView(props) {
  const { match, history } = props;
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(defaultItem);

  const poste = useSelector(({ production_poste }) => production_poste.poste);

  useEffect(() => {
    const { posteId } = match.params;
    if (posteId === "nouveau") {
      dispatch(Actions.setNewPoste());
    } else {
      dispatch(Actions.getPoste(posteId));
    }
  }, [match]);

  useEffect(() => {
    if (poste.intitule === "") {
      setForm(defaultItem);
    } else {
      setForm(poste);
    }
  }, [poste]);

  const savePoste = useCallback(
    (event) => {
      dispatch(Actions.savePoste(form)).then((result) => {
        history.push(`/production-postes/`);
      });
    },
    [form]
  );

  const deletePoste = useCallback(
    (event) => {
      dispatch(Actions.deletePoste(form)).then((result) => {
        history.push(`/production-postes/`);
      });
    },
    [form]
  );

  return (
    <div style={styles.container}>
      <Grid container>
        <Header
          style={styles}
          icon="assets/images/man.png"
          onBackClicked={(e) => {
            history.push(`/production-postes/`);
          }}
          title={<Title style={styles} intitule={form.intitule} />}
          onSave={savePoste}
          onDelete={deletePoste}
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
              name="intitule"
              placeholder="intitule"
              label="intitule"
              handleChange={handleChange}
              value={form.intitule}
              style={{}}
            />

            <Grid xs={12} style={{ padding: 5 }}>
              <AppInputSelector
                label="PERIODE"
                name="periode"
                placeholder="periode"
                type="text"
                items={[
                  { value: "JOUR", display: "JOUR" },
                  { value: "NUIT", display: "NUIT" },
                ]}
                value={form.periode}
                handleChange={handleChange}
              />
            </Grid>

            <Input
              grid={{ xs: 12 }}
              name="nbr_heure"
              placeholder="nbr_heure"
              label="nombre heure"
              handleChange={handleChange}
              value={form.nbr_heure}
              style={{}}
              type="number"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withReducer("production_poste", reducer)(PosteView);
