import React, { useCallback, useEffect } from "react";

import {
  list,
  retrieve,
  save,
} from "app/services/infrabitumService/ActionService";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Icon, IconButton, Typography } from "@material-ui/core";
import { useForm } from "@fuse/hooks";

import { defaultItem } from "../ProductionConfig";
import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import WagonList from "./WagonList";
import WagonAnomalie from "./WagonAnomalie";

import Input from "app/main/composants/inputs/Input";
import AppSelector from "app/composants/inputs/AppSelector";
import Button from "app/main/composants/base/Button";

const Title = ({ style }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Production</span>
  </Typography>
);

export default function ProductionViewHeder(props) {
  const { match, history } = props;
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(defaultItem);

  const postes = useSelector(
    ({ production_production }) => production_production.poste.results
  );
  const equipes = useSelector(
    ({ production_production }) => production_production.equipe.results
  );
  const responsables = useSelector(
    ({ production_production }) => production_production.responsable.results
  );
  const production = useSelector(
    ({ production_production }) => production_production.production
  );
  const wagons = useSelector(
    ({ production_production }) => production_production.wagon
  );

  useEffect(() => {
    if (production.id === "") setForm(defaultItem);
    else {
      setForm(production);
    }
  }, [production]);

  useEffect(() => {
    const { production_id } = match.params;
    dispatch(
      list("PRODUCTION-RESPONSABLE", "gestion/employees", 1, {
        service__service: "Production",
      })
    );
    dispatch(list("PRODUCTION-POSTE", "production/postes", 1));
    dispatch(list("PRODUCTION-EQUIPE", "production/equipes", 1));

    if (production_id === "nouveau") {
      dispatch(
        retrieve("PRODUCTION", "production/productions", "nouveau", defaultItem)
      );
    } else {
      dispatch(retrieve("PRODUCTION", "production/productions", production_id));
    }
  }, [match]);

  const saveProduction = useCallback(
    (event) => {
      const data = { ...form, date: form.date.substring(0, 10) };
      dispatch(save("production", "production/productions", data)).then(
        (result) => {
          dispatch(retrieve("PRODUCTION", "production/productions", result.id));
        }
      );
    },
    [form]
  );

  return (
    <div style={styles.container}>
      <Grid container>
        <Grid
          style={{
            borderRadius: 10,
            backgroundColor: "black",
          }}
          container
          direction="row"
          justifycontent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid item container alignItems="center" sm={12} md={6} lg={3} xl={2}>
            <IconButton
              aria-haspopup="true"
              onClick={(e) => {
                history.push(`/productions/`);
              }}
            >
              <Icon
                color="action"
                className="text-24"
                style={{ color: "white" }}
              >
                arrow_back
              </Icon>
            </IconButton>
            <img
              alt="state"
              src={"assets/images/bloc_note.png"}
              style={{ width: 36, height: 36 }}
            />
            <Title style={styles} date={form.date} />
          </Grid>

          <Grid item xs={6} sm={3} md={2} lg={1}>
            <Button onClick={saveProduction}>Sauvgarder</Button>
          </Grid>
          {wagons && (
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <WagonList />
            </Grid>
          )}
          <Grid item xs={6} sm={4} md={3} lg={1}>
            <WagonAnomalie />
          </Grid>
        </Grid>

        <Grid item container xs={12} style={styles.boxContainer}>
          <Grid container style={styles.box}>
            <Input
              grid={{ xs: 4 }}
              name="intitule"
              label="Intitule"
              format="DD/MM/YYYY"
              handleChange={handleChange}
              value={form.intitule}
              style={{}}
            />
            <Input
              grid={{ xs: 1 }}
              name="objectif"
              label="Objectif"
              format="DD/MM/YYYY"
              handleChange={handleChange}
              value={form.objectif}
              style={{}}
            />
            <Input
              grid={{ xs: 1 }}
              name="date"
              type="date"
              label="date"
              format="DD/MM/YYYY"
              handleChange={handleChange}
              value={form.date.substring(0, 10)}
              style={{}}
            />

            <Grid item xs={2}>
              <AppSelector
                name="poste"
                label="Poste"
                value={form.poste}
                options={postes}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginLeft: 5, marginTop: 7 }}
              />
            </Grid>
            <Grid item xs={2}>
              <AppSelector
                name="equipe"
                label="equipe"
                value={form.equipe}
                options={equipes}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginLeft: 5, marginTop: 7 }}
              />
            </Grid>
            <Grid item xs={2}>
              <AppSelector
                name="responsable"
                label="Responsable"
                value={form.responsable}
                options={responsables}
                handleChange={handleChange}
                height={28}
                horizontal={false}
                width={"auto"}
                style={{ marginLeft: 5, marginTop: 7 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
