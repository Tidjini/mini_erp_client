import { IconButton, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React from "react";

export default function Pagination(props) {
  const { next, previous, pages, current } = props;
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <IconButton
        style={{
          display: previous ? "inline-block" : "none",
          fontSize: 11,
        }}
        onClick={previous}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Typography
        style={{
          display: pages > 1 ? "inline-block" : "none",
          fontWeight: 700,
        }}
      >{`${current} / ${pages}`}</Typography>
      <IconButton
        style={{
          display: next ? "inline-block" : "none",
          fontSize: 11,
        }}
        onClick={next}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
}
