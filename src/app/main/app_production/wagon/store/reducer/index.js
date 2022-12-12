import { combineReducers } from "redux";
import wagons from "./wagon.collection.reducer";
import wagon from "./wagon.reducer";

const reducer = combineReducers({
  wagons,
  wagon,
});

export default reducer;
