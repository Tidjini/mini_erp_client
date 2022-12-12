import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { list } from "app/services/infrabitumService/ActionService";
import { useDispatch, useSelector } from "react-redux";
import { collectionCells } from "./CasseConfig";
import CasseRow from "./composants/CasseRow";
import Filters from "./composants/Filters";
import Collection from "app/main/composants/Collection";
const thisMonth = new Date().getMonth() + 1;

function CasseCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const casses = useSelector(({ casse }) => casse.casses.results);

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
    dispatch(list("CASSE", "production/casses", 1, filters)).then((res) => {
      setLoading(false);
    });
  };

  return (
    <Collection
      header="Casse"
      icon="assets/images/app_production/maintenance.png"
      items={casses}
      loading={loading}
      columns={collectionCells}
      Row={CasseRow}
      viewUrl="casse"
      history={props.history}
      Filters={<Filters setFilters={setFilters} filters={filters} />}
      id="id"
    />
  );
}

export default withReducer("casse", reducer)(CasseCollection);
