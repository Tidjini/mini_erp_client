import * as Actions from "../actions";

const initialState = {
  date: "",
  intitule: "Production: ",
  equipe: null,
  responsable: null,
  poste: null,
  responsable_nom: "",
  id: "",
  objectif: 22,
};
const production = function (state = initialState, action) {
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

export default production;
