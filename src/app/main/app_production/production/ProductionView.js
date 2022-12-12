import React from "react";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";

import ProductionViewHeader from "./composants/ProductionViewHeader";
import ProductionViewBody from "./composants/ProductionViewBody";
import { useSelector } from "react-redux";

function ProductionView(props) {
  const { match, history } = props;
  const production = useSelector(
    ({ production_production }) => production_production.production
  );
  return (
    <div>
      <ProductionViewHeader match={match} history={history} />
      {production.id !== "" && <ProductionViewBody />}
    </div>
  );
}

export default withReducer("production_production", reducer)(ProductionView);
