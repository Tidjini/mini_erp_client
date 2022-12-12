import * as Actions from "../actions";

const initialState = {
  general: {
    date: "",
    empilements: 0,
    enfournements: 0,
    defournements: 0,
    emballages: 0,
    production_arrets: "00:00",
    emballage_arrets: "00:00",
    stocks: [],
  },
  statistics: [],
  autre: {
    date: [],
    empilements: [],
    enfournements: [],
    defournements: [],
    emballages: [],
    production_arrets: [],
    emballage_arrets: [],
  },
};
const production = function (state = initialState, action) {
  switch (action.type) {
    case Actions.PRODUCTION_STATE: {
      const { payload } = action;
      console.log(payload)
      return {
        ...state,
        ...payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default production;
