import * as Actions from "../actions";

const initialState = {
  total: 0,
  min: 0,
  max: 0,
};
const devis = function (state = initialState, action) {
  switch (action.type) {
    case Actions.DEVIS_STATE: {
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

export default devis;
