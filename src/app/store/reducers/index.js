import { combineReducers } from "redux";
import fuse from "./fuse";
import collection from "./collection";
import auth from "app/auth/store/reducers";
import quickPanel from "app/fuse-layouts/shared-components/quickPanel/store/reducers";

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    fuse,
    collection,
    quickPanel,
    ...asyncReducers,
  });

export default createReducer;
