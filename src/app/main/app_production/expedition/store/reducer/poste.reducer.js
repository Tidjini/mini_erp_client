import * as Actions from "../actions";
import { mapListToSelector } from "app/main/helpers/utils";

const initialState = {
  results: [],
  loading: false,
};
const postes = function (state = initialState, action) {
  switch (action.type) {
    case Actions.POSTE_COLLECTION: {
      const { payload } = action;
      const results = payload.previous
        ? [...state.results, ...payload.results]
        : [...payload.results];

      const collection = mapListToSelector(
        results,
        ["intitule"],
        "intitule",
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

export default postes;
