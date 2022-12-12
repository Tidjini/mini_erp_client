import * as Actions from "../actions";
import { mapListToSelector } from "app/main/helpers/utils";

const initialState = {
  collection: [],
  results: [],
};
const poste = function (state = initialState, action) {
  switch (action.type) {
    case Actions.POSTE_COLLECTION: {
      const collection = mapListToSelector(
        action.payload,
        ["poste"],
        "poste",
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

export default poste;
