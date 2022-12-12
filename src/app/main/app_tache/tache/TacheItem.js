import React from "react";
import {
  Grid,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import "../styles.css";
import TachePrimaryContent from "./TachePrimaryContent";

export default function TacheItem(props) {
  const { item, editItem, handleChange, onEditItem, onSaveEdit, onDelete } =
    props;

  return (
    <ListItem className="item" style={{ backgroundColor: `${item.colour}50` }}>
      <ListItemText
        primary={<TachePrimaryContent item={item} />}
        style={{ display: item.id === editItem.id ? "none" : "inline-block" }}
      />

      <ListItemSecondaryAction>
        <IconButton
          edge="start"
          aria-label="edit-statue"
          style={{
            display: item.id === editItem.id ? "none" : "inline-block",
          }}
          onClick={(e) => {
            onEditItem(item);
          }}
        >
          <EditIcon className="item-edit-icon" />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="save-edit-statue"
          style={{
            display: item.id === editItem.id ? "inline-block" : "none",
          }}
          onClick={(e) => {
            onSaveEdit(editItem);
          }}
        >
          <SaveIcon className="item-save-icon" />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete-statue"
          style={{
            display: item.id === editItem.id ? "none" : "inline-block",
          }}
          onClick={(e) => {
            onDelete(item);
          }}
        >
          <DeleteForeverIcon className="item-delete-icon" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
