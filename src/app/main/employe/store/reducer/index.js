import * as Actions from "../actions";
import * as Data from "./data";

const initialState = {
  employees: { count: 0, next: null, previous: null, results: [] },
  tasks: { count: 0, next: null, previous: null, results: [] },
  employe: {
    id: "",
    nom: "",
    prenom: "",
    poste: "",
    service: "",
    entreprise: "",
    superviseur: "",
  },
  error: "",
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_EMPLOYEES: {
      return {
        ...state,
        employees: {
          ...Data.data,
          results: [...Data.data.results],
        },
      };
    }
    case Actions.GET_TASKS: {
      return {
        ...state,
        tasks: {
          ...Data.taches,
          results: [...Data.taches.results],
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
