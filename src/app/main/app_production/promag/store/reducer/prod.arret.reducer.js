import * as Actions from "../actions";

const initialState = {
  id: "",
  intervenant_object: null,
  date: "",
  heure_debut: "",
  heure_fin: "",
  description: "",
  zone: "",
  type_arret: "",
  equipement: "",
  duree_minute: 0,
  poste: null,
  intervenant: null,
};
const arret = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ARRET: {
      const { payload } = action;
      return {
        ...payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default arret;
