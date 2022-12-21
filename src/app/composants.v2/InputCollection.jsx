import React from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { FormControl, Hidden, Typography, Grid } from "@material-ui/core";

const Listbox = styled("ul")`
  min-width: 100px;
  width: 100%;
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

// const [open, setOpen] = React.useState(false);
// const [selected, setSelected] = React.useState({ value: "", display: "" });

// React.useEffect(() => {
//   options.map((o, i) => {
//     if (o.value === value) {
//       setSelected(o);
//     }
//     return o;
//   });
// }, [value]);

export default function InputCollection(props) {
  const {
    name,
    label,
    options,
    onInputChange,
    isLoading,
    style,
    xs,
    sm,
    md,
    lg,
    xl,
    smDown,
    mdDown,
    lgDown,
    xlDown,

    open,
    onOpen,
    onClose,
    selected,
    onSelect, //review with onChange
  } = props;

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
    getOptionSelected: (option, item) => option.value === item.value,
    onChange: (event, value) => {
      onSelect && onSelect(value);
    },
    filterOptions: createFilterOptions({
      matchFrom: "contains",
      stringify: (option) => `${option.value} ${option.display}`,
    }),
    onOpen: onOpen,
    onClose: onClose,
    open: open,
    value: selected,
    disablePortal: true,
  });

  return (
    <Hidden smDown={smDown} mdDown={mdDown} lgDown={lgDown} xlDown={xlDown}>
      <Grid
        item
        xs={xs || 12}
        sm={sm || 12}
        md={md || 12}
        lg={lg || 12}
        xl={xl || 12}
        style={{
          ...style,
        }}
      >
        <FormControl
          {...getRootProps()}
          style={{
            width: "100%",
            ...style,
          }}
        >
          {label && (
            <Typography
              {...getInputLabelProps()}
              style={{ fontWeight: "bold" }}
            >
              {label}
            </Typography>
          )}

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
                onChange={(event) => {
                  onInputChange(event, getInputProps().onChange);
                }}
              />

              {isLoading ? (
                <CircularProgress color="inherit" size={16} />
              ) : (
                <ArrowDropDownIcon
                  color="inherit"
                  size={14}
                  onClick={(e) => (open ? onClose() : onOpen())}
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
      </Grid>
    </Hidden>
  );
}
