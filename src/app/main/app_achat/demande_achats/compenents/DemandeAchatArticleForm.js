import { Button, Grid, Icon } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import AppInput from "app/main/components/AppInput";
import DynamicSelector from "app/main/composants/inputs/DynamicSelector";

import ArticleDialog from "app/main/app_stock/article/ArticleDialog";
import { useDispatch, useSelector } from "react-redux";
import { list } from "app/services/infrabitumService/ActionService";

import * as Actions from "../store/actions";
import * as AppActions from "app/store/actions";

import { showMessage } from "app/store/actions/fuse";

const empty_fields_error =
  "Vérifier vos informations, il exist des champs non remplis";

export default function DemandeAchatArticleForm(props) {
  const { style, form } = props;
  const edit_article = useSelector(
    ({ demande_achat }) => demande_achat.demande.edit_article
  );

  const articles = useSelector(
    ({ demande_achat }) => demande_achat.articles.results
  );

  const [articleForm, setArticleForm] = useState({
    id: "",
    article: "",
    article_id: "",
    qte: 0,
    unite: "unite",
  });

  const handleChangeArticleForm = useCallback((e) => {
    e.persist();
    setArticleForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  }, []);
  const dispatch = useDispatch();

  function onDelete() {
    dispatch(Actions.deleteArticle(form));
  }
  function onEditArticle() {
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
    dispatch(Actions.addNewArticle(articleForm, form));
  }

  //

  useEffect(() => {
    if (edit_article === null) {
      setArticleForm({
        id: "",
        article_id: "",
        article: "",
        qte: 0,
        unite: "unite",
      });
      return;
    }
    setArticleForm({ ...edit_article });
    setArticle({
      ...article,
      id: edit_article.article_id,
      designation: edit_article.article,
    });
  }, [edit_article]);

  const [open, setOpen] = React.useState(false);
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

  React.useEffect(() => {
    if (article.alert_achat) {
      dispatch(
        showMessage({
          message: `${article.designation} : la période d'achat n'est pas encore expirée veuillez consulter la liste des produits`,
          variant: "error",
          anchorOrigin: {
            vertical: "top", //top bottom
            horizontal: "right", //left center right
          },
          autoHideDuration: 1200,
        })
      );
    }

    setArticleForm({
      ...articleForm,
      article_id: article.id,
      article: article.designation,
      unite: article.unite,
    });
  }, [article]);

  const getArticles = (query) => {
    const filters = {
      search: query,
    };
    dispatch(list("DEMANDE_ARTICLES", "articles", 1, filters));
  };

  React.useEffect(() => {
    let query = "";
    if (article !== undefined && article.id !== undefined) {
      query = article.designation;
    }
    const filters = {
      search: query,
    };
    dispatch(list("DEMANDE_ARTICLES", "articles", 1, filters));
  }, [article]);

  return (
    <div style={{ width: "100%" }}>
      <Grid
        container
        item
        xs={12}
        spacing={2}
        style={{
          ...style,
          padding: 16,
          borderRadius: 8,
          justifycontent: "left",
        }}
      >
        <Grid item xs={12} sm={3}>
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
            type="text"
            handleChange={handleChangeArticleForm}
            value={articleForm.qte}
          />
        </Grid>
        {/* <Grid item xs={12} sm={3}>
          <AppInput
            label="Unite"
            name="unite"
            placeholder="Unite"
            type="text"
            handleChange={handleChangeArticleForm}
            value={articleForm.unite}
          />
        </Grid> */}

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
    </div>
  );
}
