import { Button, Grid, Icon, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import AppInput from "app/main/components/AppInput";
import { useDispatch, useSelector } from "react-redux";
import DynamicSelector from "app/main/composants/inputs/DynamicSelector";

import * as Actions from "../store/actions";
import * as AppActions from "app/store/actions";
import AppInputSelector from "app/main/components/AppInputSelector";
import { list } from "app/services/infrabitumService/ActionService";
import ArticleDialog from "app/main/app_stock/article/ArticleDialog";
import ConfirmationPrice from "./ConfirmationPrice";

const defaultArticle = {
  id: "",
  article: "",
  article_id: "",
  qte: 0,
  unite: "unite",
  prix_unite: 0.0,
  total: 0.0,
  remise: 0.0,
  total_remise: 0.0,
  tva: 0.0,
  total_tva: 0.0,
  total_ttc: 0.0,
};
const empty_fields_error =
  "Vérifier vos informations, il exist des champs non remplis";

const TVA_TABLE = [
  { value: 0.0, display: "0 %" },
  { value: 0.07, display: "07 %" },
  { value: 0.09, display: "09 %" },
  { value: 0.17, display: "17 %" },
  { value: 0.19, display: "19 %" },
  { value: 0.21, display: "21 %" },
];
export default function DevisAchatArticleForm(props) {
  const { style, form } = props;
  const edit_article = useSelector(
    ({ devis_achat }) => devis_achat.devis.edit_article
  );

  const [articleForm, setArticleForm] = useState(defaultArticle);

  const handleChangeArticleForm = useCallback((e) => {
    e.persist();

    setArticleForm((form) => {
      let prixUnite = Number(form.prix_unite);
      let qte = Number(form.qte);
      let tva = Number(form.tva);

      if (e.target.name === "prix_unite") {
        prixUnite = Number(e.target.value);
      }
      if (e.target.name === "qte") {
        qte = Number(e.target.value);
      }
      if (e.target.name === "tva") {
        tva = Number(e.target.value);
      }
      const total = prixUnite * qte;
      const total_tva = prixUnite * qte * tva;
      const total_ttc = total + total_tva;

      return {
        ...form,
        [e.target.name]: e.target.value,
        total,
        total_tva,
        total_ttc,
      };
    });
  }, []);

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function onDelete() {
    dispatch(Actions.deleteArticle(form));
  }
  const onEditArticle = React.useCallback(
    (e) => {
      if (
        article.prix_achat_max > 0 &&
        article.prix_achat_max < articleForm.prix_unite
      ) {
        setOpenPrixConfirm(true);
      } else {
        confirmEdition();
      }
    },
    [articleForm, article]
  );

  const confirmEdition = () => {
    setOpenPrixConfirm(false);

    if (
      articleForm.article === "" ||
      articleForm.qte <= 0 ||
      articleForm.unite === ""
    ) {
      dispatch(
        AppActions.showMessage({
          message: empty_fields_error,
          variant: "error",
          anchorOrigin: {
            vertical: "center", //top bottom
            horizontal: "right", //left center right
          },
          autoHideDuration: 2000,
        })
      );

      return;
    }
    if (
      articleForm.article === undefined ||
      articleForm.qte === undefined ||
      articleForm.unite === undefined
    ) {
      dispatch(
        AppActions.showMessage({
          message: empty_fields_error,
          variant: "error",
          anchorOrigin: {
            vertical: "center", //top bottom
            horizontal: "right", //left center right
          },
          autoHideDuration: 2000,
        })
      );

      return;
    }
    dispatch(
      Actions.addNewArticle({ ...defaultArticle, ...articleForm }, form)
    );
  };
  //

  useEffect(() => {
    if (edit_article === null) {
      setArticleForm({
        id: "",
        article: "",
        article_id: "",
        qte: 0,
        unite: "unite",
      });
      return;
    }
    // setArticleForm(edit_article);

    setArticleForm({ ...edit_article });
    setArticle({
      ...article,
      id: edit_article.article_id,
      designation: edit_article.article,
    });
  }, [edit_article]);

  const [article, setArticle] = React.useState({
    id: "",
    dernier_achat: "",
    alert_achat: false,
    prix_achat_max: 0.0,
    reference: "",
    tolere_achat: "5",
    achat_period: 30,
    designation: "",
    unite: "unite",
  });

  const getArticles = (query) => {
    const filters = {
      search: query,
    };
    dispatch(list("DEVIS_ARTICLES", "articles", 1, filters));
  };

  React.useEffect(() => {
    let query = "";
    if (article !== undefined && article.id !== undefined) {
      query = article.designation;
    }
    const filters = {
      search: query,
    };
    dispatch(list("DEVIS_ARTICLES", "articles", 1, filters));

    setArticleForm({
      ...articleForm,
      article_id: article.id,
      article: article.designation,
      unite: article.unite,
    });
  }, [article]);

  const articles = useSelector(
    ({ devis_achat }) => devis_achat.articles.results
  );

  const [open, setOpen] = React.useState(false);
  const [openPrixConfirm, setOpenPrixConfirm] = React.useState(false);

  return (
    <div style={{ width: "100%" }}>
      <Grid
        container
        item
        xs={12}
        spacing={2}
        style={{
          ...style,
          borderRadius: 8,
          justifycontent: "left",
        }}
      >
        <Grid item xs={12} sm={4}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              borderRadius: "4px 4px 4px 4px",
              ...style,
            }}
          >
            <div
              style={{
                padding: 5,
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Article
            </div>
            <DynamicSelector
              item={article}
              setItem={(item) => {
                if (item) setArticle(item);
              }}
              itemKey="reference"
              display="designation"
              render="designation"
              label="Article"
              direction="row"
              getItems={getArticles}
              items={articles}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <AppInput
            label="Quantité"
            name="qte"
            placeholder="Qté"
            type="number"
            handleChange={handleChangeArticleForm}
            value={articleForm.qte}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <AppInput
            label="Prix"
            name="prix_unite"
            placeholder="Prix"
            type="number"
            handleChange={handleChangeArticleForm}
            value={articleForm.prix_unite}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <AppInputSelector
            items={TVA_TABLE}
            label="TVA"
            name="tva"
            placeholder="T.V.A"
            type="number"
            handleChange={handleChangeArticleForm}
            value={articleForm.tva}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          style={{ alignSelf: "end", alignItems: "end" }}
        >
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: 16,
              border: "1px solid gray",
              borderRadius: 5,
              padding: "8px 20px",
              textAlign: "right",
            }}
          >
            {`${new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "DZD",
            }).format(articleForm.total_ttc)}`}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            justifycontent: "end",
            marginBottom: 4,
          }}
        >
          <Button variant="contained" color="primary" onClick={onEditArticle}>
            <Icon>edit</Icon>
          </Button>

          <Button
            variant="contained"
            style={{
              backgroundColor: "#FB5237",
              color: "white",
              marginLeft: 4,
            }}
            onClick={onDelete}
          >
            <Icon>delete</Icon>
          </Button>

          <Button
            variant="contained"
            style={{
              marginLeft: 20,
              boxShadow: "none",
              backgroundColor: "#2a9d8f",
              color: "#EFF1FF",
              height: 32,
              fontSize: 12,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            Ajouter Article
          </Button>
        </Grid>
      </Grid>
      <ArticleDialog
        open={open}
        setOpen={setOpen}
        item={null}
        context="ARTICLE"
      />

      <ConfirmationPrice
        setOpen={setOpenPrixConfirm}
        open={openPrixConfirm}
        onConfirme={(e) => {
          confirmEdition();
        }}
        message={`${article.designation} : le prix d'achat est superieur a ${article.tolere_achat} % de la derniere achat, voulez vous continuez la sauvgarde ?`}
      />
    </div>
  );
}
