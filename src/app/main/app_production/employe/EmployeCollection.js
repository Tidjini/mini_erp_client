import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import { collectionCells } from "./EmployeConfig";
import EmployeRow from "./composants/EmployeRow";
import Filters from "./composants/Filters";
import Collection from "app/main/composants/Collection";
const thisMonth = new Date().getMonth() + 1;

function EmployeCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const employes = useSelector(
    ({ production_employe }) => production_employe.employees.results
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
    dispatch(Actions.getEmployeCollection(1, filters)).then((res) => {
      setLoading(false);
    });
  };

  return (
    <Collection
      header="Personels"
      icon="assets/images/app_production/maintenance.png"
      items={employes}
      loading={loading}
      columns={collectionCells}
      Row={EmployeRow}
      viewUrl="gestion-employe"
      history={props.history}
      Filters={<Filters setFilters={setFilters} filters={filters} />}
      id="id"
    />
  );
}

export default withReducer("production_employe", reducer)(EmployeCollection);
