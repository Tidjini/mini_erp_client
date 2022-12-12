import * as Actions from "../actions";
import _ from "@lodash";

const initialState = {
  collection: {
    results: [],
    count: 0,
    previous: null,
    next: null,
    page_size: 10,
  },
  editItem: null,
  entity_saved: false,
  config: {
    collectionName: "",
    icon: "",
    header: "",
    primary: "",
    attributes: [],
    columns: [],
    itemState: null,
  },
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.CONFIG_COLLECTION: {
      return {
        ...state,
        collection: {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
          results: [...action.payload.results],
          page_size: 10,
        },
      };
    }
    case Actions.CONFIG_SAVE: {
      const results = state.collection.results;
      const config = state.config;
      let index = -1;
      index = results.findIndex(
        (c) => c[config.primary] === action.payload[config.primary]
      );

      if (index === -1 || action.action === "add") {
        const count = state.collection.count + 1;
        return {
          ...state,
          entity_saved: true,
          collection: {
            results: [...results, action.payload],
            count: count,
            previous: null,
            next: null,
            page_size: 10,
          },
        };
      }

      results.splice(index, 1, action.payload);
      return {
        ...state,
        collection: {
          ...state.collection,
          results: [...results],
        },
        editItem: null,
      };
    }

    case Actions.CONFIG_EDIT_ITEM: {
      return {
        ...state,
        editItem: action.payload === null ? null : { ...action.payload },
      };
    }
    case Actions.GET_CONFIG_DATA: {
      return {
        ...state,
        config: { ...action.payload },
        collection: {
          results: [],
          count: 0,
          previous: null,
          next: null,
          page_size: 10,
        },
      };
    }

    default: {
      return state;
    }
  }
};
export default reducer;
