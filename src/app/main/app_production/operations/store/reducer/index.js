import { combineReducers } from "redux";
import produits from "./produit.reducer";
import operation from "./operation.reducer";
import operations from "./operations.reducer";

const reducer = combineReducers({
  produits,
  operation,
  operations,
});

export default reducer;
