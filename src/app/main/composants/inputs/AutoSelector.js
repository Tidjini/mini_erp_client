import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { Paper, Typography } from "@material-ui/core";

const CustomPaper = (props) => {
  return (
    <Paper
      elevation={1}
      {...props}
      style={{ width: 400, maxHeight: 250, overflow: "auto" }}
    />
  );
};
export default function AutoSelector(props) {
  const {
    label,
    itemKey,
    display,
    defaultItems,
    getItems,
    setSelected,
    selected,
    afterSelection,
    style,
    render,
  } = props;

  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState();

  const onInputChange = React.useCallback((event) => {
    const query = event.target.value;
    setValue(query);
    (async () => {
      getItems(query);
    })();
  }, []);

  React.useEffect(() => {
    setItems(defaultItems);
  }, [defaultItems]);

  React.useEffect(() => {
    if (selected) setValue(selected[itemKey]);
  }, [selected]);

  const onSelect = React.useCallback(
    (event) => {
      const value = event.target.value;
      const index = items.findIndex((e) => e[itemKey] === value);

      if (index === -1) return;
      else {
        setSelected(items[index]);
        if (afterSelection) afterSelection(items[index]);
      }
    },
    [items, itemKey]
  );
  return (
    <Autocomplete
      id="combo-box-demo"
      noOptionsText={"Cette recherche n'existe pas"}
      filterOptions={createFilterOptions({
        matchFrom: "contains",
        stringify: (option) => `[${option[itemKey]}] ${option[display]}`,
      })}
      options={items}
      getOptionLabel={(option) => `${option[render]}`}
      style={{ ...style }}
      onChange={(event, value) => {
        if (value === null || value === undefined) {
          getItems("");
        }
        setSelected(value);
        if (afterSelection) afterSelection(value);
      }}
      renderOption={(option) => (
        <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
          [{option[itemKey]}]
          <span style={{ fontSize: 12, fontWeight: "600", marginLeft: 5 }}>
            {option[display]}
          </span>
        </Typography>
      )}
      onOpen={() => {}}
      onClose={() => {}}
      PaperComponent={CustomPaper}
      value={selected}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          size="small"
          onChange={(event) => onInputChange(event)}
          placeholder={label}
          value={value}
          autoFocus
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              onSelect(event);
            }
          }}
        />
      )}
    />
  );
}
