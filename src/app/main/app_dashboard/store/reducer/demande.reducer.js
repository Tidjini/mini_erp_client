import * as Actions from "../actions";

const initialState = {
  total: 0,
  confirmes: 0,
  annules: 0,
  instances: 0,
};
const demande = function (state = initialState, action) {
  switch (action.type) {
    case Actions.DEMANDE_STATE: {
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

export default demande;
