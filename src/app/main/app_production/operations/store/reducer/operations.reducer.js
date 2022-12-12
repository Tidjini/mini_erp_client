import * as Actions from "../actions";

const initialState = {
  results: [],
  count: 0,
  previous: null,
  next: null,
  page_size: 200,
  summary: {},
  loading: false,
};
const casses = function (state = initialState, action) {
  switch (action.type) {
    case Actions.OPERATION_COLLECTION: {
      const { payload } = action;

      console.log("Operations,", payload);

      const results = payload.previous
        ? [...state.results, ...payload.results]
        : [...payload.results];

      return {
        results: [...results],
        count: payload.count,
        previous: payload.previous,
        next: payload.next,
        page_size: 200,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default casses;
