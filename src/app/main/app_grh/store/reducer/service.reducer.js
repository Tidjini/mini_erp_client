import * as Actions from "../actions";
import { mapListToSelector } from "app/main/helpers/utils";

const initialState = {
  collection: [],
  results: [],
};
const service = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SERVICE_COLLECTION: {
      const collection = mapListToSelector(
        action.payload,
        ["service"],
        "id",
        true
      );

      return {
        collection: [...collection],
        results: [...action.payload],
      };
    }

    default: {
      return state;
    }
  }
};

export default service;
