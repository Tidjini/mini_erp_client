import React from "react";
import { useForm } from "@fuse/hooks";
import apiService from "app/services/ApiService";

export default function useView(
  name,
  defaultData = {},
  primary = undefined,
  pk = "id"
) {
  const { form, handleChange, setForm } = useForm(defaultData);

  React.useEffect(() => {
    apiService.initialize(name, pk);
    if (primary != "new") {
      apiService
        .getItem(primary)
        .then((data) => {
          setForm(data);
          console.log(data);
        })
        .catch((exception) => {});
    }
  }, []);

  const deleteItem = (item) => {
    apiService
      .deleteItem(item)
      .then((response) => {
        //todo display delete notification
        //todo and return
      })
      .catch((exception) => {});
  };

  const save = (item) => {
    apiService
      .saveItem(item)
      .then((response) => {
        //todo display delete notification
        //todo and return
      })
      .catch((exception) => {});
  };
  return { form, handleChange, setForm, save, deleteItem };
}
