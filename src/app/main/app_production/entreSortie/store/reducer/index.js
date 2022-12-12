import { combineReducers } from "redux";
import entresorties from "./entreesortie.reducer";
import produits from "./produit.reducer";
const reducer = combineReducers({
  entresorties,
  produits,
});

export default reducer;
