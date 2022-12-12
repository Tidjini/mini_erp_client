import React, { useEffect, useState, useCallback } from "react";
import { Typography, IconButton, Icon } from "@material-ui/core";
import { AppInputSearch } from "app/composants/inputs";

import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";
// import ConfigDialog from "./ConfigDialog";

function InputTable(props) {
  const dispatch = useDispatch();
  const { onHidden, onSelect, onChoose, filter } = props;

  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(filter);

  const collection = useSelector(({ consultation }) => consultation.collection);
  const config = useSelector(({ consultation }) => consultation.config);

  useEffect(() => {
    setPages(1);
    setCurrentPage(1);
    dispatch(Actions.getCollection(config.collectionName, 1, filter));
  }, [config, filter]);

  useEffect(() => {
    try {
      let p = Math.ceil(collection.count / collection.page_size);

      setPages(p);
    } catch (error) {
      setPages(1);
    }
  }, [collection]);

  useEffect(() => {
    dispatch(Actions.getCollection(config.collectionName, currentPage, search));
  }, [currentPage]);

  function onSearchEnter(event) {
    const query = event.target.value;
    setSearch(query);
    dispatch(Actions.getCollection(config.collectionName, currentPage, query));
  }

  return (
    <div
      className="w-full"
      style={{ minHeight: 650, maxHeight: 650, height: 650 }}
    >
      <div
        className="w-full flex"
        style={{
          alignItems: "center",
          justifycontent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-haspopup="true"
            onClick={(e) => {
              onHidden(e);
            }}
          >
            <Icon color="action" className="text-24">
              arrow_back
            </Icon>
          </IconButton>
          <img
            alt="state"
            src={"assets/images/compta/" + config.icon}
            style={{
              width: 36,
              height: 36,
            }}
          />
          <h4
            style={{
              fontSize: 18,
              marginLeft: 10,
              color: "#264653",
            }}
          >
            {config.header}
          </h4>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-haspopup="true"
            style={{ opacity: collection.previous ? 1 : 0 }}
            onClick={(e) => {
              if (collection.previous != null) setCurrentPage(currentPage - 1);
            }}
          >
            <Icon color="action" className="text-20">
              arrow_left
            </Icon>
          </IconButton>

          <Typography
            className="text-16"
            style={{
              fontSize: 16,
              fontWeight: "bold",
              opacity: !isNaN(pages) ? 1 : 0,
            }}
          >
            {currentPage + "/" + pages}
          </Typography>
          <IconButton
            aria-haspopup="true"
            style={{ opacity: collection.next ? 1 : 0 }}
            onClick={(e) => {
              if (collection.next != null) setCurrentPage(currentPage + 1);
            }}
          >
            <Icon color="action" className="text-20">
              arrow_right
            </Icon>
          </IconButton>

          <AppInputSearch
            name="Search"
            placeholder={config.collectionName}
            type="text"
            handleChange={(e) => {}}
            height={36}
            horizontal={true}
            onFocus={(event) => {}}
            onBlur={(event) => {}}
            onEnter={onSearchEnter}
            onTab={(event) => {}}
          />
        </div>
      </div>

      <div style={{ margin: "20px 10px" }}>
        <div
          className="w-full flex"
          style={{
            alignItems: "center",
            justifycontent: "space-around",
            borderRadius: "2px",
            boxShadow: "1px 3px 3px #9E9E9E20",
            borderWidth: 1,
            borderColor: "#b7b7a490",
            backgroundColor: "#0a939680",
          }}
        >
          {config.columns.map((col, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                borderWidth: "0 1px 0 0",
                borderColor: "#b7b7a490",
                padding: "10px 20px",
                marginRight: 10,
                fontWeight: "bold",
              }}
            >
              {col}
            </div>
          ))}
        </div>

        {collection.results.map((item, index) => (
          <div
            key={index}
            className="w-full flex"
            style={{
              alignItems: "center",
              justifycontent: "space-around",
              borderRadius: "2px",
              boxShadow: "1px 1px 1px #9E9E9E20",
              borderWidth: 1,
              borderColor: "#b7b7a420",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
            onClick={(event) => {
              onSelect(item);
            }}
            onDoubleClick={(event) => {
              //onEdit(item);
              onChoose(item);
            }}
          >
            {config.attributes.map((att, index) => {
              const name = att["name"];
              return (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    borderWidth: "0 1px 0 0",
                    borderColor: "#b7b7a490",
                    padding: "10px 20px",
                    marginRight: 10,
                    fontWeight: "bold",
                  }}
                >
                  {item[name] === false
                    ? "Non"
                    : item[name] === true
                    ? "Oui"
                    : item[name]}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default withReducer("consultation", reducer)(InputTable);
