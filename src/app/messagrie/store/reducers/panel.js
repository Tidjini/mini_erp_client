import * as Actions from "../actions";

const initialState = {
  open: false,
};

const panel = function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case Actions.TOGGLE_MESSAGES_PANEL: {
      const open = !state.open;
      return {
        open: open,
      };
    }

    default:
      return state;
  }
};

export default panel;
