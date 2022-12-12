import * as Actions from "../actions";
import { mapListToSelector } from "app/main/helpers/utils";

const initialState = {
  results: [],
  loading: false,
};
const employees = function (state = initialState, action) {
  switch (action.type) {
    case Actions.RESPONSABLE_COLLECTION: {
      const { payload } = action;
      //scroll and get results
      const results = payload.previous
        ? [...state.results, ...payload.results]
        : [...payload.results];

      const collection = mapListToSelector(
        results,
        ["nom", "prenom"],
        "id",
        true
      );
      return {
        results: [...collection],
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default employees;
