import React from "react";

import { list } from "app/services/application/ActionService";
import { useSelector, useDispatch } from "react-redux";
import { mapListToSelector } from "app/main/helpers/utils";
import Lookup from "./Lookup";

function LookupCollection(props) {
  const { context, collection, link, pk, display } = props;

  const dispatch = useDispatch();

  React.useEffect(() => {
    getCollection({}, 1);
  }, []);

  const getCollection = (filters, page) => {
    dispatch(list(context, link, page, filters)).then((res) => {});
  };

  React.useEffect(() => {
    const key = pk || "id";
    const items = mapListToSelector(collection, display, key);
    setOptions([...items]);
  }, [collection]);

  const [options, setOptions] = React.useState([]);

  return <Lookup {...props} options={options} />;
}
export default LookupCollection;
