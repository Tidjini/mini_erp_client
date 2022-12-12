import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { list } from "app/services/infrabitumService/ActionService";
import { useDispatch, useSelector } from "react-redux";
import { collectionCells } from "./ExpeditionConfig";
import ExpeditionRow from "./composants/ExpeditionRow";
import Filters from "./composants/Filters";
import Collection from "app/main/composants/Collection";
const thisMonth = new Date().getMonth() + 1;

function ExpeditionCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const expeditions = useSelector(
    ({ expedition }) => expedition.expeditions.results
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
    dispatch(list("EXPEDITION", "production/expeditions", 1, filters)).then(
      (res) => {
        setLoading(false);
      }
    );
  };

  return (
    <Collection
      header="Expéditions"
      icon="assets/images/app_production/maintenance.png"
      items={expeditions}
      loading={loading}
      columns={collectionCells}
      Row={ExpeditionRow}
      viewUrl="expedition"
      history={props.history}
      Filters={<Filters setFilters={setFilters} filters={filters} />}
      id="id"
    />
  );
}

export default withReducer("expedition", reducer)(ExpeditionCollection);
