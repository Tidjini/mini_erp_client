import * as Actions from "../actions";
import * as Data from "./data";
import * as Controller from "../../controllers/EcritureRow";
import _ from "@lodash";

const initialState = {
  edit_cell: 1,
  edit_line: 0,
  ecritures: [],
  ecritures_to_delete: [],
  entete: {
    journal: "",
    date: "",
    num_piece: "",
    num_mouvement: 0,
    label: "",
    statut: "BROUILLARD",
  },
  saved: false,

  default_journal: {
    code: "",
    intitule: "",
    nature: "",
    compte: "",
    account: null,
  },
  summary: { debit: 0.0, credit: 0.0, solde: 0.0 },

  ecriture: {
    id: "",
    num_ligne: 0,
    num_mouvement: 0,
    num_piece: "",
    date: "",
    date_echeance: "",
    compte: "",
    journal: "",
    tier: "",
    libelle: "",
    reference: "",

    debit: 0.0,
    credit: 0.0,

    appliquer_rapprochement: false,
    rapproche: false,
    lettre_rapprochement: "LDR",
    statut: "BROUILLARD",

    third: {
      code: "",
      raison_social: "",
    },
    daily: {
      code: "",
      intitule: "",
    },
    account: {
      num_compte: "",
      intitule: "",
      appliquer_rapprochement: false,
      tier: false,
    },
  },

  collection: {
    results: [],
    count: 0,
    previous: null,
    next: null,
    page_size: 10,
  },
  selectedItem: null,
  config: {
    collectionName: "",
    icon: "",
    header: "",
    primary: "",
    attributes: [],
    columns: [],
    itemState: null,
  },
  collectionName: "",
  exercice_actif: {
    id: 0,
    label: "",
    annee: "",
    description: "",
    entreprise: "",
    address: "",
  },
};
//collection ... and down table base compte, journal, ...

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ACTIVE_EXERCICE: {
      return {
        ...state,
        saved: false,
        exercice_actif: { ...action.payload },
      };
    }

    case Actions.CLEAR_ECRITURE: {
      return {
        ...state,
        ecritures: [],
        ecritures_to_delete: [],
        entete: { ...state.entete, num_piece: "", num_mouvement: 0 },
        saved: false,
      };
    }
    case Actions.GET_ECRITURE_SERVER: {
      return {
        ...state,
        ecritures: [...action.payload],
        ecritures_to_delete: [],
        entete: { ...state.entete, ...action.entete },
        saved: false,
      };
    }
    case Actions.SAVE_ECRITURE_SERVER: {
      return {
        ...state,
        ecritures: [...action.payload],
        entete: { ...state.entete, ...action.entete },
        saved: true,
      };
    }

    case Actions.ADD_ECRITURE: {
      const item = action.payload;
      item.num_ligne = Controller.getNumLigne(state.ecritures);
      return {
        ...state,
        ecritures: [...state.ecritures, item],
      };
    }

    case Actions.GET_DEFAULT_JOURNAL: {
      const journal = action.payload;
      return {
        ...state,
        default_journal: { ...journal },
      };
    }

    case Actions.EDIT_ECRITURE: {
      const item = action.payload;
      const ecrits = state.ecritures;
      const index = state.ecritures.findIndex(
        (e) => e.num_ligne == item.num_ligne
      );
      const newArray = [...state.ecritures];
      if (index !== -1) {
        newArray[index] = { ...newArray[index], ...action.payload };
      }

      return {
        ...state,
        ecritures: newArray,
      };
    }
    case Actions.DELETE_ECRITURE: {
      const item = action.payload;
      const ecrits = state.ecritures;
      const index = state.ecritures.findIndex(
        (e) => e.num_ligne == item.num_ligne
      );
      let deleted = false;
      if (index !== -1) {
        ecrits.splice(index, 1);
        deleted = true;
      }

      return {
        ...state,
        ecritures: [...ecrits],
        ecritures_to_delete: deleted
          ? [...state.ecritures_to_delete, item]
          : [...state.ecritures_to_delete],
      };
    }

    case Actions.COLLECTION: {
      return {
        ...state,
        collection: {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
          results: [...action.payload.results],
          page_size: 10,
        },
      };
    }

    case Actions.SWITCH_ENTITY: {
      return {
        ...state,
        config: { ...action.payload },
        collection: {
          results: [],
          count: 0,
          previous: null,
          next: null,
          page_size: 10,
        },
      };
    }
    case Actions.SELECTED_ITEM: {
      return {
        ...state,
        selectedItem: { ...action.payload },
        collectionName: action.collectionName,
      };
    }

    case Actions.ECRITURE_SAVE: {
      const results = state.ecritures.results;
      const index = results.findIndex((e) => e.id === action.payload.id);

      if (index == -1 || action.action === "add") {
        const count = state.ecritures.length + 1;
        return {
          ...state,
          ecritures: {
            results: [...results, action.payload],
            count: count,
            previous: null,
            next: null,
            page_size: 10,
          },
        };
      }

      results.splice(index, 1, action.payload);
      return {
        ...state,
        ecritures: {
          ...state.ecritures,
          results: [...results],
        },
      };
    }
    case Actions.ECRITURE_COLLECTION: {
      return {
        ...state,
        ecritures: {
          results: [...action.payload.results],
          count: action.payload.count,
          previous: action.payload.previous,
          next: action.payload.next,
          page_size: 10,
        },
      };
    }

    case Actions.EDIT_CELL: {
      return {
        ...state,
        edit_cell: action.payload,
      };
    }
    case Actions.EDIT_LINE: {
      let line = action.payload;
      if (line > state.ecritures.length + 1) {
        line = state.ecritures.length + 1;
      }
      return {
        ...state,
        edit_line: line,
      };
    }

    case Actions.ECRITURE_SUMMARY: {
      return { ...state, summary: { ...action.payload } };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
