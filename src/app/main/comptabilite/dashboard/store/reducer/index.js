import * as Actions from "../actions";
import * as Data from "./data";

const initialState = {
  exercices: [],
  dossiers: [],
  comptes: {
    results: [],
    count: 0,
    previous: null,
    next: null,
    page_size: 10,
  },
  compte_table: {
    results: [],
    count: 0,
    previous: null,
    next: null,
    page_size: 10,
    summary: {
      debit: 0.0,
      credit: 0.0,
      solde: 0.0,
    },
  },
  bilan: {
    label: "BILAN RÉCAP",
    icon: "account_balance_wallet",
    color_card: "#ece4db50",
    color: "#073b4c",
    solde: 1,
    passif: 1,
    actif: 1,
  },
  result: {
    label: "COMPTE RESULTAT",
    icon: "airplay",
    color_card: "#E3EEF2",
    color: "#073b4c",
    solde: 1,
    charge: 1,
    produit: 1,
  },
  balance: {
    title: "BALANCE",
    color: "#fafdff",
    compte: "balance",
    color_card: "#005F73",
    function: "scf('s_401')",
    icon: "fitness_center",
    value: {
      solde_debit: 0.0,
      solde_credit: 0.0,
    },
  },
  exercice_actif: {
    id: "",
    intitule: "",
    annee: "",
    description: "",
    debut: "",
    fin: "",
  },
  dossier_actif: {
    entreprise: "",
    description: "",
    address: "",
    database_name: "",
    database_engine: "",
    database_user: "",
    database_password: "",
    database_host: "",
    database_port: "",
  },
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_EXERCICES: {
      return {
        ...state,
        exercices: [...action.payload],
      };
    }
    case Actions.GET_DOSSIERS: {
      return {
        ...state,
        dossiers: [...action.payload],
      };
    }
    case Actions.GET_ACTIVE_EXERCICE: {
      let result = action.payload;
      if (action.payload === false) {
        result = initialState.exercice_actif;
      }
      return {
        ...state,
        exercice_actif: { ...result },
      };
    }
    case Actions.GET_ACTIVE_DOSSIER: {
      return {
        ...state,
        dossier_actif: { ...state.dossier_actif, ...action.payload },
      };
    }
    case Actions.GET_BALANCE: {
      return {
        ...state,
        balance: { ...state.balance, value: { ...action.payload } },
      };
    }

    case Actions.GET_DASHBOARD: {
      return {
        ...state,
        comptes: {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
          results: [...action.payload],
          page_size: 10,
        },
      };
    }
    case Actions.GET_COMPTE_TABLE: {
      return {
        ...state,
        compte_table: {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
          results: [...action.payload.results],
          summary: { ...action.payload.summary },
          page_size: 10,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
