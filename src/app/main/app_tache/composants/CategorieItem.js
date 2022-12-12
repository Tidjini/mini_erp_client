import React from "react";
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";

import InputBasic from "../composants/InputBasic";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import "../styles.css";

export default function CategorieItem(props) {
  const {
    item,
    id,
    editItem,
    setEditedValue,
    editedValue,
    onEditItem,
    onSaveEdit,
    onDelete,
    onCancelEditing,
  } = props;
  return (
    <ListItem className="item">
      <ListItemText
        primary={item}
        className="item-content"
        style={{ display: id === editItem ? "none" : "inline-block" }}
      />
      <InputBasic
        name="categorie"
        placeholder="Catégorie"
        handleChange={(e) => {
          setEditedValue(e.target.value);
        }}
        value={editedValue}
        style={{
          width: "90%",
          display: id === editItem ? "inline-block" : "none",
          autoFocus: true,
        }}
        horizontal={true}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="start"
          aria-label="edit-categorie"
          style={{
            display: id === editItem ? "none" : "inline-block",
          }}
          onClick={(e) => {
            onEditItem(item, id);
          }}
        >
          <EditIcon className="item-edit-icon" />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="save-edit-categorie"
          style={{
            display: id === editItem ? "inline-block" : "none",
          }}
          onClick={onCancelEditing}
        >
          <ClearIcon className="item-edit-icon" />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="save-edit-categorie"
          style={{
            display: id === editItem ? "inline-block" : "none",
          }}
          onClick={(e) => {
            onSaveEdit(id);
          }}
        >
          <SaveIcon className="item-save-icon" />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete-categorie"
          style={{
            display: id === editItem ? "none" : "inline-block",
          }}
          onClick={(e) => {
            onDelete(item, id);
          }}
        >
          <DeleteForeverIcon className="item-delete-icon" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
