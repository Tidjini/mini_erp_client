import * as Actions from "../actions";

const initialState = {
  id: "",
  dernier_achat: "",
  alert_achat: false,
  prix_achat_max: 0.0,
  reference: "",
  tolere_achat: "",
  achat_period: 30,
  designation: "",
  unite: "",
};
const article = function (state = initialState, action) {
  switch (action.type) {
    case Actions.RETRIEVE: {
      const { payload } = action;
      return {
        ...payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default article;
