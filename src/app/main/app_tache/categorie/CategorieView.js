import React from "react";
import { Grid, List, Typography } from "@material-ui/core";
import InputBasic from "../composants/InputBasic";
import Button from "app/main/composants/base/Button";

import "../styles.css";
import CategorieItem from "../composants/CategorieItem";

import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import { list, save, destroy } from "app/services/application/ActionService";
import { useDispatch, useSelector } from "react-redux";

function CategorieView(props) {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const getCollection = () => {
    setLoading(true);
    dispatch(list("TACHE-CATEGORIE", "api/app_tache/tache_categories", 1)).then(
      (res) => {
        setLoading(false);
      }
    );
  };

  React.useEffect(() => {
    getCollection();
  }, []);

  const categories = useSelector(
    ({ collection }) => collection.tache.categories
  );

  const [editItem, setEditItem] = React.useState(undefined);
  const [newCategorie, setNewCategorie] = React.useState("");
  const [editedValue, setEditedValue] = React.useState("");

  const onAdd = React.useCallback(
    (event) => {
      if (newCategorie === "") return;

      dispatch(
        save("TACHE-CATEGORIE", "api/app_tache/tache_categories", {
          intitule: newCategorie,
        })
      ).then((res) => {
        getCollection();
      });
    },
    [newCategorie, categories]
  );

  const onDelete = React.useCallback(
    (item, id) => {
      dispatch(
        destroy("TACHE-CATEGORIE", "api/app_tache/tache_categories", {
          id: id,
          intitule: item,
        })
      ).then((res) => {
        getCollection();
      });
    },
    [categories]
  );

  const onEditItem = React.useCallback(
    (item, id) => {
      setEditItem(id);
      setEditedValue(item);
    },
    [categories]
  );

  const onSaveEdit = React.useCallback(
    (id) => {
      setEditItem(undefined);
      dispatch(
        save("TACHE-CATEGORIE", "api/app_tache/tache_categories", {
          id: id,
          intitule: editedValue,
        })
      ).then((res) => {
        getCollection();
      });
    },
    [editedValue, categories]
  );

  const onCancelEditing = React.useCallback((event) => {
    setEditItem(undefined);
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
      <Grid item container alignItems="center" sm={12} spacing={1}>
        <img
          alt="state"
          src={"assets/images/app_tache/categories.png"}
          className="collection-icon"
        />
        <div>
          <Typography className="collection-name">Catégories</Typography>
        </div>
      </Grid>
      <Grid item xs={8}>
        <InputBasic
          name="newCategorie"
          placeholder="Nouvelle Catégorie"
          handleChange={(e) => {
            setNewCategorie(e.target.value);
          }}
          value={newCategorie}
          style={{ width: "100%" }}
          horizontal={true}
        />
      </Grid>
      <Grid item xs={4}>
        <Button onClick={onAdd}>Ajouter</Button>
      </Grid>

      <List className="list">
        {categories.map((item, index) => (
          <CategorieItem
            key={index}
            id={item.id}
            item={item.intitule}
            editItem={editItem}
            setEditedValue={setEditedValue}
            editedValue={editedValue}
            onEditItem={onEditItem}
            onSaveEdit={onSaveEdit}
            onDelete={onDelete}
            onCancelEditing={onCancelEditing}
          />
        ))}
      </List>
    </Grid>
  );
}
export default withReducer("tache", reducer)(CategorieView);
