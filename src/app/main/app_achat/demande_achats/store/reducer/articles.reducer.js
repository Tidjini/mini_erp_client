import * as Actions from "../actions";

const initialState = {
  results: [],
  count: 0,
  previous: null,
  next: null,
  page_size: 50,
  summary: {},
  loading: false,
};
const articles = function (state = initialState, action) {
  switch (action.type) {
    case Actions.ARTICLES: {
      const { payload } = action;

      const results = payload.previous
        ? [...state.results, ...payload.results]
        : [...payload.results];

      return {
        results: [...results],
        count: payload.count,
        previous: payload.previous,
        next: payload.next,
        page_size: 50,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default articles;
