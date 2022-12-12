import * as Actions from "../actions";

const initialState = {
  results: [],
  summary: {},
  loading: false,
};
const etatProduction = function (state = initialState, action) {
  switch (action.type) {
    case Actions.ETAT_PRODUCTION_COLLECTION: {
      const { payload } = action;

      return {
        results: [...payload],
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default etatProduction;
