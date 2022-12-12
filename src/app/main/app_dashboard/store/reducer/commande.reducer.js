import * as Actions from "../actions";

const initialState = {
  general: {
    total: 0,
    total_ttc: 0.0,
    totaux: [],
  },
  days: {
    current: 0.0,
    growth: 0.0,
    dates: [],
    values: [],
  },
  weeks: {
    current: 0.0,
    growth: 0.0,
    dates: [],
    values: [],
  },
  months: {
    current: 0.0,
    growth: 0.0,
    dates: [],
    values: [],
  },
};
const commande = function (state = initialState, action) {
  switch (action.type) {
    case Actions.COMMANDE_STATE: {
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

export default commande;
