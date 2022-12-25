import React from "react";
import Header from "app/composants.v2/Header";
import CollectionActions from "app/composants.v2/collection/CollectionActions";
import { margins } from "app/composants.v2/constants";
import useView from "app/hooks/useView";
import Input from "app/composants.v2/Input";
import InputSelector from "app/composants.v2/InputSelector";
import { defaultItem, statues, taskLocation } from "./Config";
import InputCollection from "app/composants.v2/InputCollection";
import { Grid } from "@material-ui/core";
import Action from "app/hooks/Action";
import InputFile from "app/composants.v2/InputFile";
import MapView from "app/composants.v2/map/MapView";
import TypedMarker from "app/composants.v2/map/Marker";
import TaskMapView from "./TaskMapView";
import CollectionBody from "app/composants.v2/collection/CollectionBody";
import TaskLocationItem from "./TaskLocationItem";
import { localisations } from "./samples";

export default function TaskView(props) {
  const { id } = props.match.params;

  const {
    title,
    saveAction,
    form,
    handleChange: onFormChanged,
    handleFormChanged: onInFormChanged,
    handleGoBack: goBack,
  } = useView({
    name: "tasks",
    defaultTitle: "Tâche",
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

  //   const { directions, handleChangeDirections: onChangeDirection } =
  //     useDirections();

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
            />
            <InputCollection
              label="Affecter A"
              name="receiver"
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
            />

            {locations}
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

        <TaskMapView />

        {/* <Grid
          style={{
            margin: "30px 0",
            padding: "20px 5px",
            backgroundColor: "#E7E9EF",
            width: "100%",
            borderRadius: 10,
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <InputFile />
        </Grid> */}
        {/* <Grid
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
        </Grid> */}
      </Grid>
    </div>
  );
}
