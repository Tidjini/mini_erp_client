import React from "react";
import history from "@history";

import { useForm } from "@fuse/hooks";
import apiService from "app/services/ApiService";
import Action from "./Action";

export default function useView(
  params = { name, title, data: {}, primary, pk: "id" }
) {
  const { name, title: defaultTitle, data: defaultData, primary, pk } = params;

  const { form, handleChange, setForm } = useForm(defaultData);
  const [title, setTitle] = React.useState(defaultTitle);

  const handleGoBack = () => {
    history.goBack();
  };

  React.useEffect(() => {
    function handleTitleChanges() {
      if (!Boolean(primary) || primary === "nouveau") {
        setTitle(`Nouveau ${defaultTitle}`);
        return;
      }
      setTitle(`Edition ${defaultTitle} (${primary})`);
    }

    function initialize() {
      apiService.initialize(name, pk);

      if (!Boolean(primary) || primary === "nouveau") return;

      apiService
        .getItem(primary)
        .then((data) => {
          setForm(data);
          console.log(data);
        })
        .catch((exception) => {});
    }

    handleTitleChanges();
    initialize();
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
  return { title, form, handleChange, handleGoBack, setForm, save, deleteItem };
}
