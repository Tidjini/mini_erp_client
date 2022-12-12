import * as Actions from "../actions";

const initialState = {
  results: [],
  loading: false,
};
const employees = function (state = initialState, action) {
  switch (action.type) {
    case Actions.EMPLOYE_COLLECTION: {
      const { payload } = action;
      //scroll and get results
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

export default employees;
