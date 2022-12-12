import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { serviceCells } from "./Config";
import ServiceRow from "./composants/ServiceRow";
import ServiceDialog from "./composants/ServiceDialog";
import Collection from "app/main/composants/Collection";

import { list } from "app/services/application/ActionService";
function ServiceCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const services = useSelector(
    ({ grh_service }) => grh_service.service.results
  );

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

    dispatch(list("SERVICE-GRH", "grh/api/services", page, {}))
      .then((res) => {
        setLoading(false);
      })
      .catch((e) => {});
  };

  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState({ service: "", active: true });

  const onItemClick = (event, item) => {
    event.stopPropagation();
    setItem(item);
    setOpen(true);
  };
  return (
    <div>
      <Collection
        header="Service"
        icon=""
        items={services}
        loading={loading}
        columns={serviceCells}
        Row={ServiceRow}
        viewUrl="gestion-service"
        history={props.history}
        Filters={undefined}
        id="service"
        openDialog={onItemClick}
      />
      <ServiceDialog
        context="SERVICE-GRH"
        open={open}
        setOpen={setOpen}
        item={item}
      />
    </div>
  );
}

export default withReducer("grh_service", reducer)(ServiceCollection);
