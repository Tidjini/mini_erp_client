import { SELECT_PROFILE } from "../actions";

const initialState = {
  selected: undefined,
};

const profile = function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SELECT_PROFILE:
      return {
        selected: { ...payload },
      };
    default:
      return state;
  }
};

export default profile;
