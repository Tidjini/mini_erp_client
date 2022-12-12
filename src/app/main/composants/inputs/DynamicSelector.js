import React from "react";

import AutoSelector from "./AutoSelector";

export default function DynamicSelector(props) {
  const {
    item,
    setItem,
    itemKey,
    display,
    label,
    direction,
    afterSelection,
    style,
    render,
    items,
    getItems,
  } = props;

  return (
    <AutoSelector
      label={label}
      direction={direction}
      defaultItems={items}
      itemKey={itemKey}
      display={display}
      tous={false}
      getItems={getItems}
      selected={item}
      setSelected={(i) => {
        setItem(i);
      }}
      afterSelection={afterSelection}
      style={style}
      render={render}
    />
  );
}
