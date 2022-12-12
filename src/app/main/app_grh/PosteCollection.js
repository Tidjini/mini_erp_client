import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { posteCells } from "./Config";
import PosteRow from "./composants/PosteRow";
import PosteDialog from "./composants/PosteDialog";
import Collection from "app/main/composants/Collection";

import { list } from "app/services/application/ActionService";
function PosteCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const postes = useSelector(({ grh_poste }) => grh_poste.poste.results);

  useEffect(() => {
    const initialFilter = { ...filters };
    setFilters({ ...initialFilter });
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(filters);
    getCollection(filters);
  }, [filters]);

  const getCollection = (filters, page) => {
    // setLoading(true);

    dispatch(list("POSTE-GRH", "grh/api/postes", page, {}))
      .then((res) => {
        setLoading(false);
      })
      .catch((e) => {});
  };

  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState({ poste: "", active: true });

  const onItemClick = (event, item) => {
    event.stopPropagation();
    setItem(item);
    setOpen(true);
  };
  return (
    <div>
      <Collection
        header="Poste"
        icon=""
        items={postes}
        loading={loading}
        columns={posteCells}
        Row={PosteRow}
        viewUrl="gestion-poste"
        history={props.history}
        Filters={undefined}
        id="poste"
        openDialog={onItemClick}
      />
      <PosteDialog
        context="POSTE-GRH"
        open={open}
        setOpen={setOpen}
        item={item}
      />
    </div>
  );
}

export default withReducer("grh_poste", reducer)(PosteCollection);
