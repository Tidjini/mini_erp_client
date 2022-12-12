import * as Actions from "../actions";

const initialState = {
  collection: [],
};
const urgence = function (state = initialState, action) {
  switch (action.type) {
    case Actions.URGENCE_COLLECTION: {
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

export default urgence;
