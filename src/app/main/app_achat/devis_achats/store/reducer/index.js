import { combineReducers } from "redux";
import devis from "./devis.reducer";
import articles from "./articles.reducer";

const reducer = combineReducers({
  devis,
  articles,
});

export default reducer;
