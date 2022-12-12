import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { list } from "app/services/infrabitumService/ActionService";
import { useDispatch, useSelector } from "react-redux";
import { collectionCells } from "./ProductionConfig";
import ProductionRow from "./composants/ProductionRow";
import Filters from "./composants/Filters";
import Collection from "app/main/composants/Collection";
const thisMonth = new Date().getMonth() + 1;

function ProductionCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const productions = useSelector(
    ({ production }) => production.productions.results
  );

  useEffect(() => {
    const initialFilter = { ...filters, mois: thisMonth };
    setFilters({ ...initialFilter });
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCollection(filters);
  }, [filters]);

  const getCollection = (filters) => {
    setLoading(true);
    dispatch(list("PRODUCTION", "production/productions", 1, filters)).then(
      (res) => {
        setLoading(false);
      }
    );
  };

  return (
    <Collection
      header="Production"
      icon="assets/images/app_production/maintenance.png"
      items={productions}
      loading={loading}
      columns={collectionCells}
      Row={ProductionRow}
      viewUrl="production"
      history={props.history}
      Filters={<Filters setFilters={setFilters} filters={filters} />}
      id={"id"}
    />
  );
}

export default withReducer("production", reducer)(ProductionCollection);
