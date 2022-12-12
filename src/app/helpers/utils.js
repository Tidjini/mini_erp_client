import axios from "axios";
// import XLSX from "xlsx";
import React, { useEffect, useState, useRef } from "react";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const getIdFromUrl = (url) => {
  if (url == null || url == undefined) return;
  else {
    const spArray = url.split("/");
    return spArray[spArray.length - 2];
  }
};

export function getUnique(array) {
  var uniqueArray = [];
  var uniqueHelper = [];

  // Loop through array values

  for (let i = 0; i < array.length; i++) {
    if (uniqueHelper.indexOf(array[i].url) === -1) {
      uniqueArray.push(array[i]);
      uniqueHelper.push(array[i].url);
    }
  }
  return uniqueArray;
}

export const constructUrlFromId = (entity, id) => {
  return DATA_SERVICE_URL + entity + "/" + id + "/";
};

export const normalDateFormat = (date) => {
  var dateInstance = new Date(date);
  return ` ${dateInstance.getDate()}/${dateInstance.getMonth()}/${dateInstance.getFullYear()} `;
};
export const dateInputFormat = (date) => {
  var dateInstance = new Date(date);
  return ` ${dateInstance.getMonth()}/${dateInstance.getDate()}/${dateInstance.getFullYear()} `;
};
export const normalHeureFormat = (date) => {
  var dateInstance = new Date(date);
  return ` -- ${dateInstance.getHours()}:${dateInstance.getMinutes()} `;
};

export const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm",
]
  .map(function (x) {
    return "." + x;
  })
  .join(",");

/* generate an array of column objects */
// export const make_cols = (refstr) => {
//   let o = [],
//     C = XLSX.utils.decode_range(refstr).e.c + 1;
//   for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
//   return o;
// };

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// export {
//   openDialog,
//   openNewDialog,
//   closeDialog,
//   closeNewDialog,
//   CLOSE_DIALOG,
//   CLOSE_NEW_DIALOG,
//   OPEN_NEW_DIALOG,
//   OPEN_DIALOG,
//   SEARCH_TEXT,
//   setSearchText,
//   getCollectionPerPage,
//   GET_COLLECTION_ALL,
//   GET_COLLECTION_PAGE,
//   SAVE_ITEM,
//   saveItem,
//   GET_ITEM,
//   newItem,
//   getItem,
//   getAllPagedCollection,
//   SET_LOADING,
//   setLoading,
//   GET_CURRENT_PAGE,
//   getCurrentPage,
//   getAllCollection,
//   DELETE_ITEM,
//   deleteItem,
//   initSelectedItem,
//   INIT_SELECTED_ITEM,
//   DEFAULT_URL_PATH,
// } from "./actions";

export function localFormat(prefix, value, suifix) {
  if (value == undefined) return prefix + " " + suifix;
  else {
    return (
      prefix +
      Number(value).toLocaleString("fr-FR", {
        minimumFractionDigits: 0,
      }) +
      " " +
      suifix
    );
  }
}
export function display(object, value) {
  try {
    if (object == undefined || object == null) return "";
    else if (value == undefined || value == null || value.trim() == "")
      return object;
    else {
      return object[value];
    }
  } catch (error) {
    return "";
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
}

export function getValue(data, fields, upper) {
  try {
    const split = fields.split(".");
    if (split.length == 1)
      return upper ? data[split[0]].toUpperCase() : data[split[0]];

    if (split.length == 2)
      return upper
        ? data[split[0]][split[1]].toUpperCase()
        : data[split[0]][split[1]];
    return undefined;
  } catch (error) {
    return undefined;
  }
}

export function boolToData(data, fields, upper, trueValue, falseValue) {
  const value = getValue(data, fields, upper);
  if (value == true) return trueValue;
  if (value == false) return falseValue;
  return value;
}

export function getStyle(style, att, value) {
  let s = { ...style };
  s[att] = value;
  return s;
}

export function styleCompile(data, fields, operators, conditions) {
  const values = getMultiValueArray(data, fields);
}

export function getMultiValue(data, fields, upper, suifix, dataTable) {
  if (fields === undefined) return undefined;
  const split = fields.split("|");
  let suite = suifix;
  if (suite === undefined) suite = "";
  if (split.length > 1) {
    return split.map((flds) => getValue(data, flds, upper) + " ") + suite;
  }
  if (split.length == 1 && dataTable === undefined)
    return getValue(data, split[0], upper) + suite;
  if (split.length == 1 && dataTable !== undefined)
    return dataTable[getValue(data, split[0], upper)] + suite;
  return undefined;
}

export function getMultiValueArray(data, fields, dataTable) {
  if (fields === undefined) return undefined;
  const split = fields.split("|");
  let result = [];
  if (split.length > 1) {
    split.map((flds) => result.push(getValue(data, flds, false)));
  }
  if (split.length == 1 && dataTable === undefined)
    result.push(getValue(data, split[0], false));
  if (split.length == 1 && dataTable !== undefined)
    result.push(dataTable[getValue(data, split[0], false)]);
  return result;
}

export function getDate(date) {
  if (date === undefined || date === null || date === "") return "";
  const dateTime = new Date(date);
  return `${("0" + dateTime.getDate()).slice(-2)}/${(
    "0" +
    (dateTime.getMonth() + 1)
  ).slice(-2)}/${dateTime.getFullYear()}`;
}

export function convertItemToColumns(item, columns, clicks = []) {
  const result = [];
  columns.map((column, index) => {
    let value = getCustomValue(column.type, item[column.id]);

    let col = { ...column, value: value };
    const i = clicks.findIndex((e) => e.col === column.id);
    if (i !== -1) {
      col = { ...col, onClick: clicks[i].function };
    }
    result.push(col);
  });

  return result;
}

export function convertToTonne(kg) {
  const tonnes = Math.floor(kg / 1000);
  const rest = kg % 1000;
  if (rest > 0 && tonnes > 0) return `${tonnes} T / ${rest} KG`;
  else if (tonnes > 0) return `${tonnes} T`;
  else if (rest > 0) return `${rest} KG`;
  else return "Non Définie";
}

export function getColumns(header = []) {
  const columns = [];
  header.forEach((column, index) => {
    columns.push({
      id: column.id,
      align: "left",
      disablePadding: false,
      label: column.label,
      sort: true,
      cellStyle: {
        border: "1px solid #9E9E9E60",
        borderWidth: index === header.length - 1 ? "1px" : "1px 0 1px 1px",
        background: "#e8e8e8",
        ...column.cellStyle,
      },
      contentStyle: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#474747",
        ...column.contentStyle,
      },
    });
  });

  return columns;
}

export function getCustomValue(type, value) {
  switch (type) {
    case "date":
      value = getDate(value);
      break;
    case "montant":
      value = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "DZD",
      }).format(value);
      break;
    default:
      break;
  }
  return value;
}
