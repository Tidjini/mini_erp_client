import axios from "axios";
import { showMessage } from "app/store/actions/fuse";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";
import _ from "@lodash";
import * as Attributes from "./attributes";

export const COLLECTION = "[COMPTA_ECRITURE] CONFIG_COLLECTION";
export const SWITCH_ENTITY = "[COMPTA_ECRITURE] SWITCH_ENTITY";
export const SELECTED_ITEM = "[COMPTA_ECRITURE] SELECTED_ITEM";
export const ERROR = "[COMPTA_ECRITURE] ERROR";

export const EDIT_LINE = "[COMPTA_ECRITURE] EDIT_LINE";
export const EDIT_CELL = "[COMPTA_ECRITURE] EDIT_CELL";

const JOURNALS_PATH = "journals/";
const PERIODS_PATH = "periods/";
const COMPTES_PATH = "comptes/";
const TIERS_PATH = "tiers/";
const BANQUES_PATH = "banques/";

export function switchConfig(name) {
  let config = {
    collectionName: "",
    icon: "",
    header: "",
    primary: "code",
    attributes: [
      "code",
      "label",
      "debit",
      "credit",
      "solde_debit",
      "solde_credit",
    ],
    columns: [
      "code",
      "label",
      "debit",
      "credit",
      "solde debit",
      "solde credit",
    ],
  };
  config.collectionName = name;
  switch (name) {
    case "compte":
      config = {
        collectionName: "compte",
        icon: "account.png",
        header: "Liste Comptes",
        primary: "num_compte",
        attributes: Attributes.comptes,
        columns: [
          "N° Compte",
          "Intitule",
          "Avoir Tier",
          "Appliquer Rapprochement",
        ],
        required: true,
      };
      break;
    case "tiers":
      config = {
        collectionName: "tiers",
        icon: "tier.png",
        header: "Liste Tiers",
        primary: "code",
        attributes: Attributes.tier,
        columns: ["Code", "Raison Social"],
        required: false,
      };
      break;
    case "journal":
      config = {
        collectionName: "journal",
        icon: "journal.png",
        header: "Listes Journaux",
        primary: "code",
        attributes: Attributes.journal,
        columns: ["code", "label", "nature"],
        required: false,
      };

      break;
    case "banques":
      config = {
        collectionName: "banques",
        icon: "bank.png",
        header: "Liste Banques",
        primary: "code",
        attributes: Attributes.banque,
        columns: ["code", "label"],
        required: false,
      };
      break;
    case "period":
      config = {
        collectionName: "period",
        icon: "periode.png",
        header: "Listes Periodes",
        primary: "code",
        attributes: Attributes.periode,
        columns: ["code", "label"],
        required: false,
      };

      break;
    case "dossiers":
      config.header = "Listes Dossiers";
      config.icon = "folders.png";
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
    case "period":
      path = PERIODS_PATH;
      break;
    case "compte":
      path = COMPTES_PATH;
      break;

    case "tiers":
      path = TIERS_PATH;
      break;

    case "banques":
      path = BANQUES_PATH;
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

export function setEditLine(line) {
  return {
    type: EDIT_LINE,
    payload: line,
  };
}

export function setEditCell(cell) {
  if (cell === 0) cell = 1;
  if (cell > 6) cell = 1;
  return {
    type: EDIT_CELL,
    payload: cell,
  };
}
