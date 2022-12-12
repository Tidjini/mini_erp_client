import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import CollectionHeader from "app/ui/CollectionHeader";
import TableCollection from "app/ui/DevisAchat/TableCollection";
import { collectionColumns } from "./DevisAchatConfig";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import * as Actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

const styles = (theme) => ({
  layoutRoot: {},
});

function DevisAchatCollectionView() {
  const dispatch = useDispatch();

  const devis_collection = useSelector(
    ({ devis_achat }) => devis_achat.devis.devis_collection
  );

  useEffect(() => {
    dispatch(Actions.getDevisAchatCollection(1));
  }, []);

  function getCollectionPage(page) {
    dispatch(Actions.getDevisAchatCollection(page));
  }

  function searchAction(search) {
    if (search === undefined || search === null || search === "")
      dispatch(Actions.getDevisAchatCollection(1));
    else {
      dispatch(Actions.searchDevisCollection(search));
    }
  }

  function onDelete(item) {
    dispatch(Actions.deleteDevis(item.id));
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
          title="Devis Achat"
          viewTitle="Devis Achat"
          viewLink="/devis_achat/new/"
          searchAction={searchAction}
          canEditNew={false}
        />
      }
      content={
        <TableCollection
          columns={collectionColumns}
          collection={devis_collection}
          viewUrl="/devis_achat"
          getCollectionPage={getCollectionPage}
          onDelete={onDelete}
        />
      }
      innerScroll
    />
  );
}

const view = withReducer("devis_achat", reducer)(DevisAchatCollectionView);

export default withStyles(styles, { withTheme: true })(view);
