import React, { Component, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import CollectionHeader from "app/ui/CollectionHeader";
import TableCollection from "app/ui/DemandeAchat/TableCollection";
import { collectionColumns, data } from "./DemandeAchatConfig";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

const styles = (theme) => ({
  layoutRoot: {},
});

function DemandeAchatCollectionView() {
  const dispatch = useDispatch();

  const demande_collection = useSelector(
    ({ demande_achat }) => demande_achat.demande.demande_collection
  );

  useEffect(() => {
    dispatch(Actions.getDemandeAchatCollection(1));
  }, []);

  function getCollectionPage(page) {
    dispatch(Actions.getDemandeAchatCollection(page));
  }

  function searchAction(search) {
    if (search === undefined || search === null || search === "")
      dispatch(Actions.getDemandeAchatCollection(1));
    else {
      dispatch(Actions.searchDemandeCollection(search));
    }
  }
  function onDelete(item) {
    dispatch(Actions.deleteDemande(item.id));
  }
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-64 h-64",
      }}
      header={
        <CollectionHeader
          icon="layers"
          title="Demande Achat"
          viewTitle="Demande achat"
          viewLink="/demande_achat/new/"
          searchAction={searchAction}
          canEditNew={true}
        />
      }
      content={
        <TableCollection
          columns={collectionColumns}
          collection={demande_collection}
          viewUrl="/demande_achat"
          getCollectionPage={getCollectionPage}
          onDelete={onDelete}
        />
      }
      innerScroll
    />
  );
}

const view = withReducer("demande_achat", reducer)(DemandeAchatCollectionView);

export default withStyles(styles, { withTheme: true })(view);
