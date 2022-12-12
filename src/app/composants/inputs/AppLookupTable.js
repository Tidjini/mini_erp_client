import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Typography, IconButton, Icon, Dialog, Slide } from "@material-ui/core";
import { AppInputSearch } from "app/composants/inputs";

import { DATA_SERVICE_URL } from "app/main/helpers/endpoints";

const JOURNALS_PATH = "journals/";
const PERIODS_PATH = "periods/";
const COMPTES_PATH = "comptes/";
const TIERS_PATH = "tiers/";
const BANQUES_PATH = "banques/";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppLookupTable(props) {
  const {
    onExit,
    onSelect,
    filter,
    context,
    openDialog,
    setOpenDialog,
    initial,
  } = props;
  const [items, setItems] = React.useState({
    results: [],
    count: 0,
    previous: null,
    next: null,
    page_size: 10,
  });
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(filter);

  async function onGetItems(page = 1, search = "") {
    //setLoading(true);
    const link = buildLink(page, search);
    if (link === undefined) return;
    const response = await axios.get(link);
    //setLoading(false);
    setItems({ ...response.data, page_size: 10 });
  }

  useEffect(() => {
    setPages(1);
    setCurrentPage(1);
    onGetItems(1, filter);
    setSearch(filter);
  }, [filter]);

  useEffect(() => {
    try {
      let p = Math.ceil(items.count / items.page_size);
      setPages(p);
    } catch (error) {
      setPages(1);
    }
  }, [items]);

  function getPage(page) {
    setCurrentPage(page);
    onGetItems(page, search);
  }

  function onSearchEnter(event) {
    const query = event.target.value;
    setPages(1);
    setCurrentPage(1);
    onGetItems(1, query);
    setSearch(query);
  }
  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  const onExitDialog = () => {
    onExit();
  };

  function buildLink(page, search = undefined) {
    let link = DATA_SERVICE_URL;
    let path = "";
    switch (context.collectionName) {
      case "journal":
        path = JOURNALS_PATH;
        break;
      case "period":
        path = PERIODS_PATH;
        break;
      case "compte":
        path = COMPTES_PATH;
        break;

      case "tiers":
        path = TIERS_PATH;
        break;

      case "banques":
        path = BANQUES_PATH;
        break;

      default:
        return undefined;
    }

    link = link + path;

    link =
      search !== undefined && search !== null
        ? link + "?page=" + page + "&search=" + search
        : link + "?page=" + page;

    return link;
  }

  return (
    <Dialog
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={onCloseDialog}
      onExit={onExitDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg"
    >
      <div
        className="w-full"
        style={{ minHeight: 650, maxHeight: 650, height: 650 }}
      >
        <div
          className="w-full flex"
          style={{
            alignItems: "center",
            justifycontent: "space-between",
            padding: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-haspopup="true"
              onClick={(e) => {
                //onSelect(initial);
                onCloseDialog();
              }}
            >
              <Icon color="action" className="text-24">
                arrow_back
              </Icon>
            </IconButton>
            <img
              alt="state"
              src={"assets/images/compta/" + context.icon}
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
              {context.header}
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
              style={{ opacity: items.previous ? 1 : 0 }}
              onClick={(e) => {
                if (items.previous != null) getPage(currentPage - 1);
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
              style={{ opacity: items.next ? 1 : 0 }}
              onClick={(e) => {
                if (items.next != null) getPage(currentPage + 1);
              }}
            >
              <Icon color="action" className="text-20">
                arrow_right
              </Icon>
            </IconButton>

            <AppInputSearch
              name="Search"
              placeholder="Recherche"
              type="text"
              handleChange={(e) => {
                setSearch(e.target.value);
              }}
              height={36}
              horizontal={true}
              onFocus={(event) => {}}
              onBlur={(event) => {}}
              onEnter={(event) => {
                onSearchEnter(event);
              }}
              value={search}
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
            {context.columns.map((col, index) => (
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

          {items.results.map((item, index) => (
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
              onClick={(event) => {}}
              onDoubleClick={(event) => {
                onSelect(item);
                setOpenDialog(false);
              }}
            >
              {context.attributes.map((att, index) => {
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
    </Dialog>
  );
}
