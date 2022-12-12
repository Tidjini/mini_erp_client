import { combineReducers } from "redux";
import arrets from "./arret.collection.reducer";
import arret from "./arret.reducer";
import employees from "./employes.reducer";
import postes from "./postes.reducer";

const reducer = combineReducers({
  arrets,
  arret,
  postes,
  employees,
});

export default reducer;
