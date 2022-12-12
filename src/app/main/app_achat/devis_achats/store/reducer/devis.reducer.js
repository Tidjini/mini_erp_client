import * as Actions from "../actions";
import {
  containsObject,
  onAddOrModifyArticle,
  onDeleteArticle,
} from "./features";
const initialState = {
  articles: [],
  table_compare: null,
  devis: {
    id: "",
    employe_responsable: "",
    date_devis: "",
    numero: "",
    statue: 1,
    demande_achat: "",
    remarque: "",
    devis_parent: "",
    numero_devis: "",
    modalite_reglement: "",
    modalite_paiement: "",
    date_validation: "",
    commercial: "",
    fournisseur: "",
    articles: [],
    articles_to_delete: [],
    devis_copies: [],
    attachements: [],
    copies: 0,

    total: 0.0,
    remise: 0.0,
    total_remise: 0.0,
    total_tva: 0.0,
    timbre: 0.0,
    autre_frais: 0.0,
    total_ttc: 0.0,
  },
  devis_copie: null,
  edit_article: {
    id: "",
    article: "",
    qte: 0,
    unite: "unite",
    prix_unite: 0.0,
    total: 0.0,
  },
  employees: [],
  attachements: [],
  attachements_deleted: [],
  error: "",
  devis_collection: { count: 0, next: null, previous: null, results: [] },
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.DEVIS: {
      return {
        ...state,
        devis: {
          ...state.devis,
          ...action.payload,
        },
      };
    }
    case Actions.SAVE_DEVIS: {
      return {
        ...state,
        devis: {
          ...state.devis,
          ...action.payload,
        },
      };
    }
    case Actions.DEVIS_COLLECTION: {
      return {
        ...initialState,
        devis_collection: {
          ...action.payload,
          results: [...action.payload.results],
        },
      };
    }

    case Actions.DELETE_DEVIS: {
      const devis = state.devis_collection.results;

      if (action.payload === null || action.payload === undefined) {
        return;
      }
      const index = devis.findIndex((e) => e.id === action.payload);

      if (index != -1) {
        devis.splice(index, 1);
      }
      return {
        ...state,
        devis_collection: {
          ...state.devis_collection,
          results: [...devis],
          count: state.devis_collection.count - 1,
        },
      };
    }

    case Actions.ADD_ARTICLE: {
      const result = onAddOrModifyArticle(state, action);
      return {
        ...state,
        devis: {
          ...action.devis,
          total: result[1],
          total_tva: result[2],
          total_ttc: result[3],
          articles: [...result[0]],
        },
        edit_article: {
          ...state.edit_article,
          id: "",
          article: "",
          qte: 0,
          unite: "unite",
          prix_unite: 0.0,
          total: 0.0,
        },
      };
    }
    case Actions.EDIT_ARTICLE: {
      return {
        ...state,
        edit_article: { ...action.payload },
      };
    }
    case Actions.DELETE_ARTICLE: {
      const result = onDeleteArticle(state, action);

      return {
        ...state,
        devis: {
          ...action.payload,

          total: result[1],
          total_tva: result[2],
          total_ttc: result[3],
          articles: [...result[0]],

          articles_to_delete: [
            ...state.devis.articles_to_delete,
            state.edit_article,
          ],
        },
        edit_article: {
          ...state.edit_article,
          id: "",
          article: "",
          qte: 0,
          unite: "unite",
          prix_unite: 0.0,
          total: 0.0,
        },
      };
    }
    case Actions.INIT_DEVIS_ACHAT: {
      return {
        ...state,
        devis_copie: null,
        devis: { ...initialState.devis },
      };
    }
    case Actions.COPIE_DEVIS: {
      return {
        ...state,
        devis_copie: { ...action.payload, open: action.open },
      };
    }

    case Actions.TABLE_COMPARE: {
      return {
        ...state,
        table_compare: { ...action.payload },
      };
    }

    case Actions.SELECT_COMPARE_CELL: {
      try {
        const table = state.table_compare;
        table.body[action.row].selected = action.index;

        return {
          ...state,
          table_compare: { ...table },
        };
      } catch (e) {
        return {
          ...state,
        };
      }
    }

    case Actions.ADD_ATTACHEMENTS: {
      const newOnes = [...state.attachements, action.payload];
      return {
        ...state,
        attachements: [...state.attachements, action.payload],
      };
    }
    case Actions.DELETE_ATTACHEMENT: {
      if (action.payload.id !== "") {
        return {
          ...state,
          attachements: [...action.attachements],
          attachements_deleted: [...state.attachements_deleted, action.payload],
        };
      }
      return {
        ...state,
        attachements: [...action.attachements],
      };
    }
    case Actions.GET_ATTACHEMENTS: {
      return {
        ...state,
        attachements: [...action.payload],
      };
    }

    case Actions.ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
