import React from "react";
import { Grid, List, Typography } from "@material-ui/core";
import Button from "app/main/composants/base/Button";

import "../styles.css";
import TacheItem from "./TacheItem";
import Filters from "./Filters";

import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import { list, save, destroy } from "app/services/application/ActionService";
import { useDispatch, useSelector } from "react-redux";

function TacheView(props) {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const getCollection = () => {
    setLoading(true);
    dispatch(list("TACHE", "api/app_tache/taches", 1)).then((res) => {
      setLoading(false);
    });
  };

  React.useEffect(() => {
    getCollection();
  }, []);

  const taches = useSelector(({ tache }) => tache.tache.collection.results);

  React.useEffect(() => {
    setCollection(taches);
  }, [taches]);

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
      destroy("STATUE", "api/app_tache/tache_taches", {
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
      dispatch(save("STATUE", "api/app_tache/tache_taches", { ...item })).then(
        (res) => {
          getCollection();
        }
      );
    },
    [taches]
  );

  const [filters, setFilters] = React.useState({});

  return (
    <Grid
      container
      style={{ padding: 10 }}
      direction="row"
      justifycontent="space-between"
      alignItems="center"
      spacing={1}
    >
      <Grid item container alignItems="center" xs={10} spacing={1}>
        <img
          alt="state"
          src={"assets/images/app_tache/tache.png"}
          className="collection-icon"
        />
        <div>
          <Typography
            className="collection-name"
            style={{
              fontSize: 18,
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Tâches
          </Typography>
        </div>
      </Grid>
      <Grid item xs={2}>
        <Button onClick={onAdd}>Ajouter</Button>
      </Grid>

      {/* <Filters filters={filters} setFilters={setFilters} /> */}

      <List className="list">
        {collection.map((item, index) => (
          <TacheItem
            key={index}
            item={item}
            editItem={editItem}
            onEditItem={onEditItem}
            onSaveEdit={onSaveEdit}
            onDelete={onDelete}
            handleChange={handleChange}
          />
        ))}
      </List>
    </Grid>
  );
}
export default withReducer("tache", reducer)(TacheView);
