import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import { collectionCells } from "./EntreSortieConfig";
import EntreSortieRow from "./composants/EntreSortieRow";
import Filters from "./composants/Filters";
import Collection from "app/main/composants/Collection";
const thisMonth = new Date().getMonth() + 1;

function EntreSortieCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const entresorties = useSelector(
    ({ production_entre_sortie }) =>
      production_entre_sortie.entresorties.collection.results
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
    dispatch(Actions.getEntreSortieCollection(1, filters)).then((res) => {
      setLoading(false);
    });
  };

  return (
    <Collection
      header="Entrées Sorties (E/S)"
      icon="assets/images/app_production/maintenance.png"
      items={entresorties}
      loading={loading}
      columns={collectionCells}
      Row={EntreSortieRow}
      viewUrl="entre-sortie"
      history={props.history}
      Filters={<Filters setFilters={setFilters} filters={filters} />}
      id="id"
    />
  );
}

export default withReducer(
  "production_entre_sortie",
  reducer
)(EntreSortieCollection);
