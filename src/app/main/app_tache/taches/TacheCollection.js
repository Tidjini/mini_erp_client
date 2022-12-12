import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collectionCells, defaultItem } from "./Config";
import TacheRow from "./TacheRow";
import TacheRowMobile from "./TacheRowMobile";
import Filters from "./Filters";
import Collection from "app/main/composants/Collection";
import { list } from "app/services/application/ActionService";
import TacheDialog from "./TacheDialog";
import Pagination from "./Pagination";
import { Hidden } from "@material-ui/core";

export default function TacheCollection(props) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});

  const taches = useSelector(({ collection }) => collection.tache.taches);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCollection(filters, 1);
  }, [filters]);

  const getCollection = (filters, page) => {
    setLoading(true);
    dispatch(list("TACHE", "tache/api/taches", page, filters)).then((res) => {
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

  const [currentPage, setCurrentPage] = React.useState(1);

  const onNext = React.useCallback(
    (event) => {
      if (taches.next) {
        const page = currentPage + 1;
        getCollection(filters, page);
        setCurrentPage(page);
      }
    },
    [taches, filters]
  );
  const onPrevious = React.useCallback(
    (event) => {
      if (taches.previous) {
        const page = currentPage - 1;
        getCollection(filters, page);
        setCurrentPage(page);
      }
    },
    [taches, filters]
  );

  return (
    <div>
      <Hidden smDown>
        <Collection
          header="Tache"
          icon="assets/images/app_tache/tache.png"
          items={taches.results}
          loading={loading}
          columns={collectionCells}
          Row={TacheRow}
          viewUrl="tache-view"
          history={props.history}
          openDialog={undefined}
          Filters={
            <div>
              <Filters setFilters={setFilters} filters={filters} />
              <Pagination
                next={taches.next && onNext}
                previous={taches.previous && onPrevious}
                pages={taches.pages}
                current={currentPage}
              />
            </div>
          }
          id="id"
        />
      </Hidden>
      <Hidden mdUp>
        <Collection
          header="Tache"
          icon="assets/images/app_tache/tache.png"
          items={taches.results}
          loading={loading}
          columns={[]}
          Row={TacheRowMobile}
          viewUrl="tache-view"
          history={props.history}
          openDialog={undefined}
          id="id"
        />
      </Hidden>
    </div>
  );
}
