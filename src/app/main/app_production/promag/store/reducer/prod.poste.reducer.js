import * as Actions from "../actions";

const initialState = {
  results: [],
  loading: false,
};
const postes = function (state = initialState, action) {
  switch (action.type) {
    case Actions.POSTE_COLLECTION: {
      const { payload } = action;
      const results = payload.previous
        ? [...state.results, ...payload.results]
        : [...payload.results];
      return {
        results: [...results],
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default postes;
