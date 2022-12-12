import React, { useState, useRef, useCallback } from "react";
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

import { theme } from "app/composants/theme";
import {
  AppInput,
  AppInputValidator,
  AppInputSearch,
} from "app/composants/inputs";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const comptes_default = [
  {
    code: "401000",
    label: "Fournisseurs",
  },
  {
    code: "411001",
    label: "Clients",
  },
  {
    code: "511001",
    label: "Banque",
  },
  {
    code: "711001",
    label: "Produit",
  },
  {
    code: "611001",
    label: "Charge",
  },
  {
    code: "111001",
    label: "Capital",
  },
  {
    code: "211001",
    label: "Batiment",
  },
];

export function CompteInput(props) {
  const {
    label,
    placeholder,
    width,
    height,
    type,
    name,
    horizontal,
    onEnter,
    compteSelected,
    setCompteSelected,
    maxLength,
  } = props;

  const [comptes, setComptes] = useState(comptes_default);

  const input = useRef();

  const [openSearch, setOpenSearch] = useState(false);
  const [code, setCode] = useState(compteSelected.code);

  const [PeriodePrgressCode, setPeriodePrgressCode] = useState(false);
  const [PeriodeValidationCode, setPeriodeValidationCode] = useState(false);
  const [PeriodeValidCode, setPeriodeValidCode] = useState(false);

  const handleChange = useCallback((event) => {
    event.persist();
    const code = event.target.value;
    setCode(code);
    // let exist = false;
    // for (let index = 0; index < comptes.length; index++) {
    //   const j = comptes[index];
    //   if (j.code.toLowerCase() === code.toLowerCase()) {
    //     exist = true;
    //     setCompteSelected(j);
    //     //if (onEnter) onEnter(event);
    //     break;
    //   }
    // }
  }, []);

  const handleCloseSearch = () => {
    setOpenSearch(false);
    if (input && input.current != null) {
      input.current.focus();
      input.current.autoFocus = true;
      if (onEnter) onEnter({});
    }
  };
  const handleExit = () => {
    if (compteSelected != null) {
      if (onEnter) onEnter({});
    }
  };

  const onPeriodeCodeFocus = (event) => {
    //cancel submit operation
    setPeriodePrgressCode(false);
    setPeriodeValidationCode(false);
    setPeriodeValidCode(false);
  };

  const onCompteEnter = (event) => {
    setPeriodePrgressCode(true);
    setPeriodeValidationCode(false);
    setPeriodeValidCode(false);
    const code = event.target.value;

    let exist = false;
    for (let index = 0; index < comptes.length; index++) {
      const j = comptes[index];
      if (j.code.toLowerCase() === code.toLowerCase()) {
        exist = true;
        setCompteSelected(j);
        if (onEnter) onEnter(event);
        break;
      }
    }

    setPeriodeValidationCode(true);
    setPeriodeValidCode(exist && code.length <= 10 && code.length > 2);
    setPeriodePrgressCode(false);
  };

  return (
    <div>
      <AppInputSearch
        name={name}
        label={label}
        placeholder={placeholder}
        type={type}
        handleChange={handleChange}
        value={code}
        horizontal={horizontal}
        setOpenSearch={setOpenSearch}
        displayProgress={PeriodePrgressCode}
        validation={PeriodeValidationCode}
        displayValidation={false}
        valid={PeriodeValidCode}
        onFocus={(event) => {
          //if (onFocus) onFocus(event);
          onPeriodeCodeFocus(event);
        }}
        onBlur={(event) => {
          //onPeriodeCodeBlur(event);
        }}
        onEnter={(event) => {
          onCompteEnter(event);
        }}
        onTab={(event) => {
          //onPeriodeTab(event);
        }}
        height={height}
        width={width}
        refInput={input}
        maxLength={maxLength}
      />
      <Dialog
        open={openSearch}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseSearch}
        onExit={handleExit}
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
                src={"assets/images/compta/account.png"}
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
                Liste Comptes
              </h4>
            </div>
          </div>
          {/* <div
            className="w-full flex"
            style={{
              alignItems: "center",
              borderRadius: "2px",
              marginTop: 50,
              display: "none",
            }}
          >
            <div
              style={{
                flex: 1,
                borderWidth: "0 1px 0 0",
                borderColor: "#b7b7a490",
                padding: "10px 20px",
                marginRight: 10,
                fontWeight: "bold",
              }}
            >
              NOUVEAU Periode
            </div>
            <AppInputValidator
              name="Code"
              ref={newPeriodeCode}
              placeholder="AHT"
              type="text"
              handleChange={(event) => {
                setNewPeriode({ ...newPeriode, code: event.target.value });
              }}
              value={newPeriode.code}
              label={"Code"}
              height={36}
              horizontal={true}
              onEnter={(event) => {}}
            />
            <AppInput
              name="Label"
              ref={newPeriodeLabel}
              placeholder="Achat"
              type="text"
              label={"Label"}
              height={36}
              horizontal={true}
              handleChange={(event) => {
                setNewPeriode({ ...newPeriode, label: event.target.value });
              }}
              value={newPeriode.label}
            />

            <Button
              variant="contained"
              style={{
                margin: "0 16px",
                boxShadow: "none",
                backgroundColor: "#2a9d8f",
                color: "#EFF1FF",
                textTransform: "none",
              }}
            >
              Ajouter
            </Button>
          </div> */}

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
              <div
                style={{
                  flex: 1,
                  borderWidth: "0 1px 0 0",
                  borderColor: "#b7b7a490",
                  padding: "10px 20px",
                  marginRight: 10,
                  fontWeight: "bold",
                }}
              >
                Code
              </div>
              <div
                style={{
                  flex: 3,
                  borderWidth: "0 1px 0 0",
                  borderColor: "#b7b7a490",
                  padding: "10px 20px",
                  marginRight: 10,
                  fontWeight: "bold",
                }}
              >
                Label
              </div>
            </div>
            {comptes.map((compte, index) => (
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
                    compteSelected.code === compte.code
                      ? "#0a939620"
                      : "transparent",
                  cursor: "pointer",
                }}
                onClick={(event) => {
                  setCompteSelected(compte);
                }}
                onDoubleClick={(event) => {
                  setPeriodePrgressCode(false);
                  setPeriodeValidationCode(true);
                  setPeriodeValidCode(true);
                  setCompteSelected(compte);
                  setCode(compte.code);

                  handleCloseSearch();
                }}
              >
                <div
                  style={{
                    flex: 1,
                    borderWidth: "0 1px 0 0",
                    borderColor: "#b7b7a490",
                    padding: "10px 20px",
                    marginRight: 10,
                    fontWeight: "bold",
                  }}
                >
                  {compte.code}
                </div>
                <div
                  style={{
                    flex: 3,
                    borderWidth: "0 1px 0 0",
                    borderColor: "#b7b7a490",
                    padding: "10px 20px",
                    marginRight: 10,
                  }}
                >
                  {compte.label}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
