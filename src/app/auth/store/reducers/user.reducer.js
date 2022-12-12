import * as Actions from "../actions";

const initialState = {
  role: [], //guest
  data: {
    username: "Anonymously",
    nom: "John",
    prenom: "Doe",
    picture_url: "",
    email: "",
    shortcuts: ["calendar", "mail", "contacts", "todo"],
    is_admin: false,
    is_staff: false,
    is_superuser: false,
  },
  // displayName: "Ahmed Amine",
  // photoURL: "assets/images/avatars/Velazquez.jpg",
  // email: "johndoe@withinpixels.com",
  // shortcuts: ["calendar", "mail", "contacts", "todo"],
};

const user = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      const { role, user } = action.payload;
      return {
        ...initialState,
        data: { ...user },
        role: [...role],
      };
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...initialState,
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default user;
