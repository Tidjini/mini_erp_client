import * as Actions from "../actions";

const initialState = {
  next: null,
  previous: null,
  count: 0,
  pages: 1,
  results: [],

  item: {
    id: "",
    service_nom: null,
    superviseur_nom: null,
    statue_item: null,
    type: null,
    nom: "",
    prenom: "",
    telephone: "",
    photo: null,
    longitude: 0.0,
    latitude: 0.0,
    offline: true,
    offline_gps: true,
    service: null,
    superviseur: null,
    statue: null,
    poste: null,
  },
};
const employe = function (state = initialState, action) {
  switch (action.type) {
    case Actions.EMPLOYE_COLLECTION: {
      const { payload } = action;
      return { ...state, ...payload, results: [...payload.results] };
    }

    case Actions.SAVE:
    case Actions.RETRIEVE: {
      const { payload } = action;
      console.log("payload", payload);

      return { ...state, item: { ...state.item, ...payload } };
    }
    case Actions.DESTROY: {
      return { ...state, item: { ...state.item } };
    }
    default: {
      return state;
    }
  }
};

export default employe;
