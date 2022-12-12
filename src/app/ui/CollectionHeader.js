import React from "react";
import { Paper, Button, Input, Icon, Typography } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { Link } from "react-router-dom";

function CollectionHeader(props) {
  const { searchAction, canEditNew } = props;
  const onChange = function (ev) {};

  function handleKeyPress(ev) {
    if (ev.key === "Enter") {
      searchAction(ev.target.value);
    }
  }
  const { icon, title, viewTitle, viewLink } = props;

  return (
    <div
      className="flex flex-1 w-full items-center justify-between"
      style={{ height: 50 }}
    >
      <div className="flex items-center">
        <FuseAnimate animation="transition.expandIn" delay={500}>
          <Icon className="text-32 mr-0 sm:mr-12">{icon}</Icon>
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex" variant="h6">
            {title}
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex flex-1 items-center justify-center px-12">
        <FuseAnimate animation="transition.slideDownIn" delay={300}>
          <Paper
            className="flex items-center w-full max-w-512 px-8 py-4 rounded-8"
            elevation={1}
          >
            <Icon className="mr-8" color="action">
              search
            </Icon>

            <Input
              placeholder="Search"
              className="flex flex-1"
              disableUnderline
              fullWidth
              inputProps={{
                "aria-label": "Recherche",
              }}
              onChange={onChange.bind(this)}
              onKeyPress={handleKeyPress}
            />
          </Paper>
        </FuseAnimate>
      </div>
      {canEditNew && (
        <FuseAnimate animation="transition.slideRightIn" delay={300}>
          <Button
            component={Link}
            to={viewLink}
            className="whitespace-no-wrap"
            variant="contained"
          >
            <span className="hidden sm:flex">Nouveau {viewTitle}</span>
            <span className="flex sm:hidden">Nouveau</span>
          </Button>
        </FuseAnimate>
      )}
    </div>
  );
}

export default CollectionHeader;
