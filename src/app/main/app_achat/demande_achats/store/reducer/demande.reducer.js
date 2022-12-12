import * as Actions from "../actions";

import { containsObject, onAddOrModifyArticle } from "./features";
const initialState = {
  articles: [],
  demande: {
    id: "",
    date_demande: "",
    remarque: "",
    employe_nom_complet: "",
    service_name: "",
    entreprise_name: "",
    articles: [],
    articles_to_delete: [],
    statue: 1,
    urgence: 1,
    numero_bon: "",
    label: "",
  },
  edit_article: null,
  employees: [],
  attachements: [],
  attachements_deleted: [],
  devis: null,
  error: "",
  demande_collection: { count: 0, next: null, previous: null, results: [] },
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.NEW_DEMANDE: {
      return {
        ...state,
        demande: {
          ...initialState.demande,
          numero: action.payload.numero,
        },
      };
    }
    case Actions.DEMANDE: {
      return {
        ...state,
        demande: {
          ...state.demande,
          ...action.payload,
        },
      };
    }
    case Actions.DEMANDE_COLLECTION: {
      return {
        ...initialState,
        demande_collection: {
          ...action.payload,
          results: [...action.payload.results],
        },
      };
    }

    case Actions.DELETE_DEMANDE: {
      const demandes = state.demande_collection.results;

      if (action.payload === null || action.payload === undefined) {
        return;
      }
      const index = demandes.findIndex((e) => e.id === action.payload);

      if (index != -1) {
        demandes.splice(index, 1);
      }
      return {
        ...state,
        demande_collection: {
          ...state.demande_collection,
          results: [...demandes],
          count: state.demande_collection.count - 1,
        },
      };
    }

    case Actions.SAVE_DEMANDE: {
      return {
        ...state,
        demande: {
          ...action.payload,
          articles: [...action.payload.articles],
          articles_to_delete: [],
        },
        edit_article: {
          ...state.edit_article,
          id: "",
          article: "",
          qte: 0,
          unite: "unite",
        },
      };
    }
    case Actions.EMPLOYES_LIST: {
      return {
        ...state,
        employees: [...action.payload],
      };
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
    case Actions.DEMANDE_TO_DEVIS: {
      return {
        ...state,
        devis: { ...action.payload, open: action.open },
      };
    }

    case Actions.ADD_ARTICLE: {
      //modify article by edit
      const result = onAddOrModifyArticle(state, action);

      return {
        ...state,
        demande: {
          ...action.demande,
          articles: [...result],
        },
        edit_article: {
          ...state.edit_article,
          id: "",
          article: "",
          article_id: "",
          qte: 0,
          unite: "unite",
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
      if (state.edit_article === null) return { ...state };
      const containes = containsObject(
        state.edit_article,
        state.demande.articles,
        "article"
      );
      const articles = state.demande.articles;

      if (containes[0] === true) {
        articles.splice(containes[1], 1);
      }
      return {
        ...state,
        demande: {
          ...action.payload,
          articles: [...articles],
          articles_to_delete: [
            ...state.demande.articles_to_delete,
            state.edit_article,
          ],
        },
        edit_article: {
          ...state.edit_article,
          id: "",
          article: "",
          qte: 0,
          unite: "unite",
        },
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
