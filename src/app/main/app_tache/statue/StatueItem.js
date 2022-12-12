import React from "react";
import {
  Checkbox,
  Grid,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";

import InputBasic from "../composants/InputBasic";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import "../styles.css";

export default function StatutItem(props) {
  const {
    item,
    editItem,
    handleChange,
    onEditItem,
    onSaveEdit,
    onDelete,
    onCancelEditing,
  } = props;

  return (
    <ListItem className="item" style={{ backgroundColor: `${item.colour}20` }}>
      <ListItemText
        primary={
          <Typography style={{ fontWeight: "bold" }}>
            {item.intitule}
          </Typography>
        }
        secondary={
          item.cloture_tache
            ? `Colour: ${item.colour}, Cloturé`
            : `Colour: ${item.colour}`
        }
        style={{ display: item.id === editItem.id ? "none" : "inline-block" }}
      />
      <Grid
        container
        direction="row"
        justifycontent="space-between"
        alignItems="center"
        spacing={1}
        style={{ display: item.id === editItem.id ? "flex" : "none" }}
      >
        <Grid item xs={5}>
          <InputBasic
            name="intitule"
            placeholder="intitule"
            handleChange={handleChange}
            value={editItem.intitule}
            horizontal={true}
          />
        </Grid>
        <Grid item xs={3}>
          <InputBasic
            name="colour"
            placeholder="Colour"
            handleChange={handleChange}
            value={editItem.colour}
            horizontal={true}
          />
        </Grid>
        <Grid item xs={1}>
          <Checkbox
            name="start_tache"
            onChange={handleChange}
            checked={editItem.start_tache}
            style={{ color: "#0a9396" }}
          />
        </Grid>
        <Grid item xs={1}>
          <Checkbox
            name="cloture_tache"
            onChange={handleChange}
            checked={editItem.cloture_tache}
            style={{ color: "#0a9396" }}
          />
        </Grid>
      </Grid>

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
          onClick={onCancelEditing}
        >
          <ClearIcon className="item-edit-icon" />
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
