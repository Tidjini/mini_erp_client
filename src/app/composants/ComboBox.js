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
      style={{ width: 250, maxHeight: 250, overflow: "auto", ...props.style }}
    />
  );
};
export default function ComboBox(props) {
  const {
    label,
    id,
    display,
    defaultOptions,
    getOptions,
    setSelected,
    selected,
    tous,
    afterSelection,
    style,
  } = props;

  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState();

  const onInputChange = React.useCallback((event) => {
    const query = event.target.value;
    setValue(query);
    (async () => {
      const response = await getOptions(query);
      if (tous)
        setOptions([{ [display]: "Tous", [id]: "" }, ...response.data.results]);
      else {
        setOptions([...response.data.results]);
      }
    })();
  }, []);

  React.useEffect(() => {
    setOptions(defaultOptions);
  }, [defaultOptions]);

  React.useEffect(() => {
    if (selected) setValue(selected[id]);
  }, [selected]);

  const onSelect = React.useCallback(
    (event) => {
      const value = event.target.value;
      const index = options.findIndex((e) => e[id] === value);

      if (index === -1) return;
      else {
        setSelected(options[index]);
        if (afterSelection) afterSelection(options[index]);
      }
    },
    [options]
  );
  return (
    <Autocomplete
      id="combo-box-demo"
      noOptionsText={"Code n'exist pas"}
      filterOptions={createFilterOptions({
        matchFrom: "contains",
        stringify: (option) => `[${option[id]}] ${option[display]}`,
      })}
      options={options}
      getOptionLabel={(option) => `${option[display]}`}
      style={{ ...style }}
      onChange={(event, value) => {
        if (value === null || value === undefined) setSelected(null);
        setSelected(value);
        if (afterSelection) afterSelection(value);
      }}
      renderOption={(option) => (
        <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
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
