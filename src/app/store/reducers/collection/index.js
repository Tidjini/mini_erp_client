import { combineReducers } from "redux";
import tache from "./tache.reducer";
import gestion from "./gestion.reducer";

export default combineReducers({
  tache,
  gestion,
});

// export default collection;
