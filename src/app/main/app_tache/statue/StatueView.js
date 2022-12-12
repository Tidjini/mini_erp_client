import React from "react";
import { Grid, List, Typography } from "@material-ui/core";
import Button from "app/main/composants/base/Button";

import "../styles.css";
import StatueItem from "./StatueItem";

import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import { list, save, destroy } from "app/services/application/ActionService";
import { useDispatch, useSelector } from "react-redux";

function StatueView(props) {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const getCollection = () => {
    setLoading(true);
    dispatch(list("TACHE-STATUE", "api/app_tache/tache_statues", 1)).then(
      (res) => {
        setLoading(false);
      }
    );
  };

  React.useEffect(() => {
    getCollection();
  }, []);

  const statues = useSelector(({ collection }) => collection.tache.statues);

  React.useEffect(() => {
    setCollection(statues);
  }, [statues]);

  const [collection, setCollection] = React.useState([]);

  const [editItem, setEditItem] = React.useState({
    id: 0,
    intitule: "",
    colour: "",
    cloture_tache: false,
  });

  const handleChange = (event) => {
    if (event.target.type == "checkbox") {
      setEditItem({ ...editItem, [event.target.name]: event.target.checked });
    } else
      setEditItem({ ...editItem, [event.target.name]: event.target.value });
  };

  const onAdd = React.useCallback(
    (event) => {
      collection.unshift({
        id: 0,
        intitule: "",
        colour: "",
        cloture_tache: false,
      });
      setCollection([...collection]);
    },
    [collection]
  );

  const onDelete = React.useCallback((item) => {
    dispatch(
      destroy("TACHE-STATUE", "api/app_tache/tache_statues", {
        id: item.id,
      })
    ).then((res) => {
      getCollection();
    });
  }, []);

  const onEditItem = React.useCallback((item) => {
    setEditItem({ ...item, intitule: item.intitule });
  }, []);

  const onSaveEdit = React.useCallback(
    (item) => {
      setEditItem({
        id: 0,
        intitule: "",
        colour: "",
        cloture_tache: false,
      });
      dispatch(
        save("TACHE-STATUE", "api/app_tache/tache_statues", { ...item })
      ).then((res) => {
        getCollection();
      });
    },
    [statues]
  );

  const cancelation = React.useCallback((e) => {
    setEditItem({
      id: 0,
      intitule: "",
      colour: "",
      cloture_tache: false,
    });
  });

  return (
    <Grid
      container
      style={{ padding: 10 }}
      direction="row"
      justifycontent="space-between"
      alignItems="center"
      spacing={1}
    >
      <Grid item container alignItems="center" xs={9} spacing={1}>
        <img
          alt="state"
          src={"assets/images/app_tache/statue.png"}
          className="collection-icon"
        />
        <div>
          <Typography className="collection-name">Statues</Typography>
        </div>
      </Grid>

      <Grid item xs={3}>
        <Button onClick={onAdd}>Ajouter</Button>
      </Grid>

      <List className="list">
        {collection.map((item, index) => (
          <StatueItem
            key={index}
            item={item}
            editItem={editItem}
            onEditItem={onEditItem}
            onCancelEditing={cancelation}
            onSaveEdit={onSaveEdit}
            onDelete={onDelete}
            handleChange={handleChange}
          />
        ))}
      </List>
    </Grid>
  );
}
export default withReducer("tache", reducer)(StatueView);
