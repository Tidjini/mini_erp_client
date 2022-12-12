import * as Actions from "../actions";

const initialState = {
  collectionData: [],
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_TABLE_DATA: {
      return {
        ...state,
        collectionData: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
export default reducer;
