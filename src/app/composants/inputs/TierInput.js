import React, { useState, useRef, useEffect } from "react";
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

const tiers_default = [
  {
    code: "CERAM",
    label: "SARL CERAM",
  },
  {
    code: "AUTR",
    label: "SARL AUTRICHE",
  },
  {
    code: "KRM",
    label: "KARIM HOME",
  },
];

export function TierInput(props) {
  const {
    label,
    placeholder,
    width,
    height,
    setTierSelected,
    tierSelected,
    type,
    name,
    horizontal,
    onBlur,
    onEnter,
    onTab,
  } = props;

  const input = useRef();

  const newPeriodeCode = useRef(null);
  const newPeriodeLabel = useRef(null);

  const [openSearch, setOpenSearch] = useState(false);
  const [codeTier, setCodeTier] = useState("");

  const [tiers, setTiers] = useState(tiers_default);

  useEffect(() => {
    setCodeTier(tierSelected.code);
  }, [tierSelected]);

  const classes = useStyles();

  const handleCloseSearch = () => {
    setOpenSearch(false);
    if (input && input.current != null) {
      input.current.focus();
      input.current.autoFocus = true;
    }
  };
  const handleExit = () => {
    if (tierSelected != null) {
      if (onEnter) onEnter({});
    }
  };

  const onTierEnter = (event) => {
    for (let index = 0; index < tiers.length; index++) {
      const j = tiers[index];

      if (j.code.toLowerCase() === codeTier.toLowerCase()) {
        setTierSelected(j);
        if (onEnter) {
          onEnter(event);
        }
        break;
      }
    }
  };

  return (
    <div>
      <AppInputSearch
        name={name}
        label={label}
        placeholder={placeholder}
        type={type}
        handleChange={(e) => {
          //setCodeTier(e.target.value);
        }}
        value={tierSelected.label}
        horizontal={horizontal}
        setOpenSearch={setOpenSearch}
        displayProgress={false}
        validation={false}
        displayValidation={false}
        valid={false}
        onFocus={(event) => {
          //if (onFocus) onFocus(event);
        }}
        onBlur={(event) => {
          //onPeriodeCodeBlur(event);
        }}
        onEnter={(event) => {
          onTierEnter(event);
        }}
        onTab={(event) => {
          //onPeriodeTab(event);
        }}
        height={height}
        width={width}
        refInput={input}
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
                src={"assets/images/compta/tier.png"}
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
                Liste Tiers
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
            {tiers.map((compte, index) => (
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
                    tierSelected.code === compte.code
                      ? "#0a939620"
                      : "transparent",
                  cursor: "pointer",
                }}
                onClick={(event) => {
                  setTierSelected(compte);
                }}
                onDoubleClick={(event) => {
                  setTierSelected(compte);
                  setCodeTier(compte.code);

                  if (onEnter) onEnter(event);
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
