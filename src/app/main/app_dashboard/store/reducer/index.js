import { combineReducers } from "redux";
import demande from "./demande.reducer";
import devis from "./devis.reducer";
import commande from "./commande.reducer";
import production from "./production.reducer";

const reducer = combineReducers({
  demande,
  devis,
  commande,
  production,
});

export default reducer;
