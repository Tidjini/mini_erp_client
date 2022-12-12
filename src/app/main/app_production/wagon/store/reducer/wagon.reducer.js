import * as Actions from "../actions";

const initialState = {
  numero: "",
  produit_designation: "",
  produit_simulation_designation: "",
  numero_int: 1,
  phase_actuel: "ATTENTE",
  phase_simulation: "ATTENTE",
  nbr_piece_wagon_actuel: 0,
  plein: false,
  produit: "",
  produit_simulation: "",
};
const wagon = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_WAGON: {
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

export default wagon;
