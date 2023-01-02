import React from "react";
import history from "@history";

import { useForm } from "@fuse/hooks";
import ApiService from "app/services/ApiService";
import Action from "./Action";
import { backcolors } from "app/composants.v2/constants";

export default function useView({
  name,
  defaultTitle,
  defaultData = {},
  primary,
  pk = "id",
  backUrl,
}) {
  const apiService = new ApiService(name, pk);

  const { form, handleChange, setForm } = useForm(defaultData);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState(defaultTitle);

  const deleteAction = new Action("Supprimer", () => handleDelete(), "delete", {
    backgroundColor: backcolors.delete,
  });

  const saveAction = new Action("Sauvgarder", () => handleSave(), "save", {
    backgroundColor: backcolors.add,
  });

  const handleGoBack = () => {
    backUrl ? history.replace(backUrl) : history.goBack();
  };

  const handleFormChanged = React.useCallback(
    (field, value) => {
      if (value === undefined) value = null;
      const newForm = { ...form };
      newForm[field] = value;
      setForm({ ...newForm });
    },
    [form]
  );

  React.useEffect(() => {
    function handleTitleChanges() {
      if (!Boolean(primary) || primary === "nouveau") {
        setTitle(`Nouveau ${defaultTitle}`);
        return;
      }
      setTitle(`Edition ${defaultTitle} (${primary})`);
    }

    function initialize() {
      if (!Boolean(primary) || primary === "nouveau") {
        setLoading(false);
        return;
      }

      apiService
        .getItem(primary)
        .then((data) => {
          setForm(data);
          setLoading(false);
        })
        .catch((exception) => {
          setLoading(false);
        });
    }
    setLoading(true);
    handleTitleChanges();
    initialize();
  }, []);

  const handleDelete = React.useCallback(() => {
    if (!Boolean(form)) return;

    //todo clean collection localy if you want
    apiService
      .deleteItem(form)
      .then((response) => {
        handleGoBack();
        setForm(defaultData);
      })
      .catch((exception) => {
        handleGoBack();
        setForm(defaultData);
      });
  }, [form, history]);

  const handleSave = React.useCallback(() => {
    apiService
      .saveItem(form)
      .then((response) => {
        handleGoBack();
        setForm(defaultData);
      })
      .catch((exception) => {
        handleGoBack();
        setForm(defaultData);
      });
  }, [form]);
  return {
    title,
    form,
    loading,
    handleChange,
    handleGoBack,
    handleDelete,
    handleSave,
    handleFormChanged,
    deleteAction,
    saveAction,
  };
}
