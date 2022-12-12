import * as Actions from "../actions";
import { mapListToSelector } from "app/main/helpers/utils";

const initialState = {
  collection: {
    results: [],
    count: 0,
    pages: 0,
    next: null,
    previous: null,
  },
  categories: [],
  statues: [],
  urgences: [],
  employes: [],
};
const tache = function (state = initialState, action) {
  switch (action.type) {
    case Actions.TACHE_COLLECTION: {
      const { payload } = action;
      return {
        ...state,
        collection: { ...payload, results: [...payload.results] },
      };
    }
    case Actions.TACHE_CATEGORIE_COLLECTION: {
      const collection = mapListToSelector(
        action.payload,
        ["intitule"],
        "id",
        true
      );

      return {
        ...state,
        categories: [...collection],
      };
    }
    case Actions.TACHE_STATUE_COLLECTION: {
      const collection = mapListToSelector(
        action.payload,
        ["intitule"],
        "id",
        true
      );
      return {
        ...state,
        statues: [...collection],
      };
    }
    case Actions.TACHE_URGENCE_COLLECTION: {
      const collection = mapListToSelector(
        action.payload,
        ["intitule"],
        "id",
        true
      );
      return {
        ...state,
        urgences: [...collection],
      };
    }
    case Actions.TACHE_EMPLOYE_COLLECTION: {
      const collection = mapListToSelector(
        action.payload.results,
        ["nom", "prenom"],
        "id",
        true
      );
      return {
        ...state,
        employes: [...collection],
      };
    }

    default: {
      return state;
    }
  }
};

export default tache;
