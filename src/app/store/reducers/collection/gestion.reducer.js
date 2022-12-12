import * as Actions from "../../actions";

const initialState = {
  employes: {
    results: [],
    count: 0,
    pages: 0,
    next: null,
    previous: null,
  },
};
const gestion = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GESTION_EMPLOYE_COLLECTION: {
      const { payload } = action;
      return {
        ...state,
        employes: {
          ...payload,
          results: [...payload.results],
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default gestion;
