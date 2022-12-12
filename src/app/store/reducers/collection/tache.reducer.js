import * as Actions from "../../actions";

const initialState = {
  categories: [],
  urgences: [],
  statues: [],
  taches: {
    results: [],
    count: 0,
    pages: 0,
    next: null,
    previous: null,
  },
  item: {
    id: 0,
    telephone: null,
    employe_name: null,
    description: "",
    debut: "",
    fin: "",
    debut_effective: null,
    fin_effective: null,
    urgence: 1,
    statue: 1,
    annuler: false,
    categorie: 7,
    for_employe: null,
  },
};
const tache = function (state = initialState, action) {
  switch (action.type) {
    case Actions.TACHE_CATEGORIE_COLLECTION: {
      const { payload } = action;

      return {
        ...state,
        categories: [...payload],
      };
    }
    case Actions.TACHE_STATUE_COLLECTION: {
      const { payload } = action;

      return {
        ...state,
        statues: [...payload],
      };
    }

    case Actions.TACHE_URGENCE_COLLECTION: {
      const { payload } = action;

      return {
        ...state,
        urgences: [...payload],
      };
    }

    case Actions.TACHE_COLLECTION: {
      const { payload } = action;

      return {
        ...state,
        taches: {
          ...payload,
          results: [...payload.results],
        },
      };
    }
    case Actions.TACHE_RETRIEVE: {
      const { payload } = action;
      return {
        ...state,
        item: {
          ...payload,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default tache;
