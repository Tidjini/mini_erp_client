import * as Actions from "../actions";
import { mapListToSelector } from "app/main/helpers/utils";

const initialState = {
  collection: [],
  results: [],
};
const statue = function (state = initialState, action) {
  switch (action.type) {
    case Actions.STATUE_COLLECTION: {
      const collection = mapListToSelector(
        action.payload,
        ["statue"],
        "statue",
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

export default statue;
