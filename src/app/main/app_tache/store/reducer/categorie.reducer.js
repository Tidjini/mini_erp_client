import * as Actions from "../actions";

const initialState = {
  collection: [],
};
const categorie = function (state = initialState, action) {
  switch (action.type) {
    case Actions.CATEGORIE_COLLECTION: {
      const { payload } = action;
      return {
        collection: [...payload],
      };
    }

    default: {
      return state;
    }
  }
};

export default categorie;
