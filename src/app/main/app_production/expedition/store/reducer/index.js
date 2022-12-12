import { combineReducers } from "redux";
import produits from "./produit.reducer";
import poste from "./poste.reducer";
import equipe from "./equipe.reducer";
import responsable from "./responsable.reducer";
import expedition from "./expedition.reducer";
import expeditions from "./expeditions.reducer";

const reducer = combineReducers({
  produits,
  poste,
  equipe,
  responsable,
  expedition,
  expeditions,
});

export default reducer;
