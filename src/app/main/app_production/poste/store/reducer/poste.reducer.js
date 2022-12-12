import * as Actions from "../actions";

const initialState = {
  intitule: "",
  periode: "JOUR",
  nbr_heure: 12,
};
const poste = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_POSTE: {
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

export default poste;
