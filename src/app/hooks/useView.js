import React from "react";
import history from "@history";

import { useForm } from "@fuse/hooks";
import apiService from "app/services/ApiService";
import Action from "./Action";
import { backcolors } from "app/composants.v2/constants";

export default function useView(
  params = { name, title, data: {}, primary, pk: "id" }
) {
  const { name, title: defaultTitle, data: defaultData, primary, pk } = params;
  const { form, handleChange, setForm } = useForm(defaultData);
  const [title, setTitle] = React.useState(defaultTitle);

  const deleteAction = new Action("Supprimer", () => handleDelete(), "delete", {
    backgroundColor: backcolors.delete,
  });

  const saveAction = new Action("Sauvgarder", () => handleSave(), "save", {
    backgroundColor: backcolors.add,
  });

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

  const handleDelete = React.useCallback(() => {
    console.log("on handleDelete callback", form);
    if (!Boolean(form)) return;

    //todo clean collection localy if you want
    apiService
      .deleteItem(form)
      .then((response) => {
        handleGoBack();
        setForm(null);
      })
      .catch((exception) => {
        handleGoBack();
        setForm(null);
      });
  }, [form, history]);

  const handleSave = React.useCallback(() => {
    apiService
      .saveItem(form)
      .then((response) => {
        //todo display delete notification
        //todo and return
      })
      .catch((exception) => {});
  }, [form]);
  return {
    title,
    form,
    handleChange,
    handleGoBack,
    handleDelete,
    handleSave,
    deleteAction,
    saveAction,
  };
}
