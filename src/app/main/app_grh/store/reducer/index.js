import { combineReducers } from "redux";
import employe from "./employe.reducer";
import service from "./service.reducer";
import statue from "./statue.reducer";
import poste from "./poste.reducer";

const reducer = combineReducers({
  service,
  poste,
  statue,
  employe,
});

export default reducer;
