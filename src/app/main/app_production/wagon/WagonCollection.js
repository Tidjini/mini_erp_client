import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import { collectionCells } from "./WagonConfig";
import WagonRow from "./composants/WagonRow";
import Filters from "./composants/Filters";
import Collection from "app/main/composants/Collection";

function WagonCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const wagons = useSelector(
    ({ production_wagon }) => production_wagon.wagons.results
  );

  useEffect(() => {
    setFilters({});
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCollection(filters);
  }, [filters]);

  const getCollection = (filters) => {
    setLoading(true);
    dispatch(Actions.getWagonCollection(1, filters)).then((res) => {
      setLoading(false);
    });
  };

  return (
    <Collection
      header="Maintenance (Arrêts)"
      icon="assets/images/app_production/maintenance.png"
      items={wagons}
      loading={loading}
      columns={collectionCells}
      Row={WagonRow}
      viewUrl="production-wagon"
      history={props.history}
      Filters={<Filters setFilters={setFilters} filters={filters} />}
      id={"numero"}
    />
  );
}

export default withReducer("production_wagon", reducer)(WagonCollection);
