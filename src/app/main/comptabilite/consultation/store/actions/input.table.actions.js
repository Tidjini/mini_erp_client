import axios from "axios";
import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";

const journal = [
  {
    name: "code",
    placeholder: "Code (Max 10)",
    type: "text",
    label: "Code",
    maxLength: 6,
    readOnly: 1,
    onlyDigit: false,
  },
  {
    name: "intitule",
    placeholder: "Intitule (Max 60)",
    type: "text",
    label: "Intitule",
    maxLength: 60,
    readOnly: 0,
    onlyDigit: false,
  },
  {
    name: "nature",
    placeholder: "Nature (Max 30)",
    type: "text",
    label: "Nature",
    maxLength: 30,
    readOnly: 0,
    onlyDigit: false,
  },
];
export const COLLECTION = "[COMPTA_CONSULTATION] CONFIG_COLLECTION";
export const SWITCH_ENTITY = "[COMPTA_CONSULTATION] SWITCH_ENTITY";
export const SELECTED_ITEM = "[COMPTA_CONSULTATION] SELECTED_ITEM";
export const ERROR = "[COMPTA_CONSULTATION] ERROR";

const JOURNALS_PATH = "journals/";

export function switchConfig(name) {
  let config = {};
  config.collectionName = name;
  switch (name) {
    case "journal":
      config = {
        collectionName: "journal",
        icon: "journal.png",
        header: "Listes Journaux",
        primary: "code",
        attributes: journal,
        columns: ["Code", "Intitule", "Nature"],
        required: false,
      };

      break;

    default:
      config.header = "Listes Journaux";
      config.icon = "journal.png";
      config.collectionName = "journal";
      break;
  }

  return {
    type: SWITCH_ENTITY,
    payload: config,
  };
}

function buildLink(collection, page, search = undefined) {
  let link = DATA_SERVICE_URL;
  let path = "";
  switch (collection) {
    case "journal":
      path = JOURNALS_PATH;
      break;

    default:
      return undefined;
  }

  link = link + path;

  link =
    search !== undefined && search !== null
      ? link + "?page=" + page + "&search=" + search
      : link + "?page=" + page;

  return link;
}

function buildGetItemLink(collection, attribute, value) {
  const path =
    "get/?collection=" +
    collection +
    "&attribute=" +
    attribute +
    "&value=" +
    value;
  // switch (collection) {
  //   case "journal":
  //     break;
  //   case "period":
  //     path = "get/?collection=period&code=" + value;
  //     break;
  //   case "compte":
  //     path = "get/?collection=compte&code=" + value;
  //     break;

  //   default:
  //     return undefined;
  // }

  return DATA_SERVICE_URL + path;
}

export function initCollection() {
  return {
    type: COLLECTION,
    payload: { results: [], count: 0, next: null, previous: null },
  };
}
//get with search
export function getCollection(collection, page, search = undefined) {
  const link = buildLink(collection, page, search);

  if (link === undefined) {
    return {
      type: ERROR,
      payload: "votre lien de collection est éroné",
    };
  }

  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: COLLECTION,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR,
          payload: error,
        });
      });
  };
}

export function getItem(collection, attribute, value) {
  const link = buildGetItemLink(collection, attribute, value);

  if (link === undefined) {
    return {
      type: ERROR,
      payload: "votre lien de collection est éroné",
    };
  }

  const request = axios.get(link);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: SELECTED_ITEM,
          payload: response.data,
          collectionName: collection,
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR,
          payload: error,
        });
      });
  };
}

export function setSelectedItem(collection, item) {
  return {
    type: SELECTED_ITEM,
    payload: item,
    collectionName: collection,
  };
}
