import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { list } from "app/services/infrabitumService/ActionService";
import { useDispatch, useSelector } from "react-redux";
import { collectionCells } from "./OperationConfig";
import OperationRow from "./composants/OperationRow";
import Filters from "./composants/Filters";
import Collection from "app/main/composants/Collection";
import OperationView from "./OperationView";
const thisMonth = new Date().getMonth() + 1;

function OperationCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const operations = useSelector(
    ({ production_operations }) => production_operations.operations.results
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
    dispatch(list("OPERATION", "production_api/operations", 1, filters)).then(
      (res) => {
        setLoading(false);
      }
    );
  };

  const [open, setOpen] = useState(false);
  const [item, setItem] = React.useState({
    id: "",
    produit_designation: "",
    phase: "ATTENTE",
    anomalie: true,
    anomalie_agent: "",
    anomalie_remarque: "",
    anomalie_flag: "ERREUR",
    production: "",
    wagon: "1",
    produit: "",
  });

  const onItemClick = (event, item) => {
    event.stopPropagation();
    setItem(item);
    setOpen(true);
  };
  return (
    <div>
      <Collection
        header="Operation"
        icon="assets/images/app_production/maintenance.png"
        items={operations}
        loading={loading}
        columns={collectionCells}
        Row={OperationRow}
        viewUrl="operation"
        history={props.history}
        openDialog={onItemClick}
        Filters={<Filters setFilters={setFilters} filters={filters} />}
      />
      <OperationView
        open={open}
        setOpen={setOpen}
        item={item}
        context="OPERATION"
      />
    </div>
  );
}

export default withReducer(
  "production_operations",
  reducer
)(OperationCollection);
