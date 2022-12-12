import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import { collectionCells } from "./ArretConfig";
import ArretRow from "./composants/ArretRow";
import Filters from "./Filters";
import Collection from "app/main/composants/Collection";
const thisMonth = new Date().getMonth() + 1;

function ArretCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const arrets = useSelector(
    ({ production_arret }) => production_arret.arrets.results
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
    dispatch(Actions.getArretCollection(1, filters)).then((res) => {
      setLoading(false);
    });
  };


  

  return (
    <Collection
      header="Maintenance (Arrêts)"
      icon="assets/images/app_production/maintenance.png"
      items={arrets}
      loading={loading}
      columns={collectionCells}
      Row={ArretRow}
      viewUrl="production-arret"
      history={props.history}
      Filters={<Filters setFilters={setFilters} filters={filters} />}
      id="id"
    />
  );
}

export default withReducer("production_arret", reducer)(ArretCollection);
