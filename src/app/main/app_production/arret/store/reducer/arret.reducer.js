import * as Actions from "../actions";

const initialState = {
  id: "",
  intervenant_object: null,
  description: "",
  zone: "",
  type_arret: "PRODUCTION",
  equipement: "",
  duree_minute: 0,
  poste: "",
  date: "",
  heure_debut: "08:00",
  heure_fin: "08:05",
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
