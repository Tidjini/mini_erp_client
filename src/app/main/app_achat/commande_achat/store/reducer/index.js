import * as CollectionActions from "../actions/collection.actions";
import * as ViewActions from "../actions/view.actions";

const initialState = {
  commandes: {
    results: [],
    count: 0,
    previous: null,
    next: null,
    page_size: 200,
    summary: {},
  },
  attachements: [],
  attachements_deleted: [],

  commande: {
    id: null,
    fournisseur_object: null,
    articles: [],
    numero: "",
    numero_commande: "",
    label: "",
    date_commande: null,
    remarque: null,
    statut: "",
    applique_tva: false,
    modalite_reglement: "A TÉRME",
    modalite_paiement: "Chèque",
    commercial: null,
    total: 0.0,
    remise: 0.0,
    total_remise: 0.0,
    total_tva: 0.0,
    timbre: 0.0,
    autre_frais: 0.0,
    total_ttc: 0.0,
    employe_responsable: null,
    user_creation: null,
    user_modification: null,
    employe: null,
    demande_achat: null,
    devis_achat: null,
    fournisseur: null,
    devis_achat_numero: "",
  },
  loading: false,
};
const reducer = function (state = initialState, action) {
  switch (action.type) {
    case CollectionActions.COMMANDE_COLLECTION: {
      const results = action.payload.previous
        ? [...state.commandes.results, ...action.payload.results]
        : [...action.payload.results];
      return {
        ...state,
        commandes: {
          results: [...results],
          count: action.payload.count,
          previous: action.payload.previous,
          next: action.payload.next,
          page_size: 200,
        },
        loading: false,
      };
    }

    case CollectionActions.LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case ViewActions.COMMANDE_VIEW: {
      return {
        ...state,
        commande: {
          ...initialState.commande,
          ...action.payload,
          articles: [...action.payload.articles],
        },
      };
    }
    case ViewActions.GET_ATTACHEMENTS: {
      return {
        ...state,
        attachements: [...action.payload],
        attachements_deleted: [],
      };
    }

    case ViewActions.ADD_ATTACHEMENTS: {
      return {
        ...state,
        attachements: [...state.attachements, action.payload],
      };
    }
    case ViewActions.DELETE_ATTACHEMENT: {
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

    default: {
      return state;
    }
  }
};

export default reducer;
