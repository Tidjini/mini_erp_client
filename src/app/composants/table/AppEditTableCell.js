import React from "react";

import { TableCell, Typography } from "@material-ui/core";
import AppInput from "app/composants/inputs/AppInput";
import ComboBox from "app/composants/inputs/ComboBox";

function getCellInput(
  cell,
  value,
  onValueChanged,
  onPressEnter,
  getItems = undefined,
  defaults = undefined
) {
  switch (cell.type) {
    case "list":
      return (
        <ComboBox
          label={cell.label}
          direction={cell.direction}
          getOptions={getItems}
          defaultOptions={defaults}
          id={cell.id}
          display={cell.display}
          selected={value}
          setSelected={(item) => {
            onValueChanged(item);
          }}
          width={cell.inputWidth}
          height={cell.inputHeight}
          tous={false}
          afterSelection={(item) => {
            onPressEnter(item);
          }}
        />
      );
    default:
      return (
        <AppInput
          name={cell.name}
          placeholder={cell.placeholder}
          type={cell.type}
          format={cell.format}
          horizontal={true}
          handleChange={(e) => {
            onValueChanged(e);
          }}
          value={value}
          width={cell.inputWidth}
          height={cell.inputHeight}
          onEnter={(value) => onPressEnter(value)}
          onTab={(value) => {}}
        />
      );
  }
}
export default function AppEditTableCell(props) {
  const {
    cell,
    value,
    key,
    onDoubleClick,
    onValueChanged,
    onPressEnter,
    isEditing,
    getItems,
    defaults,
    children,
  } = props;
  return (
    <TableCell
      className="truncate"
      component="th"
      key={key}
      width={cell.cellStyle.width}
      style={cell.cellStyle}
      onDoubleClick={() => {
        onDoubleClick(cell);
      }}
    >
      {isEditing
        ? getCellInput(
            cell,
            value,
            onValueChanged,
            onPressEnter,
            getItems,
            defaults
          )
        : children}
    </TableCell>
  );
}
