import * as Actions from "../actions/";

const initialState = {
  id: "",
  details: [],
  numero: "",
  navire: "",
  gros: "",
  qte_theorique: 0.0,
  qte_effective: 0.0,
  qte_difference: 0.0,
  debut: "",
  fin: "",
  cloture: false,
  chauffeurs: 0,
  durre: 0,
  log: [],
  loading: false,
};
const view = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_OPERATION: {
      const { payload } = action;
      const { details, log } = payload;
      return {
        ...payload,
        details: [...details],
        log: [...log],
        loading: false,
      };
    }

    case Actions.SAVE_DETAIL: {
      const { payload } = action;
      const { details } = state;

      const index = details.findIndex((d) => d.id === payload.id);
      if (index !== -1) {
        details[index] = { ...payload };
      } else {
        details.push(payload);
      }

      return {
        ...state,
        details: [...details],
      };
    }

    case Actions.LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default view;
