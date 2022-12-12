import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { statueCells } from "./Config";
import StatueRow from "./composants/StatueRow";
import StatueDialog from "./composants/StatueDialog";
import Collection from "app/main/composants/Collection";

import { list } from "app/services/application/ActionService";
function StatueCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const statues = useSelector(({ grh_statue }) => grh_statue.statue.results);

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

    dispatch(list("STATUE-GRH", "grh/api/statues", page, {}))
      .then((res) => {
        setLoading(false);
      })
      .catch((e) => {});
  };

  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState({ statue: "", active: true });

  const onItemClick = (event, item) => {
    event.stopPropagation();
    setItem(item);
    setOpen(true);
  };
  return (
    <div>
      <Collection
        header="Statue"
        icon=""
        items={statues}
        loading={loading}
        columns={statueCells}
        Row={StatueRow}
        viewUrl="gestion-statue"
        history={props.history}
        Filters={undefined}
        id="statue"
        openDialog={onItemClick}
      />
      <StatueDialog
        context="STATUE-GRH"
        open={open}
        setOpen={setOpen}
        item={item}
      />
    </div>
  );
}

export default withReducer("grh_statue", reducer)(StatueCollection);
