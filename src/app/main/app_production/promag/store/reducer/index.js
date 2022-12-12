import { combineReducers } from "redux";
import employees from "./prod.employe.reducer";
import postes from "./prod.poste.reducer";
import wagons from "./prod.wagon.reducer";
import produits from "./prod.produit.reducer";
import equipes from "./prod.equipe.reducer";
import arret from "./prod.arret.reducer";
import casse from "./prod.casse.reducer";
import expedition from "./prod.expedition.reducer";

const reducer = combineReducers({
  employees,
  postes,
  wagons,
  produits,
  equipes,
  arret,
  casse,
  expedition,
});

export default reducer;
