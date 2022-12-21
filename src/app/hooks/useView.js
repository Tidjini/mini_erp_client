import React from "react";
import { useForm } from "@fuse/hooks";
import apiService from "app/services/ApiService";

export default function useView(
  params = { name, title, data: {}, primary: undefined, pk: "id" }
) {
  const { name, title: defaultTitle, data: defaultData, primary, pk } = params;

  const { form, handleChange, setForm } = useForm(defaultData);
  const [title, setTitle] = React.useState(defaultTitle);

  React.useEffect(() => {
    function handleTitleChanges() {
      if (!Boolean(primary)) {
        setTitle(`Nouveau ${defaultTitle}`);
        return;
      }
      if (primary === "nouveau") {
        setTitle(`Nouveau ${defaultTitle}`);
      } else {
        setTitle(`Edition ${defaultTitle} (${primary})`);
      }
    }

    function initialize() {
      if (!Boolean(primary)) return;
      apiService.initialize(name, pk);
      if (primary !== "nouveau") {
        apiService
          .getItem(primary)
          .then((data) => {
            setForm(data);
            console.log(data);
          })
          .catch((exception) => {});
      }
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
  return { title, form, handleChange, setForm, save, deleteItem };
}
