import React, { useState, useCallback, useEffect } from "react";
import {
  Grid,
  Button,
  Slide,
  Dialog,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import AppInput from "app/composants/inputs/AppInput";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";

const styles = {
  add_button: {
    boxShadow: "none",
    color: "#EFF1FF",
    textTransform: "none",
    margin: "0 10px",
    height: 32,
    width: 150,
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfigDialog(props) {
  const dispatch = useDispatch();

  const { onExitDialog, setOpenDialog, openDialog } = props;
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  const config = useSelector(({ configuration }) => configuration.config);
  const editItem = useSelector(({ configuration }) => configuration.editItem);
  const entity_saved = useSelector(
    ({ configuration }) => configuration.entity_saved
  );

  const handleChange = useCallback((event) => {
    event.persist();

    const { type, maxLength } = event.target;
    if (type === "number" && event.target.value.toString().length > maxLength) {
      return;
    }

    setItem((item) => ({
      ...item,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  }, []);

  useEffect(() => {
    setItem({ ...config.itemState });
    if (editItem !== null) {
      setItem({ ...editItem });
    }
  }, [editItem, config]);

  useEffect(() => {
    setLoading(false);
  }, [entity_saved]);

  const [itemButtonStyle, setItemButtonStyle] = useState({
    border: "1px solid #0a9396",
    background: "white",
    color: "#0a9396",
  });

  function onSave(e) {
    setLoading(true);
    dispatch(Actions.save(config.collectionName, item, config.attributes));
    // setOpenDialog(false);
    setOpenDialog(false);
  }

  function onClose(e) {
    setOpenDialog(false);
    dispatch(Actions.setEditItem(null));
  }

  function onExit(e) {
    if (onExitDialog) onExitDialog(e);
  }

  return (
    <div>
      <Button
        variant="contained"
        style={{ ...styles.add_button, ...itemButtonStyle }}
        onMouseEnter={(e) =>
          setItemButtonStyle({
            border: "1px solid #0a9396",
            background: "#0a9396",
            color: "white",
          })
        }
        onMouseLeave={(e) =>
          setItemButtonStyle({
            border: "1px solid #0a9396",
            background: "white",
            color: "#0a9396",
          })
        }
        onClick={(e) => {
          setItem({ ...config.itemState });
          setOpenDialog(true);
        }}
      >
        Ajouter
      </Button>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        onExit={onExit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <Grid
            container
            style={{
              margin: 10,
            }}
          >
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{
                marginRight: 10,
                fontWeight: "medium",
                fontSize: 24,
                marginBottom: 20,
              }}
            >
              {editItem === null &&
                " NOUVEAU " + config.collectionName.toUpperCase()}
              {editItem && "MODIFICATION"}
            </Grid>
            {config.attributes.map((att, index) => {
              return (
                <Grid item xl={3} key={index}>
                  <div
                    style={{
                      marginRight: 25,
                      marginBottom: 25,
                    }}
                  >
                    {att["type"] !== "boolean" && (
                      <AppInput
                        name={att["name"]}
                        placeholder={att["placeholder"]}
                        type={att["type"]}
                        label={att["label"]}
                        height={36}
                        horizontal={true}
                        handleChange={
                          att["readOnly"] === 0
                            ? handleChange
                            : att["readOnly"] === 1 && editItem === null
                            ? handleChange
                            : (e) => {}
                        }
                        value={item[att["name"]]}
                        onTab={() => {}}
                        onEnter={() => {}}
                        maxLength={att["maxLength"]}
                        onlyDigit={att["onlyDigit"]}
                      />
                    )}
                    {att["type"] === "boolean" && (
                      <FormControlLabel
                        control={
                          <Checkbox
                            type="checkbox"
                            name={att["name"]}
                            checked={item[att["name"]]}
                            value={item[att["name"]]}
                            onChange={
                              att["readOnly"] === 0
                                ? handleChange
                                : att["readOnly"] === 1 && editItem === null
                                ? handleChange
                                : (e) => {}
                            }
                          />
                        }
                        label={att["label"]}
                      />
                    )}
                    {/* {att["type"] === "selection" && (
                      <FormControl style={{ display: "flex", marginTop: -10 }}>
                        <InputLabel>{att["label"]}</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          name={att["name"]}
                          id={att["name"]}
                          value={item[att["name"]]}
                          label={att["label"]}
                          onChange={handleChange}
                          variant="outlined"
                          height={36}
                        >
                          {att["items"].map((item) => (
                            <MenuItem value={item}>{item}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )} */}
                  </div>
                </Grid>
              );
            })}
            {/* <div style={{ flex: 1 }}>
              <AppInput
                name="label"
                placeholder="Label (max 60)"
                type="text"
                label="Label"
                height={36}
                horizontal={true}
                handleChange={handleChange}
                value={item.label}
                maxLength={60}
              />
            </div>
            <div style={{ flex: 1 }}>
              <AppInput
                name="nature"
                placeholder="Nature (max 30)"
                type="text"
                label="Nature"
                height={36}
                horizontal={true}
                handleChange={handleChange}
                value={item.nature}
                maxLength={30}
              />
            </div> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{
              margin: "0 16px",
              boxShadow: "none",
              backgroundColor: "#2a9d8f",
              color: "#EFF1FF",
              textTransform: "none",
            }}
            onClick={onSave}
            enabled={!loading}
          >
            {editItem === null && " Ajouter"}
            {editItem && "Modifier"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withReducer("configuration", reducer)(ConfigDialog);
