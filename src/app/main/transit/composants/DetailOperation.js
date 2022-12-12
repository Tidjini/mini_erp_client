import React, { useCallback, useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

import Transition from "app/helpers/Transition";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@material-ui/core";
import Input from "app/main/composants/inputs/Input";
import SimpleForm from "app/composants/inputs/SimpleForm";

import { detailsOperation as styles } from "./styles";
import OperationStatue from "./OperationStatue";
import { useForm } from "@fuse/hooks";
import Header from "app/main/composants/view/Header";
import { useOperationAction } from "app/main/hooks/operation";

const Title = ({ style, chauffeur }) => (
  <Typography style={style.title}>
    <span style={style.titleSpan}>Chauffeur</span> {chauffeur}
  </Typography>
);

function DetailOperation(props) {
  const { open, setOpen, detail, onSaveDetail, operation } = props;
  const dispatch = useDispatch();

  const [header, setHeader] = useState("#14213d20");
  const { form, handleChange, setForm, setInForm } = useForm(
    Actions.defaultDetail
  );
  const action = useOperationAction(form.statue);

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      if (detail !== undefined) setForm(detail);
      else
        setForm({ ...Actions.defaultDetail, transit_operation: operation.id });
    }
  }, [open, detail, operation]);

  const save = useCallback(
    (event) => {
      dispatch(Actions.saveDetail(form)).then((res) => {
        dispatch(Actions.getOperation(form.transit_operation)).then((res) => {
          setOpen(false);
        });
      });
    },
    [form]
  );

  const onDelete = useCallback(
    (event) => {
      dispatch(Actions.deleteDetail(form)).then((res) => {
        dispatch(Actions.getOperation(form.transit_operation)).then((res) => {
          setOpen(false);
        });
      });
    },
    [form]
  );

  const toNextState = useCallback(
    (event) => {
      dispatch(Actions.onAction(form));
      setOpen(false);
    },
    [form]
  );

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title">
        <Header
          style={{
            ...styles,
            header: {
              ...styles.header,
              backgroundColor: header,
            },
          }}
          icon="assets/images/transit/car-trailer.png"
          onBackClicked={handleClose}
          title={<Title style={styles} numero={form.chauffeur} />}
          hint={<OperationStatue statue={form.statue} alert={false} />}
          onSave={save}
          onDelete={onDelete}
        />
      </DialogTitle>
      <DialogContent style={{ width: "100%", marginTop: -20 }}>
        <Grid container className="w-full">
          <SimpleForm
            form={form}
            handleChange={handleChange}
            inputs={[
              {
                name: "numero",
                label: "Numéro",
                style: { styleItem: { height: 40 }, grid: { xs: 12 } },
                input: "input",
              },
              {
                name: "chauffeur",
                label: "Chauffeur",
                style: { styleItem: { height: 40 }, grid: { xs: 12 } },
                input: "input",
              },
              {
                name: "camion",
                label: "Camion (Matricule)",
                style: { styleItem: { height: 40 }, grid: { xs: 12 } },
                input: "input",
              },
              {
                name: "tare_initial",
                label: "Tare Initial (KG)",
                style: { styleItem: { height: 40 }, grid: { xs: 12 } },
                input: "input",
                type: "number",
              },
              {
                name: "sortie_depot",
                label: "Sortie Infrabitum",
                style: {
                  styleItem: {
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifycontent: "space-between",
                    marginTop: 10,
                  },
                  grid: { xs: 12 },
                  label: {
                    fontWeight: "700",
                    textTransform: "none",
                    fontSize: 12,
                  },
                  value: {
                    color: "#22577a",
                    fontWeight: "700",
                    fontSize: 12,
                  },
                },
                input: "text_compse",
              },
              {
                name: "arrive_port",
                label: "Arrivé Port",
                style: {
                  styleItem: {
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifycontent: "space-between",
                    marginTop: 10,
                  },
                  grid: { xs: 12 },
                  label: {
                    fontWeight: "700",
                    textTransform: "none",
                    fontSize: 12,
                  },
                  value: {
                    color: "#22577a",
                    fontWeight: "700",
                    fontSize: 12,
                  },
                },
                input: "text_compse",
              },
              {
                name: "diff_depot_port",
                label: "Différence (min)",
                style: {
                  styleItem: {
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifycontent: "space-between",
                    marginTop: 10,
                  },
                  grid: { xs: 12 },
                  label: {
                    fontWeight: "700",
                    textTransform: "none",
                    fontSize: 12,
                  },
                  value: {
                    color: "#22577a",
                    fontWeight: "700",
                    fontSize: 12,
                  },
                },
                input: "text_compse",
              },
            ]}
          />

          <SimpleForm
            form={form}
            handleChange={handleChange}
            inputs={[
              {
                name: "tare_port",
                label: "Tare Port (KG)",
                style: { styleItem: { height: 40 }, grid: { xs: 12 } },
                input: "input",
                type: "number",
              },

              {
                name: "brut_port",
                label: "Brut Port (KG)",
                style: { styleItem: { height: 40 }, grid: { xs: 12 } },
                input: "input",
                type: "number",
              },

              {
                name: "sortie_port",
                label: "Sortie Port",
                style: {
                  styleItem: {
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifycontent: "space-between",
                    marginTop: 10,
                  },
                  grid: { xs: 12 },
                  label: {
                    fontWeight: "700",
                    textTransform: "none",
                    fontSize: 12,
                  },
                  value: {
                    color: "#22577a",
                    fontWeight: "700",
                    fontSize: 12,
                  },
                },
                input: "text_compse",
              },
              {
                name: "arrive_depot",
                label: "Arrivé Infrabitum",
                style: {
                  styleItem: {
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifycontent: "space-between",
                  },
                  grid: { xs: 12 },
                  label: {
                    fontWeight: "700",
                    textTransform: "none",
                    fontSize: 12,
                  },
                  value: {
                    color: "#ff595e",
                    fontWeight: "700",
                    fontSize: 12,
                  },
                },
                input: "text_compse",
              },
              {
                name: "diff_port_depot",
                label: "Différence (min)",
                style: {
                  styleItem: {
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifycontent: "space-between",
                    marginTop: 10,
                  },
                  grid: { xs: 12 },
                  label: {
                    fontWeight: "700",
                    textTransform: "none",
                    fontSize: 12,
                  },
                  value: {
                    color: "#22577a",
                    fontWeight: "700",
                    fontSize: 12,
                  },
                },
                input: "text_compse",
              },
            ]}
          />
          <SimpleForm
            form={form}
            handleChange={handleChange}
            inputs={[
              {
                name: "brut_depot",
                label: "Brut Infrabitum (KG)",
                style: { styleItem: { height: 40 }, grid: { xs: 12 } },
                input: "input",
                type: "number",
              },
              {
                name: "tare_final",
                label: "Tare Final (KG)",
                style: { styleItem: { height: 40 }, grid: { xs: 12 } },
                input: "input",
                type: "number",
              },
              {
                name: "fin",
                label: "Fin Opération",
                style: {
                  styleItem: {
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifycontent: "space-between",
                  },
                  grid: { xs: 12 },
                  label: {
                    fontWeight: "700",
                    textTransform: "none",
                    fontSize: 12,
                  },
                  value: {
                    color: "#ff595e",
                    fontWeight: "700",
                    fontSize: 12,
                  },
                },
                input: "text_compse",
              },
            ]}
          />
          <SimpleForm
            form={form}
            handleChange={handleChange}
            inputs={[
              {
                name: "tare_diff",
                label: "Tare Diff.",
                style: {
                  styleItem: {
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifycontent: "space-between",
                  },
                  grid: { xs: 12 },
                  label: {
                    fontWeight: "700",
                    textTransform: "none",
                  },
                  value: {
                    color: "#22577a",
                    fontWeight: "700",
                  },
                },
                input: "text_compse",
              },
              {
                name: "brut_diff",
                label: "Brut Diff.",
                style: {
                  styleItem: {
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifycontent: "space-between",
                  },
                  grid: { xs: 12 },
                  label: {
                    fontWeight: "700",
                    textTransform: "none",
                  },
                  value: {
                    color: "#22577a",
                    fontWeight: "700",
                  },
                },
                input: "text_compse",
              },
              {
                name: "net_diff",
                label: "Net Diff.",
                style: {
                  styleItem: {
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifycontent: "space-between",
                  },
                  grid: { xs: 12 },
                  label: {
                    fontWeight: "700",
                    textTransform: "none",
                  },
                  value: {
                    color: "#22577a",
                    fontWeight: "700",
                  },
                },
                input: "text_compse",
              },
              {
                name: "net_depot",
                label: "Net Infrabitume.",
                style: {
                  styleItem: {
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifycontent: "space-between",
                  },
                  grid: { xs: 12 },
                  label: {
                    fontWeight: "700",
                    textTransform: "none",
                    fontSize: 18,
                  },
                  value: {
                    color: "#38a3a5",
                    fontWeight: "700",
                    fontSize: 18,
                  },
                },
                input: "text_compse",
              },
            ]}
          />
        </Grid>
      </DialogContent>
      {form && form.statue < 12 && (
        <DialogActions>
          <Button
            variant="contained"
            style={{ ...styles.button, backgroundColor: action.color }}
            onClick={toNextState}
          >
            {action.label}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default withReducer("transit", reducer)(DetailOperation);
