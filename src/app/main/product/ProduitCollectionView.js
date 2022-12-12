import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageCarded } from "@fuse";
import CollectionHeader from "app/ui/CollectionHeader";
import TableCollection from "app/ui/TableCollection";

const styles = (theme) => ({
  layoutRoot: {},
});
const data = [
  {
    id: 5,
    name: "iPhone 5",
    categories: ["phone", "tech"],
    priceTaxIncl: 150,
    quantity: 50,
    active: true,
  },
  {
    id: 9,
    name: "iPhone 5",
    categories: ["phone", "tech"],
    priceTaxIncl: 150,
    quantity: 50,
    active: true,
  },
];
const rows = [
  {
    id: "image",
    align: "left",
    disablePadding: true,
    label: "",
    sort: false,
  },
  {
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Name",
    sort: true,
  },
  {
    id: "categories",
    align: "left",
    disablePadding: false,
    label: "Category",
    sort: true,
  },
  {
    id: "priceTaxIncl",
    align: "right",
    disablePadding: false,
    label: "Price",
    sort: true,
  },
  {
    id: "quantity",
    align: "right",
    disablePadding: false,
    label: "Quantity",
    sort: true,
  },
  {
    id: "active",
    align: "right",
    disablePadding: false,
    label: "Active",
    sort: true,
  },
];

class ProduitCollectionView extends Component {
  render() {
    const { classes } = this.props;
    //const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    return (
      <FusePageCarded
        classes={{
          content: "flex",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={
          <CollectionHeader
            icon="layers"
            title="List Produits"
            viewTitle="Produit"
            viewLink="produit-view"
          />
        }
        content={
          <TableCollection
            rows={rows}
            collectionData={data}
            viewUrl="produit-view"
          />
        }
        innerScroll
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProduitCollectionView);
