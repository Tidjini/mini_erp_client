import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import { collectionCells } from "./PosteConfig";
import PosteRow from "./composants/PosteRow";
import Collection from "app/main/composants/Collection";

function PosteCollection(props) {
  const dispatch = useDispatch();

  const postes = useSelector(
    ({ production_poste }) => production_poste.postes.results
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCollection({});
  }, []);

  const getCollection = (filters) => {
    setLoading(true);
    dispatch(Actions.getPosteCollection(1, filters)).then((res) => {
      setLoading(false);
    });
  };

  return (
    <Collection
      header="Poste (Production)"
      icon="assets/images/app_production/maintenance.png"
      items={postes}
      loading={loading}
      columns={collectionCells}
      Row={PosteRow}
      viewUrl="production-poste"
      history={props.history}
      id="intitule"
    />
  );
}

export default withReducer("production_poste", reducer)(PosteCollection);
