import * as Actions from "../actions";

const initialState = {
  id: "",
  service_object: {},
  nom: "",
  prenom: "",
  poste: "",
  service: null,
  superviseur: null,
};
const employe = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_EMPLOYE: {
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

export default employe;
