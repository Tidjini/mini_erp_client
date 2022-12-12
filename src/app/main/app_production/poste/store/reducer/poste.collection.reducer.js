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
const postes = function (state = initialState, action) {
  switch (action.type) {
    case Actions.POSTE_COLLECTION: {
      const { payload } = action;
      //scroll and get results
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

export default postes;
