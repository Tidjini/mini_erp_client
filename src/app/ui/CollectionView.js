import React, { useEffect, useState } from "react";
import { FusePageCarded, FuseLoading } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import { TableCollection } from "./TableCollectionView";
import CollectionHeader from "app/ui/CollectionHeader";

export default function CollectionView(props) {
  const {
    dataTemplate,
    actions,
    columns,
    Dialog,
    apiData,
    collectionName,
    collectionLabel,
    paramtters,
    count,
    next,
    searchText,
    previous,
    loading,
  } = props;

  const [page, setPage] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      actions.getCollectionPerPage(collectionName, { ...paramtters, page: 1 })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.setLoading(true));
  }, [dispatch]);

  //this search just for local entities

  const onEditing = (rowInfo) => {
    return dispatch(actions.openDialog(rowInfo));
  };

  const onNewClicked = (event) => {
    return dispatch(actions.openNewDialog());
  };

  const setNextPage = (page) => {
    if (page <= 0) page = 1;
    setPage(page);

    if (next != null || previous != null) {
      dispatch(actions.getCollectionPerPage(collectionName, { page: page }));
      //setData(apiData);
    }
  };

  useEffect(() => {
    setNextPage(page);
  }, []);
  const onSearchTextChanged = (ev) => {
    dispatch(actions.setSearchText("search", ev.target.value));
  };

  const [data, setData] = useState(apiData);
  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  const onSearchApi = () => {
    dispatch(
      actions.getCollectionPerPage(collectionName, {
        search: searchText,
        page: 1,
      })
    );
  };

  return (
    <React.Fragment>
      <FusePageCarded
        classes={{
          content: "flex",
          header: "min-h-48 h-48 sm:h-64 sm:min-h-64",
        }}
        header={
          <CollectionHeader
            icon="dashboard"
            title={collectionLabel}
            actionTitle={"Ajouter " + collectionLabel}
            viewLink="#"
            onNewClicked={onNewClicked}
            dialogEditing
            onSearchTextChanged={onSearchTextChanged}
            onSearchApi={onSearchApi}
            searchText={searchText}
          />
        }
        content={
          loading ? (
            <FuseLoading />
          ) : (
            <TableCollection
              rows={columns}
              data={data}
              viewUrl={"#"}
              dataTemplate={dataTemplate}
              onEditing={onEditing}
              count={count}
              setNextPage={setNextPage}
              next={next}
              previous={previous}
              index={page}
            />
          )
        }
        innerScroll
      />
      {Dialog && <Dialog />}
    </React.Fragment>
  );
}
