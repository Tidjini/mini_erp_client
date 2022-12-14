import React from "react";
//before save to backend save location to array of locations
import { ApiService } from "app/services/ApiService";

const api = new ApiService("task-localisations");

export const useLocalisation = (id) => {
  //all locations
  const [taskId, setTaskId] = React.useState(id);
  const [localisations, setLocalisations] = React.useState([]);
  const [collectionToDelete, setCollectionToDelete] = React.useState([]);

  const getCollection = () => {
    api
      .getCollectionWithParams({ task: taskId })
      .then((collection) => {
        setLocalisations(collection);
      })
      .catch((exception) => {});
  };
  React.useEffect(() => {
    if (!Boolean(taskId) || taskId === "nouveau") return;
    getCollection();
  }, [taskId]);

  const handleAdd = (origin, destination, distance, duration) => {
    const item = {
      origin_lat: origin.lat,
      origin_lng: origin.lng,
      origin_address: origin.address,
      destination_lat: destination.lat,
      destination_lng: destination.lng,
      destination_address: destination.address,
      distance,
      duration,
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
  const handleSave = (taskId, afterSave, catchException) => {
    const collectionToSave = localisations.filter(
      (item) => !Boolean(item.id) || item.id === 0
    );
    const responses = [];

    collectionToSave.forEach((item) => {
      item.task = Number(taskId);
      responses.push(api.saveItem(item));
    });

    collectionToDelete.forEach((item) => {
      responses.push(api.deleteItem(item));
    });

    Promise.all(responses)
      .then((results) => {
        afterSave && afterSave(results);
      })
      .catch((exceptions) => {
        catchException && catchException(exceptions);
      });
  };

  return {
    localisations,
    getCollection,
    handleAdd,
    handleDelete,
    handleSave,
    setTaskId,
  };
};
