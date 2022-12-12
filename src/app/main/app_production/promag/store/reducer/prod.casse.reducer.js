import * as Actions from "../actions";

const initialState = {
  id: "",
  produit: null,
  equipe: "",
  responsable: null,
  poste: "",
  type: "EXTERIEUR",
  date: "",
  nbr_piece: 0.0,
  nbr_palette: 0.0,
  produit_object: null,
  responsable_object: null,
};
const casse = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_CASSE: {
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

export default casse;
