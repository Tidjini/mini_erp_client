import * as Actions from "../actions";

const initialState = {
  mouvements: {
    results: [],
    count: 0,
    previous: null,
    next: null,
    page_size: 1000,
    summary: {},
  },
  ecritures: {
    results: [],
    count: 0,
    previous: null,
    next: null,
    page_size: 200,
    summary: {},
  },
  loading: false,
  default_journal: {
    code: "",
    intitule: "",
    nature: "",
    compte: "",
    account: null,
  },
  summary: { debit: 0.0, credit: 0.0, solde: 0.0 },

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
    case Actions.LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case Actions.GET_ACTIVE_EXERCICE: {
      return {
        ...state,
        exercice_actif: { ...action.payload },
      };
    }

    case Actions.GET_ECRITURE_LIST: {
      const results = action.payload.previous
        ? [...state.ecritures.results, ...action.payload.results]
        : [...action.payload.results];
      return {
        ...state,
        ecritures: {
          results: [...results],
          count: action.payload.count,
          previous: action.payload.previous,
          next: action.payload.next,
          page_size: 50,
        },
        loading: false,
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

    case Actions.GET_MOUVEMENT_LIST: {
      return {
        ...state,
        mouvements: {
          results: [...action.payload.results],
          count: action.payload.count,
          previous: action.payload.previous,
          next: action.payload.next,
          page_size: 1000,
        },
        loading: false,
      };
    }

    // case Actions.ECRITURE_SUMMARY: {
    //   return { ...state, summary: { ...action.payload } };
    // }

    default: {
      return state;
    }
  }
};

export default reducer;
