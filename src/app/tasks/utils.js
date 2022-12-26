import React from "react";
//before save to backend save location to array of locations
import { ApiService } from "app/services/ApiService";

const api = new ApiService("task-locations");

export const useLocalisation = (taskId) => {
  //all locations
  const [localisations, setLocalisations] = React.useState([]);
  const [collectionToDelete, setCollectionToDelete] = React.useState([]);

  const getCollection = () => {
    api
      .getCollection(1, { task: taskId })
      .then((collection) => {
        setLocalisations(collection);
      })
      .catch((exception) => {});
  };
  React.useEffect(() => {
    getCollection();
  }, []);

  const handleAdd = (origin, destination) => {
    // console.log("origin", origin);
    // console.log("destination", destination);
    const item = {
      origin_lat: origin.lat,
      origin_lng: origin.lng,
      origin_address: origin.address,
      destination_lat: destination.lat,
      destination_lng: destination.lng,
      destination_address: destination.address,
    };

    localisations.push(item);
    setLocalisations([...localisations]);
  };

  const handleDelete = (index) => {
    const item = localisations[index];

    localisations.splice(index, 1);
    setLocalisations([...localisations]);

    if (item.id && item.id !== 0) {
      collectionToDelete.push(item);
      setCollectionToDelete([...collectionToDelete]);
    }
  };
  const handleSave = (afterSave, catchException) => {
    const collectionToSave = localisations.filter((item) => item.id === 0);
    const responses = [];
    collectionToSave.forEach((item) => {
      item.task = taskId;
      responses.push(api.saveItem(item));
    });

    collectionToDelete.forEach((item) => {
      responses.push(api.deleteItem(item));
    });

    Promise.all(responses)
      .then((results) => {
        afterSave(results);
      })
      .catch((exceptions) => {
        catchException(exceptions);
      });
  };

  return { localisations, getCollection, handleAdd, handleDelete, handleSave };
};
