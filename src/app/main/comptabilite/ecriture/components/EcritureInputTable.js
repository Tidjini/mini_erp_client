import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";

import { Dialog, DialogContent, Slide } from "@material-ui/core";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

import { AppInputSearch } from "app/composants/inputs";
import { useDispatch, useSelector } from "react-redux";

import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import * as Actions from "../store/actions";
import InputTable from "./InputTable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EcritureInputTable(props) {
  const {
    label,
    placeholder,
    width,
    height,
    type,
    name,
    horizontal,
    onEnter,
    maxLength,
    primaryAttribute,
    style,
    setSelected,
    selected,
    gotFocus,
  } = props;
  const dispatch = useDispatch();

  const collectionName = useSelector(({ ecriture }) => ecriture.collectionName);
  const [dirty, setDirty] = useState(false);
  const [primary, setPrimary] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    onFeildFocus();
    if (selected !== undefined && selected !== null) {
      onSelectionChanged(selected);
    }
  }, [gotFocus]);

  useEffect(() => {
    if (collectionName !== name) return;
    // setSelected(selectedItem);
  }, [collectionName]);

  useEffect(() => {
    if (selected !== undefined && selected !== null)
      setPrimary(selected[primaryAttribute]);
  }, [selected]);

  function onSelectionChanged(selected) {
    setLoading(false);
    setValidation(true);
    if (
      selected === null ||
      selected === undefined ||
      Object.keys(selected).length === 0
    ) {
      if (primary !== "") {
        setOpenDialog(true);
      }
    } else {
      setPrimary(selected[primaryAttribute]);
      const selection =
        selected !== undefined &&
        selected !== null &&
        Object.keys(selected).length > 0;
      setValid(selection);

      if (dirty) {
        if (onEnter) onEnter(selected);
        setDirty(false);
      }
    }
  }

  useEffect(() => {
    if (openDialog) {
      dispatch(Actions.switchConfig(name));
    }
  }, [name, openDialog]);

  const input = useRef();

  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [valid, setValid] = useState(false);

  // useEffect(() => {}, [selected]);

  const onValueChanged = useCallback((event) => {
    event.persist();
    const value = event.target.value;
    setPrimary(value);
  }, []);

  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  const onExitDialog = () => {
    if (
      selected !== undefined &&
      selected !== null &&
      Object.keys(selected).length > 0
    ) {
      if (onEnter) onEnter(selected);
    }
  };

  const onFeildFocus = (event) => {
    setLoading(false);
    setValidation(false);
    setValid(false);
    setDirty(true);
  };

  const onFeildEnter = (event) => {
    setLoading(true);
    setValidation(false);
    setValid(false);
    const value = event.target.value;
    if (value === "") {
      setSelected(null);
      onSelectionChanged(null);
      return;
    }
    const path =
      "get/?collection=" +
      name +
      "&attribute=" +
      primaryAttribute +
      "&value=" +
      value;
    const link = DATA_SERVICE_URL + path;
    axios
      .get(link)
      .then((response) => {
        setSelected({ ...response.data });
        onSelectionChanged({ ...response.data });
      })
      .catch((error) => {});
  };
  const onChooseItem = (item) => {
    setSelected({ ...item });
    onSelectionChanged({ ...item });
    setOpenDialog(false);
  };

  return (
    <div style={{ ...style }}>
      <AppInputSearch
        name={name}
        label={label}
        placeholder={placeholder}
        type={type}
        handleChange={onValueChanged}
        value={primary}
        horizontal={horizontal}
        setOpenSearch={setOpenDialog}
        displayProgress={loading}
        validation={validation}
        displayValidation={false}
        valid={valid}
        onFocus={(event) => {
          onFeildFocus(event);
        }}
        onBlur={(event) => {}}
        onEnter={(event) => {
          onFeildEnter(event);
        }}
        onTab={(event) => {}}
        height={height}
        width={width}
        refInput={input}
        maxLength={maxLength}
      />
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCloseDialog}
        onExit={onExitDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogContent>
          <InputTable
            onHidden={(event) => onCloseDialog()}
            onSelect={(item) => {}}
            onChoose={(item) => {
              setValidation(true);
              setValid(true);
              onChooseItem(item);
            }}
            filter={primary}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withReducer("ecriture", reducer)(EcritureInputTable);
