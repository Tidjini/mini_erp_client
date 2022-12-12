import React from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  label: {
    display: "block",
  },
}));
const Listbox = styled("ul")`
  min-width: 100px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  overflow-y: visible;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 5;
  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected="true"] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus="true"] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

export default function AppAutoComplete(props) {
  const {
    label,
    id,
    display,
    defaultOptions,
    getOptions,
    setSelected,
    selected,
    direction,
    width,
    height,
    tous,
  } = props;

  React.useEffect(() => {
    setOptions(defaultOptions);
  }, [defaultOptions]);

  const [open, setOpen] = React.useState(false);

  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const onInputChange = React.useCallback(
    (event, onChange) => {
      const query = event.target.value;
      setLoading(true);
      (async () => {
        const response = await getOptions(query);
        setLoading(false);

        if (tous)
          setOptions([
            { [display]: "Tous", [id]: "" },
            ...response.data.results,
          ]);
        else {
          setOptions([...response.data.results]);
        }
        //setOptions(response.data.results);
      })();
      onChange(event, query);
    },
    [undefined]
  );

  const classes = useStyles();
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: options,
    getOptionLabel: (option) => `${option[display]}`,
    getOptionSelected: (option, value) => option[id] === value[id],
    onChange: (event, value) => {
      if (typeof value === "string" || value === undefined || value === null)
        setSelected({ [id]: "", [display]: "" });
      else setSelected(value);
    },
    filterOptions: createFilterOptions({
      matchFrom: "contains",
      stringify: (option) => `[${option[id]}] ${option[display]}`,
    }),
    onOpen: () => {
      setOpen(true);
    },
    onClose: () => {
      setOpen(false);
    },
    open: open,
    value: selected,
    disablePortal: true,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          display: "flex",
          flexDirection: direction,
          alignItems: direction === "row" ? "center" : "left",
        }}
      >
        {label && (
          <div
            {...getInputLabelProps()}
            className={classes.root}
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              borderRadius: "4px 4px 4px 4px",
              margin: 5,
            }}
          >
            {label}
          </div>
        )}
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 14,
              minWidth: 100,
              width: width,
              height: height,
              background: "#C1C1C110",
              borderWidth: "1px",
              borderColor: "#b7b7a490",
              borderRadius: "4px",
              boxShadow: "1px 3px 3px #9E9E9E20",
              padding: "5px 10px",
              display: "flex",
              alignItems: "center",
              // transition: theme.transitions.create([
              //   "border-color",
              //   "box-shadow",
              // ]),
              "&:focus": {
                borderRadius: 4,
                borderColor: "#80bdff",
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
              },
            }}
          >
            <InputBase
              {...getInputProps()}
              style={{
                marginLeft: 5,
                flex: 1,
                fontWeight: "600",
              }}
              onChange={(e) => {
                onInputChange(e, getInputProps().onChange);
              }}
            />
            {loading ? (
              <CircularProgress color="inherit" size={16} />
            ) : (
              <ArrowDropDownIcon
                color="inherit"
                size={14}
                onClick={(e) => setOpen(true)}
              />
            )}
          </div>

          {groupedOptions.length > 0 ? (
            <Listbox
              {...getListboxProps()}
              style={{
                width: width,
              }}
            >
              {groupedOptions.map((option, index) => (
                <li {...getOptionProps({ option, index })}>
                  <span>{`${option[display]}`}</span>
                </li>
              ))}
            </Listbox>
          ) : null}
        </div>
      </div>
    </div>
  );
}
