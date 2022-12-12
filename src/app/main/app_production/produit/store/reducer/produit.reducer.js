import * as Actions from "../actions/";

const initialState = {
  id: "",
  designation: "",
  symbole: "",
  qte_initial: 0.0,
  qte_stock: 0.0,
  poids: 0.0,
  nbr_piece_wagon: 1,
  nbr_piece_palette_production: 1,
  nbr_piece_palette_emballage: 1,
  loading: false,
};
const produit = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_PRODUIT: {
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

export default produit;
