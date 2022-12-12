import React, { useState, useRef, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Icon,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Slide,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { AppInputSearch } from "app/composants/inputs";
import { useDispatch, useSelector } from "react-redux";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AppInputTable(props) {
  const {
    label,
    placeholder,
    width,
    height,
    type,
    name,
    horizontal,
    onEnter,
    selected,
    setSelected,
    maxLength,
    collectionName,
    header,
    primaryAttribute,
    attributes,
    columns,
    icon,
  } = props;

  const dispatch = useDispatch();
  const collectionData = useSelector(
    ({ app_input_table }) => app_input_table.collectionData
  );

  useEffect(() => {
    function getData() {
      dispatch(Actions.getTableData(collectionName));
    }
    getData();
  }, []);
  const input = useRef();

  const [openDialog, setOpenDialog] = useState(false);
  const [primary, setPrimary] = useState("");

  useEffect(() => {
    if (selected != null) {
      setPrimary(selected[primaryAttribute]);
    }
  }, [selected]);

  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [valid, setValid] = useState(false);

  const onPrimaryChanged = useCallback((event) => {
    event.persist();
    const value = event.target.value;
    setPrimary(value);
    setSelected(null);

    for (let index = 0; index < collectionData.length; index++) {
      const j = collectionData[index];
      if (j.code.toLowerCase() === value.toLowerCase()) {
        setSelected(j);
        break;
      }
    }
  }, []);

  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  const onExitDialog = () => {
    if (selected != null) {
      if (onEnter) onEnter({});
    }
  };

  const onFeildFocus = (event) => {
    setLoading(false);
    setValidation(false);
    setValid(false);
  };

  const onFeildEnter = (event) => {
    if (selected == null) {
      setOpenDialog(true);
    }

    setLoading(true);
    setValidation(false);
    setValid(false);
    setSelected(null);

    const value = event.target.value;

    let exist = false;
    for (let index = 0; index < collectionData.length; index++) {
      const j = collectionData[index];
      if (j.code.toLowerCase() === value.toLowerCase()) {
        exist = true;
        setSelected(j);
        if (onEnter) onEnter(event);
        break;
      }
    }

    setValidation(true);
    //todo for more validation && code.length <= 10 && code.length > 2
    setValid(exist);
    setLoading(false);
  };

  return (
    <div>
      <AppInputSearch
        name={name}
        label={label}
        placeholder={placeholder}
        type={type}
        handleChange={onPrimaryChanged}
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
          {/* entete   */}
          <div
            className="w-full flex"
            style={{ alignItems: "center", justifycontent: "space-between" }}
          >
            <div style={{ display: "flex" }}>
              <AppInputSearch
                name="Search"
                placeholder="401XXX"
                type="text"
                handleChange={undefined}
                height={36}
                horizontal={true}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
                onEnter={(event) => {}}
                onTab={(event) => {}}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                alt="state"
                src={"assets/images/compta/" + icon}
                style={{
                  width: 36,
                  height: 36,
                }}
              />
              <h4
                style={{
                  fontSize: 18,
                  marginLeft: 10,
                  color: "#264653",
                }}
              >
                {header}
              </h4>
            </div>
          </div>

          <div style={{ margin: "20px 10px" }}>
            <div
              className="w-full flex"
              style={{
                alignItems: "center",
                justifycontent: "space-around",
                borderRadius: "2px",
                boxShadow: "1px 3px 3px #9E9E9E20",
                borderWidth: 1,
                borderColor: "#b7b7a490",
                backgroundColor: "#0a939680",
              }}
            >
              {columns.map((col, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    borderWidth: "0 1px 0 0",
                    borderColor: "#b7b7a490",
                    padding: "10px 20px",
                    marginRight: 10,
                    fontWeight: "bold",
                  }}
                >
                  {col}
                </div>
              ))}
            </div>

            {collectionData.map((item, index) => (
              <div
                key={index}
                className="w-full flex"
                style={{
                  alignItems: "center",
                  justifycontent: "space-around",
                  borderRadius: "2px",
                  boxShadow: "1px 1px 1px #9E9E9E20",
                  borderWidth: 1,
                  borderColor: "#b7b7a420",
                  backgroundColor:
                    selected &&
                    selected[primaryAttribute] === item[primaryAttribute]
                      ? "#0a939620"
                      : "transparent",
                  cursor: "pointer",
                }}
                onClick={(event) => {
                  setSelected(item);
                }}
                onDoubleClick={(event) => {
                  setLoading(false);
                  setValidation(true);
                  setValid(true);
                  setSelected(item);
                  setPrimary(item[primaryAttribute]);
                  onCloseDialog();
                }}
              >
                {attributes.map((att, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      borderWidth: "0 1px 0 0",
                      borderColor: "#b7b7a490",
                      padding: "10px 20px",
                      marginRight: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {item[att]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withReducer("app_input_table", reducer)(AppInputTable);
