import React, { useCallback, useEffect, useState } from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions/view.actions";
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

import {
  defaultData,
  viewStyles as styles,
  detailCells,
} from "./TransitConfig";
import Input from "app/main/composants/inputs/Input";
import DateTimeInput from "app/main/composants/inputs/DateTimeInput";
import Header from "app/main/composants/view/Header";

import Table from "app/composants/table/Table";
import { getColumns, getDate, getTime } from "app/main/helpers/utils";

import DetailsRow from "./composants/DetailsRow";

import DetailOperation from "./composants/DetailOperation";
import AppActionDialog from "app/main/components/AppActionDialog";

const Title = ({ style, numero }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Operation N°</span> {numero}
  </Typography>
);

const SubTitle = ({ cloture }) => (
  <Typography
    style={{
      fontWeight: "700",
      color: cloture ? "#ef476f" : "#06d6a0",
      fontSize: 12,
      textAlign: "right",
      padding: "5px 15px",
      borderRadius: 5,
      backgroundColor: cloture ? "#ef476f20" : "#83c5be20",
      textTransform: "uppercase",
      cursor: cloture ? "default" : "pointer",
    }}
  >
    {cloture ? "Fermée" : "Ouverte"}
  </Typography>
);

function BitumeOperationView(props) {
  const { match, history } = props;
  const dispatch = useDispatch();
  const { form, handleChange, setForm, setInForm } = useForm(defaultData);

  const [openDetails, setOpentDetails] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(undefined);

  const operation = useSelector(({ transit }) => transit.view);

  useEffect(() => {
    const { operationId } = match.params;
    if (operationId === "nouveau") {
      dispatch(Actions.setNewOperaiton());
    } else {
      dispatch(Actions.getOperation(operationId));
    }
  }, [match]);

  useEffect(() => {
    setForm(operation);
  }, [operation]);

  const saveOperation = useCallback(
    (event) => {
      dispatch(Actions.saveOperation(form)).then((result) => {
        if (form && form.cloture === true) {
          history.push(`/bitume-operation-collection/`);
        }
      });
    },
    [form]
  );

  const deleteOperation = useCallback(
    (event) => {
      dispatch(Actions.deleteOperation(form)).then((result) => {
        history.push(`/bitume-operation-collection/`);
      });
    },
    [form]
  );

  function onDetailsClick(event, detail) {
    setSelectedDetail(detail);
    setOpentDetails(true);
  }

  const onClotureOperation = useCallback(
    (event) => {
      dispatch(Actions.saveOperation({ ...form, cloture: true })).then(
        (result) => {
          history.push(`/bitume-operation-collection/`);
        }
      );
    },
    [form]
  );

  return (
    <div style={styles.container}>
      <Grid container>
        {/* header */}
        <Header
          style={styles}
          icon="assets/images/transit/cargo-ship.png"
          onBackClicked={(e) => {
            history.push(`/bitume-operation-collection/`);
          }}
          title={<Title style={styles} numero={form.numero} />}
          hint={<SubTitle cloture={form.cloture} />}
          onSave={saveOperation}
          onDelete={deleteOperation}
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
              grid={{ xs: 12, sm: 6 }}
              name="navire"
              placeholder="Navire"
              label="Navire"
              handleChange={handleChange}
              value={form.navire}
              style={{}}
            />

            <Input
              grid={{ xs: 12, sm: 6 }}
              name="gros"
              placeholder="Numéro"
              label="N° Gros"
              handleChange={handleChange}
              value={form.gros}
              style={{}}
            />
            <Grid
              item
              xs={12}
              sm={6}
              align="end"
              style={{ ...styles.input, paddingTop: 10, paddingRight: 10 }}
            >
              <Typography style={{ fontWeight: "bold" }}>Début le:</Typography>
              <Typography
                style={{
                  color: "#2a9d8f",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                {`${getDate(form.debut)} à ${getTime(form.debut)}`}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              align="end"
              style={{ ...styles.input, paddingTop: 10, paddingRight: 10 }}
            >
              <Typography style={{ fontWeight: "bold" }}>
                Terminée le:
              </Typography>
              <Typography
                style={{
                  color: "#e76f51",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                {`${getDate(form.fin)} à ${getTime(form.fin)}`}
              </Typography>
            </Grid>

            {/* <Grid
              item
              xs={12}
              sm={6}
              style={{ ...styles.input, paddingTop: 5 }}
            >
              <DateTimeInput
                name="debut"
                placeholder=""
                label={`Début`}
                handleChange={handleChange}
                value={form.debut}
                style={{}}
              />
            </Grid> */}
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
              name="qte_theorique"
              placeholder="Qté. Thé."
              label="Qté. Théorique"
              type="number"
              handleChange={handleChange}
              value={form.qte_theorique}
              style={{}}
            />
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                ...styles.selector,
                paddingTop: 5,
                display: "flex",
                justifycontent: "space-between",
              }}
            >
              <div>
                <Typography style={{ fontWeight: "bold" }}>
                  Qté Éffective:
                </Typography>
                <Typography style={{ color: "#2a9d8f", fontWeight: "bold" }}>
                  {convertToTonne(form.qte_effective)}
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                ...styles.selector,
                paddingTop: 5,
                display: "flex",
                justifycontent: "space-between",
              }}
            >
              <div>
                <Typography style={{ fontWeight: "bold" }}>
                  Qté Différence:
                </Typography>
                <Typography style={{ color: "#e76f51", fontWeight: "bold" }}>
                  {convertToTonne(form.qte_difference)}
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
          style={{ ...styles.boxContainer, padding: "10px 0 0 0" }}
        >
          <Grid container style={styles.box}>
            <Typography
              style={{
                fontWeight: "600",
                fontSize: 16,
                marginLeft: 5,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Informations
            </Typography>
            <Grid
              item
              xs={12}
              style={{
                ...styles.selector,
                paddingTop: 5,
                display: "flex",
                justifycontent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Total Chauffeurs:
              </Typography>
              <Typography style={{ color: "#1d3557", fontWeight: "600" }}>
                {form.chauffeurs}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                ...styles.selector,
                paddingTop: 5,
                display: "flex",
                justifycontent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Durrée:
              </Typography>
              <Typography style={{ color: "#1d3557", fontWeight: "600" }}>
                {`${form.durre} min`}
              </Typography>
            </Grid>
            <Divider style={styles.divider} />
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ ...styles.boxContainer, padding: "10px 20px" }}
        >
          {form && form.cloture === false && (
            <AppActionDialog
              buttonLabel="Cloturer Opération"
              title="Confirmation"
              backgroundColor="#4a4e69"
              actionOne={(e) => {
                onClotureOperation();
              }}
              actionOneLabel="Confirmer"
              actionTwo={(e) => {}}
              actionTwoLabel=""
              actionThreeLabel="Annuler"
              message={` Voulez vous cloture cette opeartion  (N°${form.numero}) ?`}
            />
          )}
        </Grid>
      </Grid>
      <div style={{ marginTop: 20 }}>
        {form && form.cloture === false && (
          <div style={{ ...styles.flexCenter, marginBottom: 10 }}>
            <Button
              variant="contained"
              style={{ ...styles.button, marginLeft: 0 }}
              onClick={(e) => {
                onDetailsClick(e, undefined);
              }}
            >
              Ajouter chauffeur
            </Button>
          </div>
        )}

        <Table
          cells={getColumns(detailCells)}
          data={[...operation.details]}
          CustomRow={DetailsRow}
          onClickItem={(e, i) => {
            if (form && form.cloture === true) return;
            onDetailsClick(e, i);
          }}
          onDoubleClickItem={(e, i) => {}}
        />
      </div>

      <DetailOperation
        setOpen={setOpentDetails}
        open={openDetails}
        detail={selectedDetail}
        operation={form}
      />
    </div>
  );
}

export default withReducer("transit", reducer)(BitumeOperationView);
