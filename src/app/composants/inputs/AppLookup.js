import React, { useEffect } from "react";
import axios from "axios";
import AppLookupInput from "./AppLookupInput";
import AppLookupTable from "./AppLookupTable";

export default function AppLookup(props) {
  const {
    context,
    name,
    label,
    style,
    onLeave,
    selected,
    setSelected,
    initial,
  } = props;
  const [value, setValue] = React.useState();
  const [filter, setFilter] = React.useState();
  const [openDialog, setOpenDialog] = React.useState(false);

  useEffect(() => {
    setValue(selected[context.primary]);
  }, [selected]);

  const handleChange = React.useCallback((event) => {
    const value = event.target.value;
    setFilter(value);
    setValue(value);
  }, []);

  function onDialogExit() {
    //if is required or not if(context ===)
    if (onLeave) onLeave(selected);
  }

  function onSelect(selected) {
    setSelected(selected);
  }
  return (
    <div>
      <AppLookupInput
        name={name}
        label={label}
        style={style}
        value={value}
        context={context}
        handleChange={handleChange}
        setOpenDialog={setOpenDialog}
        setSelected={setSelected}
        selected={selected}
        onLeave={onLeave}
        initial={initial}
      />
      <AppLookupTable
        onExit={onDialogExit}
        onSelect={onSelect}
        filter={filter}
        context={context}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        initial={initial}
      />
    </div>
  );
}
