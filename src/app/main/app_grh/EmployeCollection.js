import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { collectionCells } from "./Config";
import EmployeRow from "./composants/EmployeRow";
import Filters from "./composants/EmployeFilters";
import Collection from "app/main/composants/Collection";
import { list } from "app/services/application/ActionService";

function EmployeCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const employes = useSelector(
    ({ grh_employe }) => grh_employe.employe.results
  );

  useEffect(() => {
    const initialFilter = { ...filters };
    setFilters({ ...initialFilter });
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCollection(filters);
  }, [filters]);

  const getCollection = (filters, page) => {
    setLoading(true);

    dispatch(list("EMPLOYE-GRH", "grh/api/employes", page, filters))
      .then((res) => {
        setLoading(false);
        console.log("ressponce", res);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  return (
    <Collection
      header="Personels"
      icon=""
      items={employes}
      loading={loading}
      columns={collectionCells}
      Row={EmployeRow}
      viewUrl="employe-view"
      history={props.history}
      Filters={<Filters setFilters={setFilters} filters={filters} />}
      id="id"
    />
  );
}

export default withReducer("grh_employe", reducer)(EmployeCollection);
