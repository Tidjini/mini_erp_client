import React from "react";
import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/collection/CollectionActions";
import { margins } from "app/composants.v2/constants";
import useView from "app/hooks/useView";
import Input from "app/composants.v2/Input";
import InputSelector from "app/composants.v2/InputSelector";
import { defaultItem, statues } from "./Config";
import InputCollection from "app/composants.v2/InputCollection";
import useLookupCollection from "app/hooks/useLookupCollection";
import { Grid } from "@material-ui/core";
import Action from "app/hooks/Action";

export default function TaskView(props) {
  const { id } = props.match.params;

  const {
    title,
    saveAction,
    deleteAction,
    form,
    handleChange: onFormChanged,
    handleGoBack: goBack,
  } = useView({
    name: "tasks",
    title: "Tâche",
    primary: id,
    data: defaultItem,
  });
  const accepteAction = new Action(
    "Accepter",
    () => {
      console.log("On Accept Clicked");
    },
    "verified_user",
    {
      backgroundColor: "#FFB703",
    }
  );
  const terminerAction = new Action(
    "Terminer",
    () => {
      console.log("On Accept Clicked");
    },
    "done_all",
    {
      backgroundColor: "#52b69a",
    }
  );
  const cancelAction = new Action(
    "Annuler",
    () => {
      console.log("On Accept Clicked");
    },
    "cancel",
    {
      backgroundColor: "#E63946",
    }
  );
  const actions = [saveAction, accepteAction, terminerAction, cancelAction];
  const {
    data,
    open,
    selected,
    handleInputChange: onInputChange,
    handleSelection: onSelect,
    handleOpen: onOpen,
    handleClose: onClose,
  } = useLookupCollection({
    name: "profiles",
    filter: {},
    display: "name",
    value: "id",
    emptyValue: {
      display: "Non Définie",
      value: null,
    },
    defaultValue: form.receiver,
  });
  return (
    <div style={{ margin: margins.default }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Header title={title} goBack={goBack} />
        {/* <CollectionActions actions={actions} /> */}
      </div>
      <Grid
        container
        spacing={1}
        style={{ alignItems: "flex-start", padding: 20 }}
        xl={6}
        lg={6}
        md={12}
        sm={12}
        xs={12}
      >
        <Input
          label="Intitule"
          placeholder="Tâche Intitule"
          name="label"
          onChange={onFormChanged}
          value={form.label}
        />
        <InputCollection
          label="Affecter A"
          name="receiver"
          value={form.receiver}
          selected={selected}
          options={data}
          open={open}
          onChange={onFormChanged}
          onInputChange={onInputChange}
          onSelect={(event, item) => {
            onSelect(item);
            //todo review this
            event.target.name = "receiver";
            event.target.value = item ? item.value : null;
            onFormChanged(event);
          }}
          onOpen={onOpen}
          onClose={onClose}
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
        />
        <InputSelector
          label="Statue"
          name="statue"
          value={form.statue}
          options={statues}
          onChange={onFormChanged}
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
        />
        <Input
          label="Description"
          placeholder="Description de cette tâche"
          name="description"
          onChange={onFormChanged}
          value={form.description}
          style={{
            multiline: true,
            rows: 10,
          }}
        />
        <div
          style={{
            margin: "10px 2px",
            padding: "20px 5px",
            backgroundColor: "#E7E9EF",
            width: "100%",
            borderRadius: 10,
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <CollectionActions actions={actions} />
        </div>
      </Grid>
    </div>
  );
}
