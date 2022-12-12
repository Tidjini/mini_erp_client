import * as Actions from "../actions";
import { separateWagons } from "app/main/helpers/utils";

const initialState = {
  attentes: [],
  empliements: [],
  enfournements: [],
  defournements: [],
  emballages: [],
  loading: false,
};
const wagons = function (state = initialState, action) {
  switch (action.type) {
    case Actions.WAGON_COLLECTION: {
      const {
        attentes,
        empliements,
        enfournements,
        defournements,
        emballages,
      } = separateWagons(action.payload.results);

      return {
        ...state,
        attentes: [...attentes],
        empliements: [...empliements],
        enfournements: [...enfournements],
        defournements: [...defournements],
        emballages: [...emballages],
        loading: false,
      };
    }
    case Actions.LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default wagons;
