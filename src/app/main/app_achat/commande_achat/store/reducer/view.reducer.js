import * as Actions from "../actions/view.actions";

const initialState = {
  commande: {
    id: null,
    fournisseur_object: null,
    articles: [],
    numero: "",
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
};
//collection ... and down table base compte, journal, ...

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.COMMANDE_VIEW: {
      return {
        ...state,
        commande: {
          ...state.commande,
          ...action.payload,
          articles: [...action.payload.articles],
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
