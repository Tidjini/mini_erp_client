export function containsObject(obj, list, key) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (obj.id !== undefined && obj.id === list[i].id) {
      return [true, i];
    }
  }

  for (i = 0; i < list.length; i++) {
    if (list[i][key] === obj[key]) {
      return [true, i];
    }
  }

  return [false, -1];
}

export function onAddOrModifyArticle(state, action) {
  let articles = state.devis.articles;
  const containes = containsObject(action.payload, articles, "article");

  if (containes[0] == true) {
    articles[containes[1]] = action.payload;
  } else {
    articles = [action.payload, ...state.devis.articles];
  }

  let total = 0.0;
  let total_tva = 0.0;
  let total_ttc = 0.0;

  articles.forEach((article) => {
    total += article.total;
    total_tva += article.total_tva;
  });
  total_ttc = total + total_tva;

  return [articles, total, total_tva, total_ttc];
}

export function onDeleteArticle(state, action) {
  const articles = state.devis.articles;

  if (state.edit_article === null) return { ...state };
  const containes = containsObject(state.edit_article, articles, "article");

  if (containes[0] == true) {
    articles.splice(containes[1], 1);
  }

  let total = 0.0;
  let total_tva = 0.0;
  let total_ttc = 0.0;

  articles.forEach((article) => {
    total += article.total;
    total_tva = 0;
  });
  total_ttc = total + total_tva;

  return [articles, total, total_tva, total_ttc];
}
