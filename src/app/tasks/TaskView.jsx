import React from "react";
import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/collection/CollectionActions";
import { backcolors, margins } from "app/composants.v2/constants";
import useView from "app/hooks/useView";
import Input from "app/composants.v2/Input";
import InputSelector from "app/composants.v2/InputSelector";
import { defaultItem, statues } from "./Config";
import InputCollection from "app/composants.v2/InputCollection";
import { Grid, Typography } from "@material-ui/core";
import Action from "app/hooks/Action";
import TaskMapView from "./TaskMapView";
import TaskLocationItem from "./TaskLocationItem";
import { useLocalisation } from "./utils";

import ApiService from "app/services/ApiService";
import { useSelector } from "react-redux";
import TaskNofitication from "app/composants.v2/notification/TaskNofitication";
import Loader from "app/composants.v2/Loader";

export default function TaskView(props) {
  const { id } = props.match.params;

  const user = useSelector(({ auth }) => auth.user.data);

  const {
    localisations,
    handleAdd: onPathAdd,
    handleSave: onSavePaths,
    handleDelete: onDeleteLocalisation,
    setTaskId: onTaskIdChanged,
  } = useLocalisation(id);

  const {
    title,
    form,
    handleSave: onSave,
    handleChange: onFormChanged,
    handleFormChanged: onInFormChanged,
    handleGoBack: goBack,
  } = useView({
    name: "tasks",
    defaultTitle: "Tâche",
    primary: id,
    data: defaultItem,
  });

  const apiService = new ApiService("tasks");

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

  const saveAction = new Action(
    "Sauvgarder",
    () => {
      apiService
        .saveItem(form)
        .then((response) => {
          onSavePaths(response.id);
        })
        .catch((exception) => {
          goBack();
        });
    },
    "save",
    {
      backgroundColor: backcolors.add,
    }
  );

  const actions = [saveAction, accepteAction, terminerAction, cancelAction];

  const [selectedPath, setSelectedPath] = React.useState();

  if (!user.is_active) return <Typography>USER IS NOT ACTIVE</Typography>;

  return (
    <div>
      <Loader isLoading={loading} />
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
        <Grid container spacing={1} style={{ alignItems: "flex-start" }}>
          <Grid
            item
            container
            spacing={1}
            style={{
              padding: "30px 20px",
            }}
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
          >
            <Grid
              item
              container
              spacing={1}
              style={{
                alignItems: "flex-start",
                backgroundColor: "#8d99ae01",
                boxShadow: "1px 3px 3px 3px #9E9E9E20",
                borderRadius: 15,
                padding: 20,
              }}
            >
              <Input
                label="Intitule"
                placeholder="Tâche Intitule"
                name="label"
                onChange={onFormChanged}
                value={form.label}
                disabled={!user.is_admin && !user.is_staff}
              />
              <InputCollection
                label="Affecter A"
                name="receiver"
                disabled={!user.is_admin && !user.is_staff}
                style={{
                  xl: 6,
                  lg: 6,
                  md: 6,
                  sm: 6,
                  xs: 12,
                }}
                lookup={{
                  collection: "profiles",
                  display: "name",
                  value: "id",
                  emptyValue: { display: "Non Définie", value: null },
                  defaultValue: form.receiver,
                }}
                onSelectItem={(item) => {
                  if (!user.is_admin && !user.is_staff) return;
                  onInFormChanged("receiver", item.value);
                }}
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
                disabled={!user.is_admin && !user.is_staff}
              />

              <Grid
                style={{
                  marginTop: 20,
                  width: "100%",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <CollectionActions actions={actions} />
              </Grid>
            </Grid>
          </Grid>
          <TaskMapView onSave={onPathAdd} path={selectedPath} />
          <Grid
            item
            container
            spacing={1}
            style={{
              alignItems: "flex-start",
              backgroundColor: "#8d99ae01",
              boxShadow: "1px 3px 3px 3px #9E9E9E20",
              borderRadius: 15,
              padding: "30px 20px",
            }}
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
          >
            {localisations.map((item, index) => {
              return (
                <TaskLocationItem
                  key={index}
                  data={item}
                  onClick={(event) => {
                    setSelectedPath(item);
                  }}
                  onDelete={(event) => {
                    onDeleteLocalisation(index);
                  }}
                />
              );
            })}
          </Grid>
        </Grid>
        <TaskNofitication />
      </div>
    </div>
  );
}
