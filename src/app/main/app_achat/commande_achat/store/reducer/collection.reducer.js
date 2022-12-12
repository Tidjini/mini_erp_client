import * as Actions from "../actions/collection.actions";

const initialState = {
  commandes: {
    results: [],
    count: 0,
    previous: null,
    next: null,
    page_size: 200,
    summary: {},
  },
};
//collection ... and down table base compte, journal, ...

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.COMMANDE_COLLECTION: {
      const results = action.payload.previous
        ? [...state.commandes.results, ...action.payload.results]
        : [...action.payload.results];
      return {
        ...state,
        commandes: {
          results: [...results],
          count: action.payload.count,
          previous: action.payload.previous,
          next: action.payload.next,
          page_size: 200,
        },
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
