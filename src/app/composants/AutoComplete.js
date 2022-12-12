import React from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { FormControl, Typography } from "@material-ui/core";

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

export default function AutoComplete(props) {
  const {
    name,
    label,
    options,
    onInputChange,
    handleChange,
    value,
    style,
    loading,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({ value: "", display: "" });

  React.useEffect(() => {
    options.map((o, i) => {
      if (o.value === value) {
        setSelected(o);
      }
      return o;
    });
  }, [value]);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: name,
    name: name,
    options: options,
    getOptionLabel: (option) => option.display,
    getOptionSelected: (option, itemSelected) =>
      option.value === itemSelected.value,
    onChange: (event, value) => {
      if (typeof value === "string" || value === undefined || value === null)
        setSelected({ value: "", display: "" });
      else {
        setSelected(value);
        handleChange(name, value);
      }
    },
    filterOptions: createFilterOptions({
      matchFrom: "contains",
      stringify: (option) => `[${option.value}] ${option.display}`,
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
    <FormControl
      {...getRootProps()}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        ...style,
      }}
    >
      <Typography
        {...getInputLabelProps()}
        style={{
          fontWeight: 700,
          textTransform: "uppercase",
          fontSize: 12,
          height: 20,
        }}
      >
        {label}
      </Typography>
      <div style={{ position: "relative", width: "100%" }}>
        <div
          style={{
            fontSize: 14,
            minWidth: 100,
            background: "#C1C1C110",
            borderWidth: "1px",
            borderColor: "#b7b7a490",
            borderRadius: "4px",
            boxShadow: "1px 3px 3px #9E9E9E20",
            padding: "5px 10px",
            display: "flex",
            alignItems: "center",

            "&:focus": {
              borderRadius: 4,
              borderColor: "#80bdff",
              boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
            },

            width: "100%",
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
              onClick={(e) => setOpen(!open)}
            />
          )}
        </div>

        <Listbox {...getListboxProps()} style={{ width: "100%" }}>
          {groupedOptions.map((option, index) => {
            return (
              <li {...getOptionProps({ option, index })} key={index}>
                <span>{`${option.display}`}</span>
              </li>
            );
          })}
        </Listbox>
      </div>
    </FormControl>
  );
}
