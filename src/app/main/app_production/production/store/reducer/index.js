import { combineReducers } from "redux";
import poste from "./poste.reducer";
import equipe from "./equipe.reducer";
import responsable from "./responsable.reducer";
import production from "./production.reducer";
import productions from "./productions.reducer";
import wagon from "./wagon.reducer";
import produits from "./produit.reducer";

const reducer = combineReducers({
  poste,
  equipe,
  responsable,
  production,
  productions,
  wagon,
  produits,
});

export default reducer;
