import { combineReducers } from "redux";
import demande from "./demande.reducer";
import articles from "./articles.reducer";

const reducer = combineReducers({
  demande,
  articles,
});

export default reducer;
