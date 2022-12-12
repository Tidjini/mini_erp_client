import { combineReducers } from "redux";
import collection from "./collection.reducer";
import view from "./view.reducer";
import detail from "./detail.reducer";

const reducer = combineReducers({
  collection,
  view,
  detail,
});

export default reducer;

// import * as ViewActions from "../actions/view.actions";

// const initialState = {
//   operations: {
//     results: [],
//     count: 0,
//     previous: null,
//     next: null,
//     page_size: 200,
//     summary: {},
//   },
//   attachements: [],
//   attachements_deleted: [],
//   operation: {
//     id: 0,
//     numero: "nouveau",
//     navire: "",
//     gros: "",
//     qte: 0, //KG
//     qte_theorique: 0, //KG
//     qte_diff: 0, //KG
//     debut: "",
//     fin: "",
//     cloture: false,
//     nbr_chauffeur: 0,
//     nbr_heure: 0,
//     details: [],
//   },
//   loading: false,
// };
// const reducer = function (state = initialState, action) {
//   switch (action.type) {
//     case CollectionActions.OPERATION_COLLECTION: {
//       const results = action.payload.previous
//         ? [...state.commandes.results, ...action.payload.results]
//         : [...action.payload.results];
//       return {
//         ...state,
//         operations: {
//           results: [...results],
//           count: action.payload.count,
//           previous: action.payload.previous,
//           next: action.payload.next,
//           page_size: 200,
//         },
//         loading: false,
//       };
//     }

//     case CollectionActions.LOADING: {
//       return {
//         ...state,
//         loading: action.payload,
//       };
//     }
//     case ViewActions.OPERATION: {
//       return {
//         ...state,
//         operation: {
//           ...initialState.operation,
//           ...action.payload,
//           details: [...action.payload.details],
//         },
//       };
//     }
//     // case ViewActions.GET_ATTACHEMENTS: {
//     //   return {
//     //     ...state,
//     //     attachements: [...action.payload],
//     //     attachements_deleted: [],
//     //   };
//     // }

//     // case ViewActions.ADD_ATTACHEMENTS: {
//     //   return {
//     //     ...state,
//     //     attachements: [...state.attachements, action.payload],
//     //   };
//     // }
//     // case ViewActions.DELETE_ATTACHEMENT: {
//     //   if (action.payload.id !== "") {
//     //     return {
//     //       ...state,
//     //       attachements: [...action.attachements],
//     //       attachements_deleted: [...state.attachements_deleted, action.payload],
//     //     };
//     //   }

//     //   return {
//     //     ...state,
//     //     attachements: [...action.attachements],
//     //   };
//     // }

//     default: {
//       return state;
//     }
//   }
// };

// export default reducer;
