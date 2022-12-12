import * as Actions from "../actions";

const initialState = {
  collection: [],
};
const statue = function (state = initialState, action) {
  switch (action.type) {
    case Actions.STATUE_COLLECTION: {
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

export default statue;
