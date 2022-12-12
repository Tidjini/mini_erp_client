import React from "react";
import { useEffect } from "react";
import apiService from "app/services/ApiService";
import { filter } from "lodash";

export default function CollectionResponse(props) {
  const { name, filters } = props;
  useEffect(() => {
    apiService.initialize(name);
    getCollection();
  }, []);

  const [data, setData] = React.useState([]);

  const getCollection = () => {
    apiService
      .getCollection(1, filters)
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((exception) => {});
  };
  return (
    <div>
      <div>Collection {name}</div>
      <div>{data.length}</div>
    </div>
  );
}
