import React from "react";
import { Grid, Typography } from "@material-ui/core";
import DemandeAchat from "./composants/DemandeAchat";
import DevisAchat from "./composants/DevisAchat";
import CommandeAchat from "./composants/CommandeAchat";
import Header from "app/main/composants/view/Header.v2";
import { viewStyles as styles } from "app/main/hooks/ViewStyles";

import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import reducer from "./store/reducer";
import withReducer from "app/store/withReducer";
import ItemMode from "./composants/ItemMode";
import Statistique1 from "app/main/composants/statistique/Statistique1";
import Statistique2 from "app/main/composants/statistique/Statistique2";
import Statistique3 from "app/main/composants/statistique/Statistique3";

import { chartOprtions } from "./Config";

import Production from "./composants/Production";
import Arrets from "./composants/Arrets";
import Stock from "./composants/Stock";

function Dashboard(props) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(Actions.demandeStatistics());
    dispatch(Actions.devisStatistics());
    dispatch(Actions.commandeStatistics());
    dispatch(Actions.productionStatistics());
  }, []);

  const commandeDays = useSelector(
    ({ app_dashboard }) => app_dashboard.commande.days
  );
  const commandeWeeks = useSelector(
    ({ app_dashboard }) => app_dashboard.commande.weeks
  );

  const commandeMonths = useSelector(
    ({ app_dashboard }) => app_dashboard.commande.months
  );

  const modes = useSelector(
    ({ app_dashboard }) => app_dashboard.commande.general.totaux
  );

  const production = useSelector(
    ({ app_dashboard }) => app_dashboard.production.general
  );
  const stocks = useSelector(
    ({ app_dashboard }) => app_dashboard.production.general.stocks
  );
  const statistics = useSelector(
    ({ app_dashboard }) => app_dashboard.production.statistics
  );

  const autre = useSelector(
    ({ app_dashboard }) => app_dashboard.production.autre
  );
  return (
    <div style={{ ...styles.container, paddingTop: 20 }}>
      <Grid container direction="row" spacing={1}>
        <Header
          style={styles}
          icon="assets/images/application/dashboard.png"
          onBackClicked={(e) => {}}
          title={
            <Typography style={styles.title}>
              <span style={styles.titleSpan}>Tableau de Bord </span>
            </Typography>
          }
          backgroundColor={"#023047"}
        />
        <Grid item xs={12}>
          <Typography style={{ fontSize: 36, fontWeight: "700", margin: 10 }}>
            ACHAT:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DemandeAchat />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DevisAchat />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <CommandeAchat />
        </Grid>
        {modes &&
          modes.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <ItemMode mode={item} />
            </Grid>
          ))}
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12} sm={6} md={4}>
            <Statistique1
              title="Achats Aujourd'hui"
              current={{
                montant: commandeDays.current,
                growth: commandeDays.growth,
              }}
              data={{
                chartType: "bar",
                datasets: [
                  {
                    label: "Achats",
                    data: commandeDays.values, //
                  },
                ],
                labels: commandeDays.dates, //
                options: {
                  ...chartOprtions,
                },
              }}
              chartStyle={{
                pointBackgroundColor: "#ef233cCC",
                borderColor: "#ef233cCC",
                backgroundColor: "#ef233c20",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Statistique1
              title="Achats (Semaines)"
              current={{
                montant: commandeWeeks.current,
                growth: commandeWeeks.growth,
              }}
              data={{
                chartType: "bar",
                datasets: [
                  {
                    label: "Achat",
                    data: commandeWeeks.values,
                  },
                ],
                labels: commandeWeeks.dates,
                options: {
                  ...chartOprtions,
                },
              }}
              chartStyle={{
                pointBackgroundColor: "#22223bCC",
                borderColor: "#22223bCC",
                backgroundColor: "#22223b20",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Statistique1
              title="Achat Mois"
              current={{
                montant: commandeMonths.current,
                growth: commandeMonths.growth,
              }}
              data={{
                chartType: "bar",
                datasets: [
                  {
                    label: "Achats",
                    data: commandeMonths.values,
                  },
                ],
                labels: commandeMonths.dates,
                options: {
                  ...chartOprtions,
                },
              }}
              chartStyle={{
                pointBackgroundColor: "#ff9f1cCC",
                borderColor: "#ff9f1cCC",
                backgroundColor: "#ff9f1c20",
              }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={1} style={{ marginTop: 30 }}>
          <Grid item xs={12}>
            <Typography style={{ fontSize: 36, fontWeight: "700", margin: 10 }}>
              PRODUCTION: {production.date}
            </Typography>
          </Grid>
          {stocks &&
            stocks.map((s) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Stock
                  stock={s}
                  styles={{ backgroundColor: "#bfc0c0AA", color: "#323031" }}
                />
              </Grid>
            ))}
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Production />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Arrets />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={1} style={{ marginTop: 30 }}>
          <Grid item xs={12}>
            <Typography style={{ fontSize: 24, fontWeight: "700", margin: 10 }}>
              RÉALISATIONS: (30 derniers jours)
            </Typography>
          </Grid>
          {statistics.map((p) => (
            <Grid item xs={12} lg={6} xl={6}>
              <Statistique2
                title={p.produit}
                displayGrowth={true}
                current={{
                  total: p.cur_realisation + " PT",
                  growth: p.growth_realisation,
                }}
                data={{
                  chartType: "bar",
                  datasets: [
                    {
                      label: "Réalisation",
                      data: p.realisations, //
                    },
                  ],
                  labels: p.dates, //
                  options: {
                    ...chartOprtions,
                  },
                }}
                chartStyle={{
                  pointBackgroundColor: "#2ec4b6CC",
                  borderColor: "#2ec4b6CC",
                  backgroundColor: "#2ec4b620",
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container direction="row" spacing={1} style={{ marginTop: 30 }}>
          <Grid item xs={12}>
            <Typography style={{ fontSize: 24, fontWeight: "700", margin: 10 }}>
              ÉXPEDITION: (30 derniers jours)
            </Typography>
          </Grid>
          {statistics.map((p) => (
            <Grid item xs={12} lg={6} xl={6}>
              <Statistique2
                title={p.produit}
                displayGrowth={true}
                current={{
                  total: p.cur_exp + " PT",
                  growth: p.growth_exp,
                }}
                data={{
                  chartType: "bar",
                  datasets: [
                    {
                      label: "Éxpeditions",
                      data: p.expeditions, //
                    },
                  ],
                  labels: p.dates, //
                  options: {
                    ...chartOprtions,
                  },
                }}
                chartStyle={{
                  pointBackgroundColor: "#ff9f1cCC",
                  borderColor: "#ff9f1cCC",
                  backgroundColor: "#ff9f1c20",
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          direction="row"
          spacing={1}
          style={{ marginTop: 30, marginBottom: 30 }}
        >
          <Grid item xs={12}>
            <Typography style={{ fontSize: 24, fontWeight: "700", margin: 10 }}>
              Détails: (30 derniers jours)
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Statistique3
              title={"Empilages"}
              current={{
                total: autre.empilements[autre.empilements.length - 1] + " WG",
                growth: 0,
              }}
              data={{
                chartType: "bar",
                datasets: [
                  {
                    label: "Empilages",
                    data: autre.empilements, //
                  },
                ],
                labels: autre.date, //
                options: {
                  ...chartOprtions,
                },
              }}
              chartStyle={{
                pointBackgroundColor: "#264653CC",
                borderColor: "#264653CC",
                backgroundColor: "#26465320",
              }}
              styles={{ backgroundColor: "#26465310" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Statistique3
              title={"Enfournements"}
              current={{
                total:
                  autre.enfournements[autre.enfournements.length - 1] + " WG",
                growth: 0,
              }}
              data={{
                chartType: "bar",
                datasets: [
                  {
                    label: "Enfournements",
                    data: autre.enfournements, //
                  },
                ],
                labels: autre.date, //
                options: {
                  ...chartOprtions,
                },
              }}
              chartStyle={{
                pointBackgroundColor: "#fb5607CC",
                borderColor: "#fb5607CC",
                backgroundColor: "#fb560720",
              }}
              styles={{ backgroundColor: "#fb560710" }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Statistique3
              title={"Défournements"}
              current={{
                total:
                  autre.defournements[autre.defournements.length - 1] + " WG",
                growth: 0,
              }}
              data={{
                chartType: "bar",
                datasets: [
                  {
                    label: "Défournements",
                    data: autre.defournements, //
                  },
                ],
                labels: autre.date, //
                options: {
                  ...chartOprtions,
                },
              }}
              chartStyle={{
                pointBackgroundColor: "#ffb703CC",
                borderColor: "#ffb703CC",
                backgroundColor: "#ffb70320",
              }}
              styles={{ backgroundColor: "#ffb70310" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Statistique3
              title={"Emballages"}
              current={{
                total: autre.emballages[autre.emballages.length - 1] + " WG",
                growth: 0,
              }}
              data={{
                chartType: "bar",
                datasets: [
                  {
                    label: "Emballages",
                    data: autre.emballages, //
                  },
                ],
                labels: autre.date, //
                options: {
                  ...chartOprtions,
                },
              }}
              chartStyle={{
                pointBackgroundColor: "#2a9d8fCC",
                borderColor: "#2a9d8fCC",
                backgroundColor: "#2a9d8f20",
              }}
              styles={{ backgroundColor: "#2a9d8f10" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Statistique3
              title={"Arrêts Production"}
              current={{
                total:
                  autre.production_arrets[autre.production_arrets.length - 1] +
                  " min",
                growth: 0,
              }}
              data={{
                chartType: "bar",
                datasets: [
                  {
                    label: "Arrêts Production",
                    data: autre.production_arrets, //
                  },
                ],
                labels: autre.date, //
                options: {
                  ...chartOprtions,
                },
              }}
              chartStyle={{
                pointBackgroundColor: "#d62828CC",
                borderColor: "#d62828CC",
                backgroundColor: "#d6282820",
              }}
              styles={{ backgroundColor: "#d6282810" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Statistique3
              title={"Arrêts Emballage"}
              current={{
                total:
                  autre.emballage_arrets[autre.emballage_arrets.length - 1] +
                  " min",
                growth: 0,
              }}
              data={{
                chartType: "bar",
                datasets: [
                  {
                    label: "Arrêts Emballage",
                    data: autre.emballage_arrets, //
                  },
                ],
                labels: autre.date, //
                options: {
                  ...chartOprtions,
                },
              }}
              chartStyle={{
                pointBackgroundColor: "#ffa62bCC",
                borderColor: "#ffa62bCC",
                backgroundColor: "#ffa62b20",
              }}
              styles={{ backgroundColor: "#ffa62b10" }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default withReducer("app_dashboard", reducer)(Dashboard);
