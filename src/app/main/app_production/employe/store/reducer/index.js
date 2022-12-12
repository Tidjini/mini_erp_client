import { combineReducers } from "redux";
import employees from "./employe.collection.reducer";
import employe from "./employe.reducer";
import service from "./service.reducer";

const reducer = combineReducers({
  employees,
  employe,
  service,
});

export default reducer;
