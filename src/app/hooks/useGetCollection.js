import React from "react";

export default function useGetCollection({ api, pageResponse, emptyValue }) {
  const [data, setData] = React.useState([]);
  const [metadata, setMetadata] = React.useState();

  const page = page || 1;

  const handleGetCollection = (page, filter, ordering = {}) => {
    api
      .getCollection(page, filter, ordering)
      .then((response) => {
        if (!pageResponse) {
          setData(response);
          return;
        }

        setData([...response.results]);
        const meta = { ...response };
        delete meta["results"];
        setMetadata({ ...meta });
      })
      .catch((exception) => {
        //todo later
      });
  };

  const handleGetLookup = (page, filter, ordering = {}) => {
    api
      .getCollection(page, filter, ordering)
      .then((response) => {
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
      })
      .catch((exception) => {
        //todo later
      });
  };

  return {
    data,
    metadata,
    handleGetCollection,
    handleGetLookup,
  };
}
