import React, { useCallback, useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import StockDetails from "./StockDetails";
import Input from "app/main/composants/inputs/Input";
import AppSelector from "app/composants/inputs/AppSelector";
import WagonList from "./WagonList";
import ArretDialog from "./ArretDialog";
import CasseDialog from "./CasseDialog";
import ExpeditionDialog from "./ExpeditionDialog";

function ProductionHeader(props) {
  const { form, handleChange, setForm } = props;
  const dispatch = useDispatch();

  const employees = useSelector(
    ({ production_main }) => production_main.employees.results
  );
  const postes = useSelector(
    ({ production_main }) => production_main.postes.results
  );
  const wagons = useSelector(({ production_main }) => production_main.wagons);
  const equipes = useSelector(
    ({ production_main }) => production_main.equipes.results
  );

  const [employs, setEmploys] = useState([]);
  const [posts, setPosts] = useState([]);
  const [equips, setEquips] = useState([]);

  const convertToList = (
    list,
    setList,
    attribute = [],
    id = "id",
    canNull = false
  ) => {
    const result = [];
    if (canNull) {
      result.push({
        display: `Non Définie`,
        value: null,
      });
    }

    list.map((item) => {
      result.push({
        display: `${item[attribute[0]]} ${
          attribute.length > 1 ? item[attribute[1]] : ""
        }`,
        value: item[id],
      });
    });
    setList(result);

    return result.length > 0 ? result[0].value : null;
  };

  useEffect(() => {
    const defEmp = convertToList(
      employees,
      setEmploys,
      ["nom", "prenom"],
      "id",
      true
    );
    const defEquipe = convertToList(
      equipes,
      setEquips,
      ["libelle"],
      "libelle",
      "id",
      true
    );
    const defPoste = convertToList(postes, setPosts, ["intitule"], "intitule");

    let today = new Date();

    setForm({
      ...form,
      poste: defPoste,
      equipe: defEquipe,
      date: today.toISOString(),
      responsable: defEmp,
    });
  }, [postes, employees, equipes]);

  const reporting = useCallback(
    (event) => {
      dispatch(Actions.reporting(form.date));
    },
    [form]
  );

  return (
    <div style={{ margin: 10, width: "100%" }}>
      <div style={{ margin: 10 }}>
        <div
          style={{
            display: "flex",
            justifycontent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifycontent: "end",
            }}
          >
            <img
              alt="state"
              src={"assets/images/app_production/packages.png"}
              style={{ width: 18, height: 18, marginRight: 5 }}
            />
            <Typography style={{ fontSize: 12, fontWeight: "700" }}>
              ZONE DE STOCKAGE
            </Typography>

            <StockDetails stock={{}} />
            <CasseDialog
              poste={form.poste}
              responsable={form.responsable}
              date={form.date}
              equipe={form.equipe}
            />
            <ExpeditionDialog
              poste={form.poste}
              responsable={form.responsable}
              date={form.date}
              equipe={form.equipe}
            />
            <Button
              variant="contained"
              style={{
                marginLeft: 20,
                boxShadow: "none",
                backgroundColor: "#219ebc",
                color: "#EFF1FF",
                height: 28,
                fontSize: 12,
                textTransform: "none",
              }}
              onClick={reporting}
            >
              Rapport
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              grid={{ xs: 12, sm: 2 }}
              name="date"
              type="date"
              format="DD/MM/YYYY"
              handleChange={handleChange}
              value={form.date.substring(0, 10)}
              style={{ marginTop: 20 }}
            />
            <Input
              grid={{ xs: 6, sm: 1 }}
              name="objectif"
              type="number"
              handleChange={handleChange}
              value={form.objectif}
              style={{ marginTop: 20 }}
            />

            <AppSelector
              name="poste"
              label="Poste"
              value={form.poste}
              options={posts}
              handleChange={handleChange}
              height={28}
              horizontal={true}
              width={"auto"}
              style={{ marginLeft: 10 }}
            />
            <AppSelector
              name="equipe"
              label="Equipe"
              value={form.equipe}
              options={equips}
              handleChange={handleChange}
              height={28}
              horizontal={true}
              width={"auto"}
              style={{ marginLeft: 10 }}
            />
            <AppSelector
              name="responsable"
              label="Resp."
              value={form.responsable}
              options={employs}
              handleChange={handleChange}
              height={28}
              horizontal={true}
              width={"auto"}
              style={{ marginLeft: 10 }}
            />

            <ArretDialog poste={form.poste} date={form.date} />

            {wagons && <WagonList />}
          </div>
        </div>

        {/* <Grid
          container
          style={{
            display: "flex",
            justifycontent: "center",
            alignItems: "center",
            borderWidth: "5px 0",
            borderColor: "#2a9d8f",
            width: "100%",
            height: 82,
            margin: "10px 0",
            padding: "5px 0",
          }}
        >
          {stock.map(
            (stock, index) =>
              index < 18 && <ProduitStock key={index} produit={stock.produit} />
          )}
        </Grid> */}
      </div>
    </div>
  );
}
export default withReducer("production_main", reducer)(ProductionHeader);
