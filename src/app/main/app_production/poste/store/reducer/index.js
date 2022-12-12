import { combineReducers } from "redux";
import postes from "./poste.collection.reducer";
import poste from "./poste.reducer";

const reducer = combineReducers({
  postes,
  poste,
});

export default reducer;
