import React, { useEffect, useState } from "react";
import {
  Button,
  Tab,
  Tabs,
  TextField,
  InputAdornment,
  Icon,
  Typography,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate, FusePageCarded, FuseChipSelect, FuseUtils } from "@fuse";
import { useForm } from "@fuse/hooks";
import { Link } from "react-router-dom";
import clsx from "clsx";
import _ from "@lodash";
import ViewHeader from "./../../ui/ViewHeader";

const useStyles = makeStyles((theme) => ({
  productImageFeaturedStar: {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },
  productImageUpload: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  productImageItem: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& $productImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& $productImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover $productImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
}));

function ProductView(props) {
  //get product from source
  const product = {
    data: {
      id: "1",
      name: "A Walk Amongst Friends - Canvas Print",
      handle: "a-walk-amongst-friends-canvas-print",
      description:
        "Officia amet eiusmod eu sunt tempor voluptate laboris velit nisi amet enim proident et. Consequat laborum non eiusmod cillum eu exercitation. Qui adipisicing est fugiat eiusmod esse. Sint aliqua cupidatat pariatur mollit ad est proident reprehenderit. Eiusmod adipisicing laborum incididunt sit aliqua ullamco.",
      categories: ["Canvas Print", "Nature"],
      tags: ["canvas-print", "nature"],
      featuredImageId: 1,
      images: [
        {
          id: 0,
          url: "assets/images/ecommerce/a-walk-amongst-friends.jpg",
          type: "image",
        },
        {
          id: 1,
          url: "assets/images/ecommerce/braies-lake.jpg",
          type: "image",
        },
        {
          id: 2,
          url: "assets/images/ecommerce/fall-glow.jpg",
          type: "image",
        },
        {
          id: 3,
          url: "assets/images/ecommerce/first-snow.jpg",
          type: "image",
        },
        {
          id: 4,
          url: "assets/images/ecommerce/lago-di-braies.jpg",
          type: "image",
        },
        {
          id: 5,
          url: "assets/images/ecommerce/lago-di-sorapis.jpg",
          type: "image",
        },
        {
          id: 6,
          url: "assets/images/ecommerce/never-stop-changing.jpg",
          type: "image",
        },
        {
          id: 7,
          url: "assets/images/ecommerce/reaching.jpg",
          type: "image",
        },
        {
          id: 8,
          url: "assets/images/ecommerce/morain-lake.jpg",
          type: "image",
        },
        {
          id: 9,
          url: "assets/images/ecommerce/yosemite.jpg",
          type: "image",
        },
      ],
      priceTaxExcl: 9.309,
      priceTaxIncl: 10.24,
      taxRate: 10,
      comparedPrice: 19.9,
      quantity: 3,
      sku: "A445BV",
      width: "22cm",
      height: "24cm",
      depth: "15cm",
      weight: "3kg",
      extraShippingFee: 3.0,
      active: true,
    },
  };

  const classes = useStyles(props);
  const [tabValue, setTabValue] = useState(0);
  const { form, handleChange, setForm } = useForm(null);

  useEffect(() => {
    function updateProductState() {
      const params = props.match.params;
      const { productId } = params;

      if (productId === "new") {
        //todo handle this dispatch(Actions.newProduct());
      } else {
        //todo handle dispatch(Actions.getProduct(props.match.params));
      }
    }

    updateProductState();
  }, [props.match.params]); //TODO [dispatch, props.match.params]);

  useEffect(() => {
    if (
      (product.data && !form) ||
      (product.data && form && product.data.id !== form.id)
    ) {
      setForm(product.data);
    }
  }, [form, product.data, setForm]);

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  function handleChipChange(value, name) {
    setForm(
      _.set(
        { ...form },
        name,
        value.map((item) => item.value)
      )
    );
  }

  function setFeaturedImage(id) {
    setForm(_.set({ ...form }, "featuredImageId", id));
  }

  function handleUploadChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      setForm(
        _.set({ ...form }, `images`, [
          {
            id: FuseUtils.generateGUID(),
            url: `data:${file.type};base64,${btoa(reader.result)}`,
            type: "image",
          },
          ...form.images,
        ])
      );
    };

    reader.onerror = function () {};
  }

  function canBeSubmitted() {
    return form.name.length > 0 && !_.isEqual(product.data, form);
  }
  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <ViewHeader
          form={form}
          canBeSubmitted={canBeSubmitted}
          titleNewEntity="Nouveau Produit"
          caption="Produit Détails"
          returnUrl="produit-collection"
          returnUrlTitle="List Produits"
        />
      }
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: "w-full h-64" }}
        >
          <Tab className="h-64 normal-case" label="Basic Info" />
          <Tab className="h-64 normal-case" label="Product Images" />
          <Tab className="h-64 normal-case" label="Pricing" />
          <Tab className="h-64 normal-case" label="Inventory" />
          <Tab className="h-64 normal-case" label="Shipping" />
        </Tabs>
      }
      content={
        form && (
          <div className="p-16 sm:p-24 max-w-2xl">
            {tabValue === 0 && (
              <div>
                <div className="flex">
                  <TextField
                    className="mt-8 mb-16 mr-8"
                    error={form.name === ""}
                    required
                    label="Name"
                    autoFocus
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16 mr-8"
                    error={form.name === ""}
                    required
                    label="Name"
                    autoFocus
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16 mr-8"
                    error={form.name === ""}
                    required
                    label="Name"
                    autoFocus
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>

                <TextField
                  className="mt-8 mb-16"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  label="Description"
                  type="text"
                  value={form.description}
                  multiline
                  rows={5}
                  variant="outlined"
                  fullWidth
                />

                <FuseChipSelect
                  className="mt-8 mb-24"
                  value={form.categories.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  onChange={(value) => handleChipChange(value, "categories")}
                  placeholder="Select multiple categories"
                  textFieldProps={{
                    label: "Categories",
                    InputLabelProps: {
                      shrink: true,
                    },
                    variant: "outlined",
                  }}
                  isMulti
                />

                <FuseChipSelect
                  className="mt-8 mb-16"
                  value={form.tags.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  onChange={(value) => handleChipChange(value, "tags")}
                  placeholder="Select multiple tags"
                  textFieldProps={{
                    label: "Tags",
                    InputLabelProps: {
                      shrink: true,
                    },
                    variant: "outlined",
                  }}
                  isMulti
                />
              </div>
            )}
            {tabValue === 1 && (
              <div>
                <input
                  accept="image/*"
                  className="hidden"
                  id="button-file"
                  type="file"
                  onChange={handleUploadChange}
                />
                <div className="flex justify-center sm:justify-start flex-wrap">
                  <label
                    htmlFor="button-file"
                    className={clsx(
                      classes.productImageUpload,
                      "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                    )}
                  >
                    <Icon fontSize="large" color="action">
                      cloud_upload
                    </Icon>
                  </label>
                  {form.images.map((media) => (
                    <div
                      onClick={() => setFeaturedImage(media.id)}
                      className={clsx(
                        classes.productImageItem,
                        "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
                        media.id === form.featuredImageId && "featured"
                      )}
                      key={media.id}
                    >
                      <Icon className={classes.productImageFeaturedStar}>
                        star
                      </Icon>
                      <img
                        className="max-w-none w-auto h-full"
                        src={media.url}
                        alt="product"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tabValue === 2 && (
              <div>
                <TextField
                  className="mt-8 mb-16"
                  label="Tax Excluded Price"
                  id="priceTaxExcl"
                  name="priceTaxExcl"
                  value={form.priceTaxExcl}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  type="number"
                  variant="outlined"
                  autoFocus
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  label="Tax Included Price"
                  id="priceTaxIncl"
                  name="priceTaxIncl"
                  value={form.priceTaxIncl}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  type="number"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  label="Tax Rate"
                  id="taxRate"
                  name="taxRate"
                  value={form.taxRate}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  type="number"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  label="Compared Price"
                  id="comparedPrice"
                  name="comparedPrice"
                  value={form.comparedPrice}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  type="number"
                  variant="outlined"
                  fullWidth
                  helperText="Add a compare price to show next to the real price"
                />
              </div>
            )}
            {tabValue === 3 && (
              <div>
                <TextField
                  className="mt-8 mb-16"
                  required
                  label="SKU"
                  autoFocus
                  id="sku"
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  label="Quantity"
                  id="quantity"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  variant="outlined"
                  type="number"
                  fullWidth
                />
              </div>
            )}
            {tabValue === 4 && (
              <div>
                <div className="flex">
                  <TextField
                    className="mt-8 mb-16 mr-8"
                    label="Width"
                    autoFocus
                    id="width"
                    name="width"
                    value={form.width}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />

                  <TextField
                    className="mt-8 mb-16 mr-8"
                    label="Height"
                    id="height"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />

                  <TextField
                    className="mt-8 mb-16 mr-8"
                    label="Depth"
                    id="depth"
                    name="depth"
                    value={form.depth}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>

                <TextField
                  className="mt-8 mb-16"
                  label="Weight"
                  id="weight"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  label="Extra Shipping Fee"
                  id="extraShippingFee"
                  name="extraShippingFee"
                  value={form.extraShippingFee}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </div>
            )}
          </div>
        )
      }
      innerScroll
    />
  );
}

export default ProductView;
