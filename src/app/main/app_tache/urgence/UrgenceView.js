import React from "react";
import { Grid, List, Typography } from "@material-ui/core";
import Button from "app/main/composants/base/Button";

import "../styles.css";
import UrgenceItem from "./UrgenceItem";

import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import { list, save, destroy } from "app/services/application/ActionService";
import { useDispatch, useSelector } from "react-redux";

function UrgenceView(props) {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const getCollection = () => {
    setLoading(true);
    dispatch(list("TACHE-URGENCE", "api/app_tache/tache_urgences", 1)).then(
      (res) => {
        setLoading(false);
      }
    );
  };

  React.useEffect(() => {
    getCollection();
  }, []);

  const urgences = useSelector(({ collection }) => collection.tache.urgences);

  React.useEffect(() => {
    setCollection(urgences);
  }, [urgences]);

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
      destroy("TACHE-STATUE", "api/app_tache/tache_urgences", {
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
        save("TACHE-STATUE", "api/app_tache/tache_urgences", { ...item })
      ).then((res) => {
        getCollection();
      });
    },
    [urgences]
  );

  const onCancelEditing = React.useCallback((event) => {
    setEditItem({
      id: 0,
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
          src={"assets/images/app_tache/urgence.png"}
          className="collection-icon"
        />
        <div>
          <Typography className="collection-name">Urgences</Typography>
        </div>
      </Grid>

      <Grid item xs={3}>
        <Button onClick={onAdd}>Ajouter</Button>
      </Grid>

      <List className="list">
        {collection.map((item, index) => (
          <UrgenceItem
            key={index}
            item={item}
            editItem={editItem}
            onEditItem={onEditItem}
            onSaveEdit={onSaveEdit}
            onDelete={onDelete}
            handleChange={handleChange}
            onCancelEditing={onCancelEditing}
          />
        ))}
      </List>
    </Grid>
  );
}
export default withReducer("tache", reducer)(UrgenceView);
