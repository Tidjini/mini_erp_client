import { combineReducers } from "redux";
import etatProduction from "./etat.production.reducer";

const reducer = combineReducers({
  etatProduction,
});

export default reducer;
