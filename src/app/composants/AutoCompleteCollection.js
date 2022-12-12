import React from "react";
import AutoComplete from "./AutoComplete";
import { list } from "app/services/application/ActionService";
import { useDispatch } from "react-redux";
import { mapListToSelector } from "app/main/helpers/utils";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default function AutoCompleteCollection(props) {
  const { context, collection, link, pk, display, emptyValue } = props;
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getCollection({}, 1);
  }, []);

  const getCollection = (filters, page) => {
    setLoading(true);
    dispatch(list(context, link, page, filters)).then((res) => {});
  };

  React.useEffect(() => {
    const key = pk || "id";

    const items = mapListToSelector(collection, display, key);
    if (emptyValue) setOptions([{ display: emptyValue, id: "" }, ...items]);
    else {
      setOptions([...items]);
    }
    setLoading(false);
  }, [collection, emptyValue]);

  const onInputChange = React.useCallback((event, onChange) => {
    const search = event.target.value;
    setLoading(true);
    getCollection({ search: search }, 1);

    onChange(event, search);
  }, []);

  return (
    <div style={{ display: "flex", direction: "row", alignItems: "flex-end" }}>
      <AutoComplete
        {...props}
        options={options}
        onInputChange={onInputChange}
        loading={loading}
        style={{ width: "100%" }}
      />
      {/* <IconButton
        edge="start"
        aria-label="edit-statue"
        style={{ marginLeft: 0 }}
        onClick={(e) => {
          // onEditItem(item);
        }}
      >
        <AddIcon className="item-save-icon" />
      </IconButton> */}
    </div>
  );
}
