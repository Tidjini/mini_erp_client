import { combineReducers } from "redux";
import produits from "./produit.reducer";
import poste from "./poste.reducer";
import equipe from "./equipe.reducer";
import responsable from "./responsable.reducer";
import casse from "./casse.reducer";
import casses from "./casses.reducer";

const reducer = combineReducers({
  produits,
  poste,
  equipe,
  responsable,
  casses,
  casse,
});

export default reducer;
