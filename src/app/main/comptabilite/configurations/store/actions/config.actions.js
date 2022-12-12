import axios from "axios";
import { showMessage } from "app/store/actions/fuse";
import _ from "@lodash";
import * as Data from "./fake";
import * as Attributes from "./attributes";
import * as States from "./states";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const CONFIG_COLLECTION = "[COMPTA_CONFIG] CONFIG_COLLECTION";
export const CONFIG_SAVE = "[COMPTA_CONFIG] CONFIG_SAVE";
export const CONFIG_EDIT_ITEM = "[COMPTA_CONFIG] CONFIG_EDIT_ITEM";

export const ERROR = "[COMPTA_CONFIG] ERROR";
const JOURNALS_PATH = "journals/";
const EXERCICES_PATH = "exercices/";
const COMPTES_PATH = "comptes/";
const TIERS_PATH = "tiers/";
const DASHBOARD_PATH = "dashboard/";
const DOSSIER_PATH = "dossiers/";

export const GET_TABLE_DATA = "[APP_INPUT_TABLE] GET_TABLE_DATA";
export const GET_CONFIG_DATA = "[APP_INPUT_TABLE] GET_CONFIG_DATA";

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
    case "dossiers":
      config = {
        collectionName: "dossiers",
        icon: "folder_close.png",
        header: "Listes Dossiers",
        primary: "id",
        attributes: Attributes.dossier,
        columns: ["Entreprise", "Base Données", "Address"],
        itemState: States.dossier,
      };
      break;
    case "exercices":
      config = {
        collectionName: "exercices",
        icon: "task.png",
        header: "Listes Exercices",
        primary: "id",
        attributes: Attributes.exercice,
        columns: ["Année", "Intitulé", "Début", "Fin"],
        itemState: States.exercice,
      };
      break;

    case "compte":
      config = {
        collectionName: "compte",
        icon: "account.png",
        header: "Liste Comptes",
        primary: "num_compte",
        attributes: Attributes.comptes,
        columns: [
          "N°Compte",
          "Intitulé",
          "Avoir Tier",
          "Applique Rapprochement",
        ],
        itemState: States.compte,
      };
      break;
    case "journal":
      config = {
        collectionName: "journal",
        icon: "journal.png",
        header: "Listes Journaux",
        primary: "code",
        attributes: Attributes.journal,
        columns: ["Code", "Intitulé", "Nature", "Compte"],
        itemState: States.journal,
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
        itemState: States.tier,
      };
      break;

    case "dashboard":
      config = {
        collectionName: "dashboard",
        icon: "dashboard.png",
        header: "Listes Items",
        primary: "id",
        attributes: Attributes.dashboard,
        columns: ["Titre", "Fonction", "Couleur", "Couleur Carte", "Icône"],
        itemState: States.dashboard,
      };
      break;
    default:
      config.header = "Listes Journaux";
      config.icon = "journal.png";
      config.collectionName = "journal";
      break;
  }

  return {
    type: GET_CONFIG_DATA,
    payload: config,
  };
}

function buildLink(collection, page, search = undefined) {
  let link = DATA_SERVICE_URL;
  let path = "";
  switch (collection) {
    case "dossiers":
      path = DOSSIER_PATH;
      break;
    case "exercices":
      path = EXERCICES_PATH;
      break;
    case "journal":
      path = JOURNALS_PATH;
      break;

    case "compte":
      path = COMPTES_PATH;
      break;
    case "tiers":
      path = TIERS_PATH;
      break;

    case "dashboard":
      path = DASHBOARD_PATH;
      break;

    default:
      return undefined;
  }

  link = link + path;
  if (search !== undefined && search !== null && search !== "") {
    link = link + "?search=" + search + "&page=" + page;
  } else {
    link = link + "?page=" + page;
  }

  return link;
}

function buildLinkAction(collection) {
  let link = DATA_SERVICE_URL;
  let path = "";
  switch (collection) {
    case "dossiers":
      path = "save/?collection=dossier";
      break;
    case "exercices":
      path = "save/?collection=exercices";
      break;
    case "journal":
      path = "save/?collection=journal";
      break;

    case "compte":
      path = "save/?collection=compte";
      break;

    case "tiers":
      path = "save/?collection=tiers";
      break;

    case "dashboard":
      path = "save/?collection=dashboard";
      break;

    default:
      return undefined;
  }

  return link + path;
}

export function initCollection() {
  return {
    type: CONFIG_COLLECTION,
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
          type: CONFIG_COLLECTION,
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

export function save(collection, item, attributes) {
  let request = null;
  let link = buildLinkAction(collection);
  if (link === undefined)
    return {
      type: ERROR,
      payload: "votre lien de collection est éroné",
    };
  else {
    //post or put create this function in server to just save new data if exist or not
    request = axios.post(link, item);
  }
  let action = "add";
  if (item.id !== "" && item.id !== undefined && item.id !== null) {
    action = "edit";
  }
  if (item.code !== "" && item.code !== undefined && item.code !== null) {
    action = "edit";
  }

  if (
    item.num_compte !== "" &&
    item.num_compte !== undefined &&
    item.num_compte !== null
  ) {
    action = "edit";
  }
  return (dispatch) => {
    request
      .then((response) => {
        dispatch(
          showMessage({
            message: `Le ${collection} N°${item[attributes[0]["name"]]} - ${
              item[attributes[1]["name"]]
            } a été sauvgarder avec success`,
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
            autoHideDuration: 1200,
          })
        );
        dispatch({
          type: CONFIG_SAVE,
          payload: response.data,
          action: action,
        });
      })
      .catch((error) => {
        // dispatch({
        //   type: ERROR,
        //   payload: error,
        // });

        dispatch(
          showMessage({
            message: error,
            variant: "error",
            autoHideDuration: 3200,
            anchorOrigin: {
              vertical: "bottom", //top bottom
              horizontal: "center", //left center right
            },
          })
        );
      });
  };
}

export function setEditItem(item) {
  return {
    type: CONFIG_EDIT_ITEM,
    payload: item,
  };
}
