import React, { useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { list } from "app/services/infrabitumService/ActionService";
import { useDispatch, useSelector } from "react-redux";
import { collectionCells, defaultItem } from "./ArticleConfig";
import ArticleRow from "./composants/ArticleRow";
import Filters from "./composants/Filters";
import Collection from "app/main/composants/Collection";
import ArticleDialog from "./ArticleDialog";

function ArticleCollectionView(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({ search: "" });

  const articles = useSelector(({ article }) => article.articles.results);
  const article = useSelector(({ article }) => article.article);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCollection(filters);
  }, [filters]);

  const getCollection = (filters) => {
    setLoading(true);
    dispatch(list("ARTICLE", "articles", 1, filters)).then((res) => {
      setLoading(false);
    });
  };

  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState(defaultItem);

  const onItemClick = (event, item) => {
    event.stopPropagation();
    setItem(item);
    setOpen(true);
  };

  return (
    <div>
      <Collection
        header="Articles"
        icon="assets/images/app_production/maintenance.png"
        items={articles}
        loading={loading}
        columns={collectionCells}
        Row={ArticleRow}
        viewUrl="article"
        history={props.history}
        openDialog={onItemClick}
        Filters={<Filters setFilters={setFilters} filters={filters} />}
      />
      <ArticleDialog
        open={open}
        setOpen={setOpen}
        item={item}
        context="ARTICLE"
      />
    </div>
  );
}

export default withReducer("article", reducer)(ArticleCollectionView);
