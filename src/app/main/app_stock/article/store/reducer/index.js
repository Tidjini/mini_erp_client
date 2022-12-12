import { combineReducers } from "redux";
import article from "./article.reducer";
import articles from "./articles.reducer";

const reducer = combineReducers({
  article,
  articles,
});

export default reducer;
