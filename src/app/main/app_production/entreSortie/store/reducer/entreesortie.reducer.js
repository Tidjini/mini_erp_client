import * as Actions from "../actions";
// import { mapListToSelector } from "app/main/helpers/utils";

const initialState = {
  collection: {
    results: [],
    count: 0,
    previous: null,
    next: null,
    page_size: 200,
    summary: {},
    loading: false,
  },
  item: {
    id: "",
    produit_object: null,
    nbr_piece: 0.0,
    nbr_palette: 0.0,
    date: "",
    type: "SORTIE",
    auto: false,
    observation: "SORTIE : Causée par....",
    produit: "",
  },
};
const entresorties = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ENTRE_SORTIE: {
      const { payload } = action;
      return {
        ...state,
        loading: false,
        item: {
          ...payload,
        },
      };
    }
    case Actions.ENTRE_SORTIE_COLLECTION: {
      const { payload } = action;
      const { collection } = state;
      //scroll and get results
      const results = payload.previous
        ? [...collection.results, ...payload.results]
        : [...payload.results];

      return {
        ...state,
        collection: {
          results: [...results],
          count: payload.count,
          previous: payload.previous,
          next: payload.next,
          page_size: 200,
          loading: false,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default entresorties;
