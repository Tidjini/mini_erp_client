import React from "react";
import { useCollectionData } from "./useCollectionData";

export default function useLookupData(
  collection,
  params,
  displayProperty,
  valueProperty = "id",
  emptyItem
) {
  const {
    data: raw,
    handleGetData,
    error,
  } = useCollectionData(collection, params);

  const [data, setData] = React.useState([]);

  const mapData = () => {
    const items = raw.map((item) => {
      return {
        display: item[displayProperty],
        value: item[valueProperty],
      };
    });
    setData(emptyItem ? [emptyItem, ...items] : items);
  };

  React.useEffect(() => {
    mapData();
  }, [raw]);

  return { data, handleGetData, error };
}
