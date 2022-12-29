import React from "react";

export default function useGetCollection({
  api,
  pageResponse,
  emptyValue,
  display,
  value,
}) {
  const [data, setData] = React.useState([]);
  const [metadata, setMetadata] = React.useState();

  const getLookup = (response) => {
    let results = [];
    if (pageResponse) {
      results = [...response.results];
    } else {
      results = [...response];
    }

    const items = results.map((item) => {
      return {
        display: item[display],
        value: item[value],
      };
    });

    if (emptyValue) {
      setData([emptyValue, ...items]);
      return;
    }
    setData(items);
  };

  const getCollection = (response) => {
    if (!pageResponse) {
      setData(response);
      return;
    }

    setData([...response.results]);
    const meta = { ...response };
    delete meta["results"];
    setMetadata({ ...meta });
  };

  const handleGet = ({ page, filter, ordering = {}, lookup = false }) => {
    api &&
      api
        .getCollection(page, filter, ordering)
        .then((response) => {
          if (lookup) return getLookup(response);
          return getCollection(response);
        })
        .catch((exception) => {
          console.error("[handleGet] EXCEPTION ", exception);
        });
  };

  return {
    data,
    metadata,
    handleGet,
  };
}
